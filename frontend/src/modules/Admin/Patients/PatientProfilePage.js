import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaUser, FaPhone, FaBirthdayCake, FaMapMarkerAlt, FaGlobe, FaVenusMars, FaTint, FaAllergies } from "react-icons/fa";
import { fetchHistoriaById, fetchPatientDetails } from "../../../utils/api";
import HistoriasClinicasTable from "./HistoriaClinicaTable";
import FormulariosTable from "./FormularioTable";
import { Button, Col, Row, Typography, Card, Spin, Empty, Divider, Space, Avatar } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Text } = Typography;

const PatientProfilePage = () => {
  const { identificacion } = useParams();

  const [patientData, setPatientData] = useState(null);
  const [historiaData, setHistoriaData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patient = await fetchPatientDetails(identificacion);
        setPatientData(patient);
      } catch (err) {
        setError("No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    const fetchDataHistoria = async () => {
      try {
        const response = await fetchHistoriaById(identificacion);
        if (response && Array.isArray(response) && response.length > 0) {
          setHistoriaData(response);
        } else {
          console.error("Error: No se encontraron historias clínicas.");
        }
      } catch (error) {
        console.error("Error al cargar las historias clínicas:", error);
      }
    };

    fetchData();
    fetchDataHistoria();
  }, [identificacion]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spin tip="Cargando..." />
      </div>
    );
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!patientData || !historiaData) {
    return <Empty description="No se encontró información del paciente" />;
  }

  return (
    <Row gutter={[16, 16]}>
      {/* Sidebar del paciente */}
      <Col xs={24} sm={24} md={6} lg={6}>
        <Card
          bordered
          style={{ width: "100%", height: "100%" }} // Asegura que ocupe toda la altura disponible
        >
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            href="/admin/patients"
            style={{ marginBottom: "16px" }}
          >
            Volver
          </Button>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Avatar
              size={120}
              src="https://via.placeholder.com/150/cccccc/000000?text=Foto"
              alt={`${patientData.primerNombre} ${patientData.apellidoParteno}`}
            />
          </div>
          <Text
            style={{
              display: "block",
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {`${patientData.primerNombre} ${patientData.apellidoParteno || ""}`}
          </Text>
          <Text style={{ display: "block", textAlign: "center" }} type="secondary">
            Paciente
          </Text>
          <Divider />
          <div>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text><FaUser style={{ marginRight: 8 }} /> <strong>Identificación:</strong> {patientData.identificacion}</Text>
              <Text><FaPhone style={{ marginRight: 8 }} /> <strong>Teléfono:</strong> {patientData.telefonoPaciente || "No especificado"}</Text>
              <Text><FaBirthdayCake style={{ marginRight: 8 }} /> <strong>Fecha de Nacimiento:</strong> {patientData.fechaNacimiento ? new Date(patientData.fechaNacimiento).toLocaleDateString() : "No especificada"}</Text>
              <Text><FaMapMarkerAlt style={{ marginRight: 8 }} /> <strong>Provincia:</strong> {patientData.provincia || "No especificada"}</Text>
              <Text><FaGlobe style={{ marginRight: 8 }} /> <strong>Nacionalidad:</strong> {patientData.nacionalidad || "No especificada"}</Text>
              <Text><FaVenusMars style={{ marginRight: 8 }} /> <strong>Sexo:</strong> {patientData.sexo === "M" ? "Masculino" : "Femenino"}</Text>
              <Text><FaAllergies style={{ marginRight: 8 }} /> <strong>Alergias:</strong> {patientData.alergias || "No especificadas"}</Text>
              <Text><FaTint style={{ marginRight: 8 }} /> <strong>Grupo Sanguíneo:</strong> {patientData.grupoSanguineo || "No especificado"}</Text>
            </Space>
          </div>
        </Card>
      </Col>

      {/* Contenido de la historia clínica y formularios */}
      <Col xs={24} sm={24} md={18} lg={18}>
        <Card bordered>
          <HistoriasClinicasTable pacienteIdentificacion={patientData.identificacion} />
        </Card>

        <Card bordered style={{ marginTop: "20px" }}>
          <FormulariosTable idHistoriaClinica={historiaData[0].idHistoriaClinica} />
        </Card>
      </Col>
    </Row>
  );
};

export default PatientProfilePage;
