import React, { useEffect, useState } from "react";
import { Table, Typography, Spin, Empty, notification } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { fetchHistoriaById } from "../../../utils/api";

const { Title } = Typography;

const HistoriaClinicaTable = ({ pacienteIdentificacion }) => {
  const [historiasClinicas, setHistoriasClinicas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistoriasClinicas = async () => {
      try {
        setLoading(true);
        const response = await fetchHistoriaById(pacienteIdentificacion);
        if (response && Array.isArray(response) && response.length > 0) {
          setHistoriasClinicas(response);
        } else {
          notification.info({
            message: "No se encontraron historias clínicas",
            description: "Este paciente no tiene historias clínicas registradas.",
          });
        }
      } catch (error) {
        console.error("Error al cargar las historias clínicas:", error);
        notification.error({
          message: "Error al cargar historias clínicas",
          description: "Hubo un problema al cargar los datos. Intente nuevamente.",
        });
      } finally {
        setLoading(false);
      }
    };

    if (pacienteIdentificacion) {
      loadHistoriasClinicas();
    }
  }, [pacienteIdentificacion]);

  const columns = [
    {
      title: "ID Historia Clínica",
      dataIndex: "idHistoriaClinica",
      key: "idHistoriaClinica",
    },
    {
      title: "Número Historia Clínica",
      dataIndex: "nroHistoriaClinica",
      key: "nroHistoriaClinica",
    },
    {
      title: "Fecha de Creación",
      dataIndex: "fechaCreacionHC",
      key: "fechaCreacionHC",
    },
    {
      title: "Última Edición",
      dataIndex: "fechaUltimaEdicion",
      key: "fechaUltimaEdicion",
    },
    {
      title: "Identificación Paciente",
      dataIndex: "Paciente_identificacion",
      key: "Paciente_identificacion",
    },
  ];

  if (!pacienteIdentificacion) {
    return (
      <Empty
        description="No se proporcionó identificación del paciente"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }

  if (historiasClinicas.length === 0 && !loading) {
    return (
      <Empty
        description="No se encontraron historias clínicas para este paciente"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3} style={{ marginBottom: "20px" }}>
        <FileTextOutlined style={{ marginRight: "10px" }} />
        Historia Clínica
      </Title>

      <Spin spinning={loading} tip="Cargando historias clínicas...">
        <Table
          columns={columns}
          dataSource={historiasClinicas}
          rowKey="idHistoriaClinica"
          bordered
          pagination={false}
          scroll={{ x: true }}
        />
      </Spin>
    </div>
  );
};

export default HistoriaClinicaTable;
