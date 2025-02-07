// PatientDetailsView.js
import React, { useState, useEffect, useCallback } from "react";
import { Spin, Row, Col, Typography, Divider, Avatar, Button, Collapse, Card, Tag, Descriptions, notification } from "antd";
import { 
  UserOutlined, 
  IdcardOutlined, 
  ManOutlined, 
  CalendarOutlined, 
  FileTextOutlined, 
  FileOutlined, 
  FormOutlined 
} from "@ant-design/icons";
import { fetchPatientDetails, fetchHistoriaClinica, fetchFormularios } from "../../../utils/api";
import dayjs from "dayjs";

const { Title } = Typography;
const { Panel } = Collapse;

const PatientDetailsView = ({ patient, onBack }) => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clinicalRecords, setClinicalRecords] = useState([]);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [formularios, setFormularios] = useState([]);
  const [formulariosLoading, setFormulariosLoading] = useState(true);
  const [showPatientInfo, setShowPatientInfo] = useState(true); // Estado inicial ajustado a true

  // Función para cargar todos los detalles simultáneamente
  const fetchAllDetails = useCallback(async () => {
    try {
      setLoading(true);
      setRecordsLoading(true);
      setFormulariosLoading(true);

      // Obtener detalles del paciente y sus historias clínicas de manera concurrente
      const [details, records] = await Promise.all([
        fetchPatientDetails(patient.nro_identificacion),
        fetchHistoriaClinica()
      ]);

      setPatientData(details);

      // Filtrar historias clínicas del paciente
      const filteredRecords = records.filter(
        (record) => record.nro_identificacion === patient.nro_identificacion
      );
      setClinicalRecords(filteredRecords);
      setRecordsLoading(false);

      // Obtener formularios asociados a las historias clínicas
      if (filteredRecords.length > 0) {
        const nroArchivos = filteredRecords.map(record => record.nro_archivo);
        const allForms = await fetchFormularios();
        const filteredForms = allForms.filter((form) => nroArchivos.includes(form.nro_archivo));
        setFormularios(filteredForms);
      } else {
        setFormularios([]);
      }
      setFormulariosLoading(false);
    } catch (error) {
      console.error("Error al obtener detalles del paciente:", error);
      notification.error({
        message: "Error",
        description: "No se pudieron cargar los detalles del paciente.",
      });
    } finally {
      setLoading(false);
    }
  }, [patient.nro_identificacion]);

  useEffect(() => {
    if (patient) {
      fetchAllDetails();
    }
  }, [patient, fetchAllDetails]);

  return (
    <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "10px" }}>
      <Button type="primary" onClick={onBack} style={{ marginBottom: "20px" }}>
        Volver a la lista
      </Button>

      {/* Avatar y nombre del paciente */}
      <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setShowPatientInfo(!showPatientInfo)}>
        <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: "#1890ff" }} />
      </div>

      {/* Información del paciente */}
      {showPatientInfo && (
        <Card bordered={false} style={{ marginTop: "20px", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}>
          <Title level={3} style={{ textAlign: "center" }}>
            {`${patient.primer_nombre} ${patient.segundo_nombre || ""} ${patient.primer_apellido} ${patient.segundo_apellido || ""}`}
          </Title>
          <Divider />
          {loading ? (
            <Spin tip="Cargando detalles del paciente..." style={{ width: "100%" }} />
          ) : (
            <Descriptions bordered column={2} size="middle">
              <Descriptions.Item label={<IdcardOutlined />} span={2}>
                {patientData?.nro_identificacion || "No especificado"}
              </Descriptions.Item>
              <Descriptions.Item label={<FileTextOutlined />} span={2}>
                {patientData?.tipo_identificacion 
                  ? patientData.tipo_identificacion.charAt(0).toUpperCase() + patientData.tipo_identificacion.slice(1) 
                  : "No especificado"}
              </Descriptions.Item>
              <Descriptions.Item label={<ManOutlined />}>
                {patientData?.genero === "M" ? "Masculino" : patientData?.genero === "F" ? "Femenino" : "Otro"}
              </Descriptions.Item>
              <Descriptions.Item label={<CalendarOutlined />}>
                {patientData?.fecha_nacimiento 
                  ? dayjs(patientData.fecha_nacimiento).format("YYYY-MM-DD") 
                  : "No especificada"}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Card>
      )}

      {/* Historias Clínicas y Formularios */}
      <Collapse accordion style={{ marginTop: "20px" }}>
        <Panel header={<span><FileOutlined /> Archivos de Historia Clínica</span>} key="1">
          {recordsLoading ? (
            <Spin tip="Cargando historias clínicas..." style={{ width: "100%" }} />
          ) : clinicalRecords.length > 0 ? (
            <Row gutter={[16, 16]}>
              {clinicalRecords.map((record) => (
                <Col span={8} key={record.nro_archivo}>
                  <Card
                    hoverable
                    style={{ borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", textAlign: "center" }}
                  >
                    <Title level={5}>Historia Clínica #{record.nro_archivo}</Title>
                    <Tag color="blue">ID Paciente: {record.nro_identificacion}</Tag>
                    <p><strong>Fecha Creación:</strong> {dayjs(record.fecha_creacion).format("YYYY-MM-DD")}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>No se encontraron archivos clínicos para este paciente.</p>
          )}
        </Panel>
        <Panel header={<span><FormOutlined /> Formularios Completados</span>} key="2">
          {formulariosLoading ? (
            <Spin tip="Cargando formularios..." style={{ width: "100%" }} />
          ) : formularios.length > 0 ? (
            <Row gutter={[16, 16]}>
              {formularios.map((form) => (
                <Col span={8} key={form.id_formulario}>
                  <Card title={`Formulario #${form.id_formulario}`} bordered>
                    <p><strong>Estado:</strong> {form.estado.charAt(0).toUpperCase() + form.estado.slice(1)}</p>
                    <p><strong>Fecha de Creación:</strong> {dayjs(form.fecha_creacion).format("YYYY-MM-DD")}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>No se encontraron formularios asociados a las historias clínicas.</p>
          )}
        </Panel>
      </Collapse>
    </div>
  );
};

export default PatientDetailsView;
