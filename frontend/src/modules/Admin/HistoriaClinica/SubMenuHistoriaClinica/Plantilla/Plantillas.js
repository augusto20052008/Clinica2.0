import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, notification, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchPlantillas, deletePlantilla } from "../../../../../utils/api";
import AddPlantilla from "./AddPlantilla";
import EditPlantilla from "./EditPlantilla";

const { Search } = Input;

function Plantillas() {
  const [plantillas, setPlantillas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [currentPlantilla, setCurrentPlantilla] = useState(null);

  useEffect(() => {
    loadPlantillas();
  }, []);

  const loadPlantillas = async () => {
    try {
      const data = await fetchPlantillas();
      setPlantillas(data);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "No se pudieron cargar las plantillas. Intenta nuevamente más tarde.",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deletePlantilla(id);
      notification.success({
        message: "Éxito",
        description: response.message || "Plantilla eliminada exitosamente.",
      });
      loadPlantillas();
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message || "No se pudo eliminar la plantilla. Intenta nuevamente más tarde.",
      });
    }
  };

  const handleEdit = (plantilla) => {
    setCurrentPlantilla(plantilla);
  };

  const handleBackToList = () => {
    setCurrentPlantilla(null);
  };

  const columns = [
    { title: "ID", dataIndex: "idPlantilla_Formulario", key: "idPlantilla_Formulario" },
    { title: "Número Tipo Formulario", dataIndex: "nroTipoFormulario", key: "nroTipoFormulario" },
    { title: "Nombre", dataIndex: "nombreTipoFormulario", key: "nombreTipoFormulario" },
    {
      title: "Acciones",
      key: "acciones",
      render: (text, row) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(row)}
            style={{ color: "#ffc107" }}
            title="Editar plantilla"
          />
          <Popconfirm
            title="¿Estás seguro de eliminar esta plantilla?"
            onConfirm={() => handleDelete(row.idPlantilla_Formulario)}
            okText="Sí"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              style={{ color: "#dc3545" }}
              title="Eliminar plantilla"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredPlantillas = plantillas.filter((plantilla) =>
    plantilla.nombreTipoFormulario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (currentPlantilla) {
    return (
      <EditPlantilla
        plantilla={currentPlantilla}
        onClose={handleBackToList}
        onRefresh={loadPlantillas}
      />
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Gestión de Plantillas de Formularios</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <Search
            placeholder="Buscar por nombre de formulario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 300 }}
          />
          <Button type="primary" onClick={() => setAddModalOpen(true)}>
            Agregar Plantilla
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredPlantillas}
        rowKey="idPlantilla_Formulario"
        pagination={{
          pageSize: 6, // Limita a 6 elementos por página
          showSizeChanger: false, // Oculta la opción para cambiar el tamaño de página
        }}
      />

      <Modal
        title="Agregar Plantilla"
        visible={isAddModalOpen}
        onCancel={() => setAddModalOpen(false)}
        footer={null}
      >
        <AddPlantilla
          onClose={() => setAddModalOpen(false)}
          onRefresh={loadPlantillas}
        />
      </Modal>
    </div>
  );
}

export default Plantillas;
