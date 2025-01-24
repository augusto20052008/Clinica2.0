import React, { useEffect, useState } from "react";
import { Modal, Typography, Spin, Space, Tag, Divider } from "antd";
import { FileTextOutlined, CalendarOutlined, IdcardOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { fetchHistoriaById } from "../../../../utils/api";

const { Title, Text } = Typography;

function HistoriaClinicaProfile({ idHistoriaClinica, pacienteIdentificacion, onClose }) {
  const [historia, setHistoria] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistoria = async () => {
      try {
        const data = await fetchHistoriaById(idHistoriaClinica, pacienteIdentificacion);
        setHistoria(data);
      } catch (error) {
        console.error("Error al cargar la historia clínica:", error);
        onClose();
      } finally {
        setLoading(false);
      }
    };

    loadHistoria();
  }, [idHistoriaClinica, pacienteIdentificacion, onClose]);

  if (loading) {
    return (
      <Modal
        title="Cargando Información"
        visible={true}
        onCancel={onClose}
        footer={null}
        centered
      >
        <Spin size="large" tip="Cargando historia clínica..." />
      </Modal>
    );
  }

  return (
    <Modal
      title="Detalles de la Historia Clínica"
      visible={true}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Title level={3}>Información General</Title>
        <Divider />

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Space>
            <IdcardOutlined />
            <Text strong>ID de la Historia:</Text> {historia.idHistoriaClinica}
          </Space>
          <Space>
            <FileTextOutlined />
            <Text strong>Número de Historia:</Text> {historia.nroHistoriaClinica}
          </Space>
          <Space>
            <CalendarOutlined />
            <Text strong>Fecha de Creación:</Text> {historia.fechaCreacionHC}
          </Space>
          <Space>
            <ClockCircleOutlined />
            <Text strong>Fecha de Última Edición:</Text> {historia.fechaUltimaEdicion}
          </Space>
          <Space>
            <Tag color="geekblue">Paciente</Tag>
            <Text strong>Identificación del Paciente:</Text> {historia.Paciente_identificacion}
          </Space>
        </Space>
      </Space>
    </Modal>
  );
}

export default HistoriaClinicaProfile;
