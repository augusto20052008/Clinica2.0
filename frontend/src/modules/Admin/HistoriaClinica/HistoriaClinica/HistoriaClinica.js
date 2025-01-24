import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, notification, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import AddHistoriaClinica from "./AddHistoriaClinica";
import EditHistoriaClinica from "./EditHistoriaClinica";
import HistoriaClinicaProfile from "./HistoriaClinicaProfile";
import { fetchHistorias, deleteHistoria } from "../../../../utils/api";

const { Search } = Input;

function HistoriaClinica() {
  const [historias, setHistorias] = useState([]);
  const [filteredHistorias, setFilteredHistorias] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [currentHistoria, setCurrentHistoria] = useState(null);

  useEffect(() => {
    loadHistorias();
  }, []);

  useEffect(() => {
    const filteredData = historias.filter((historia) =>
      historia.Paciente_identificacion.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHistorias(filteredData);
  }, [searchQuery, historias]);

  const loadHistorias = async () => {
    try {
      const data = await fetchHistorias();
      setHistorias(data);
      setFilteredHistorias(data);
    } catch (error) {
      console.error("Error al cargar historias clínicas:", error);
    }
  };

  const handleDelete = async (idHistoriaClinica, pacienteIdentificacion) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta historia clínica?");
    if (!confirmDelete) return;

    try {
      await deleteHistoria(idHistoriaClinica, pacienteIdentificacion);
      notification.success({
        message: "Éxito",
        description: "Historia clínica eliminada exitosamente.",
      });
      loadHistorias();
    } catch (error) {
      console.error("Error al eliminar historia clínica:", error);
      notification.error({
        message: "Error",
        description: error.message || "Error al eliminar historia clínica.",
      });
    }
  };

  const handleEdit = (historia) => {
    setCurrentHistoria(historia);
    setEditModalOpen(true);
  };

  const handleView = (historia) => {
    setCurrentHistoria(historia);
    setViewModalOpen(true);
  };

  const columns = [
    { title: "Número Historia Clínica", dataIndex: "nroHistoriaClinica", key: "nroHistoriaClinica" },
    { title: "Paciente Identificación", dataIndex: "Paciente_identificacion", key: "Paciente_identificacion" },
    { title: "Fecha de Creación", dataIndex: "fechaCreacionHC", key: "fechaCreacionHC" },
    { title: "Última Edición", dataIndex: "fechaUltimaEdicion", key: "fechaUltimaEdicion" },
    {
      title: "Acciones",
      key: "acciones",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            style={{ color: "#1890ff" }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ color: "#ffc107" }}
          />
          <Popconfirm
            title="¿Estás seguro de eliminar esta historia clínica?"
            onConfirm={() => handleDelete(record.idHistoriaClinica, record.Paciente_identificacion)}
            okText="Sí"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              style={{ color: "#dc3545" }}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>Gestión de Historias Clínicas</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <Search
            placeholder="Buscar por identificación del paciente"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 300 }}
          />
          <Button type="primary" onClick={() => setAddModalOpen(true)}>
            Agregar Historia Clínica
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={filteredHistorias} rowKey="idHistoriaClinica" />

      {isAddModalOpen && (
        <Modal
          title="Agregar Historia Clínica"
          visible={isAddModalOpen}
          onCancel={() => setAddModalOpen(false)}
          footer={null}
        >
          <AddHistoriaClinica onClose={() => setAddModalOpen(false)} onRefresh={loadHistorias} />
        </Modal>
      )}

      {isEditModalOpen && currentHistoria && (
        <Modal
          title="Editar Historia Clínica"
          visible={isEditModalOpen}
          onCancel={() => setEditModalOpen(false)}
          footer={null}
        >
          <EditHistoriaClinica
            historia={currentHistoria}
            onClose={() => setEditModalOpen(false)}
            onRefresh={loadHistorias}
          />
        </Modal>
      )}

      {isViewModalOpen && currentHistoria && (
        <HistoriaClinicaProfile
          idHistoriaClinica={currentHistoria.idHistoriaClinica}
          pacienteIdentificacion={currentHistoria.Paciente_identificacion}
          onClose={() => setViewModalOpen(false)}
        />
      )}
    </div>
  );
}

export default HistoriaClinica;
