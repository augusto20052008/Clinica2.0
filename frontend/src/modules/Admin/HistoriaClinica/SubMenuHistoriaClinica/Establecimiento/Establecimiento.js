import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, Space, Popconfirm, notification, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchEstablecimientos, deleteEstablecimiento } from "../../../../../utils/api";
import AddEstablecimiento from "./AddEstablecimiento";
import EditEstablecimiento from "./EditEstablecimiento";


const { Option } = Select;

function Establecimiento() {
  const [establecimientos, setEstablecimientos] = useState([]);
  const [filteredEstablecimientos, setFilteredEstablecimientos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSistema, setSelectedSistema] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentEstablecimiento, setCurrentEstablecimiento] = useState(null);

  const sistemas = [
    "Ministerio de Salud",
    "MIES",
    "Los servicios de salud de las municipalidades",
    "IESS",
    "ISSFA",
    "ISPOL"
  ];

  useEffect(() => {
    loadEstablecimientos();
  }, []);

  useEffect(() => {
    const filteredData = establecimientos.filter((item) =>
      (item.nombreEstablecimiento.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedSistema ? item.institucionSistema === selectedSistema : true)
    );
    setFilteredEstablecimientos(filteredData);
  }, [searchQuery, selectedSistema, establecimientos]);

  const loadEstablecimientos = async () => {
    try {
      const data = await fetchEstablecimientos();
      setEstablecimientos(data);
      setFilteredEstablecimientos(data);
    } catch (error) {
      console.error("Error al cargar establecimientos:", error);
    }
  };

  const handleDelete = async (idEstablecimiento) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este establecimiento?");
    if (!confirmDelete) return;
    try {
      await deleteEstablecimiento(idEstablecimiento);
      notification.success({
        message: "Establecimiento eliminado",
        description: "El establecimiento ha sido eliminado exitosamente",
      });
      loadEstablecimientos();
    } catch (error) {
      console.error("Error al eliminar establecimiento:", error);
      notification.error({
        message: "Error",
        description: "Error al eliminar el establecimiento",
      });
    }
  };

  const handleEdit = (establecimiento) => {
    setCurrentEstablecimiento(establecimiento);
    setEditModalOpen(true);
  };

  const columns = [
    { title: "ID", dataIndex: "idEstablecimiento" },
    { title: "Nombre", dataIndex: "nombreEstablecimiento" },
    { title: "Código", dataIndex: "codigoEstablecimiento" },
    { title: "Sistema", dataIndex: "institucionSistema" },
    {
      title: "Acciones",
      render: (text, row) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(row)}
            style={{ color: "#ffc107" }}
          />
          <Popconfirm
            title="¿Estás seguro de eliminar este establecimiento?"
            onConfirm={() => handleDelete(row.idEstablecimiento)}
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
      <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Gestión de Establecimientos</h2>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Input
            placeholder="Buscar por nombre"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "300px" }}
          />
          <Select
            placeholder="Filtrar por sistema"
            value={selectedSistema}
            onChange={(value) => setSelectedSistema(value)}
            style={{ width: 250 }}
          >
            <Option value="">Todos</Option>
            {sistemas.map((sistema) => (
              <Option key={sistema} value={sistema}>
                {sistema}
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            onClick={() => setModalOpen(true)}
          >
            Agregar Establecimiento
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={filteredEstablecimientos} rowKey="idEstablecimiento" />
      <Modal
        title="Agregar Establecimiento"
        visible={isModalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <AddEstablecimiento
          onClose={() => setModalOpen(false)}
          onRefresh={loadEstablecimientos}
        />
      </Modal>
      <Modal
        title="Editar Establecimiento"
        visible={isEditModalOpen}
        onCancel={() => setEditModalOpen(false)}
        footer={null}
      >
        <EditEstablecimiento
          establecimiento={currentEstablecimiento}
          onClose={() => setEditModalOpen(false)}
          onRefresh={loadEstablecimientos}
        />
      </Modal>
    </div>
  );
}

export default Establecimiento;
