import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Divider, Table, Space, notification } from "antd";
import { ArrowLeftOutlined, SaveOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  updateTipoFormulario,
  fetchTipoFormularioById,
  fetchCamposFormulario,
  deleteCampoFormulario,
} from "../../../../../utils/api";
import AddCampoFormulario from "./AddCampoFormulario";
import EditCampoFormulario from "./EditCampoFormulario";

const EditTipoFormulario = ({ setView, tipoFormularioId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [campos, setCampos] = useState([]);
  const [loadingCampos, setLoadingCampos] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCampoId, setEditingCampoId] = useState(null);

  const loadCampos = useCallback(async () => {
    setLoadingCampos(true);
    try {
      const camposData = await fetchCamposFormulario(tipoFormularioId);
      setCampos(camposData);
    } catch (error) {
      console.error("Error al cargar los campos:", error);
      notification.error({
        message: "Error",
        description: "No se pudieron cargar los campos del formulario.",
      });
    } finally {
      setLoadingCampos(false);
    }
  }, [tipoFormularioId]);

  useEffect(() => {
    // Cargar datos del formulario y campos asociados
    const loadTipoFormulario = async () => {
      if (tipoFormularioId) {
        try {
          const data = await fetchTipoFormularioById(tipoFormularioId);
          form.setFieldsValue({
            nombre: data.nombre,
            descripcion: data.descripcion,
          });
          await loadCampos();
        } catch (error) {
          console.error("Error al cargar el formulario:", error);
          notification.error({
            message: "Error",
            description: "No se pudieron cargar los datos del formulario.",
          });
        }
      }
    };

    loadTipoFormulario();
  }, [tipoFormularioId, form, loadCampos]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await updateTipoFormulario(tipoFormularioId, values);
      notification.success({
        message: "Formulario actualizado",
        description: "El formulario se ha actualizado exitosamente.",
      });
      setView("list"); // Regresar a la lista después de guardar
    } catch (error) {
      console.error("Error al actualizar el formulario:", error);
      notification.error({
        message: "Error",
        description: "No se pudo actualizar el formulario.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCampo = async (campoId) => {
    try {
      await deleteCampoFormulario(campoId);
      notification.success({
        message: "Campo eliminado",
        description: "El campo se eliminó correctamente.",
      });
      await loadCampos(); // Refrescar la tabla de campos
    } catch (error) {
      console.error("Error al eliminar el campo:", error);
      notification.error({
        message: "Error",
        description: "No se pudo eliminar el campo.",
      });
    }
  };

  const columns = [
    {
      title: "Nombre del Campo",
      dataIndex: "nombre_campo",
      key: "nombre_campo",
    },
    {
      title: "Tipo de Dato",
      dataIndex: "tipo_dato",
      key: "tipo_dato",
    },
    {
      title: "Opciones",
      dataIndex: "opciones",
      key: "opciones",
      render: (text) => text || "N/A",
    },
    {
      title: "Requerido",
      dataIndex: "requerido",
      key: "requerido",
      render: (text) => (text ? "Sí" : "No"),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingCampoId(record.id_campo);
              setIsEditModalOpen(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteCampo(record.id_campo)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => setView("list")}
        style={{ marginBottom: 16 }}
      >
        Regresar a la Lista
      </Button>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="nombre"
          label="Nombre del Tipo de Formulario"
          rules={[{ required: true, message: "Ingrese el nombre del formulario." }]}
        >
          <Input placeholder="Ejemplo: Registro, Encuesta" />
        </Form.Item>

        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[{ required: true, message: "Ingrese una descripción." }]}
        >
          <Input.TextArea rows={3} placeholder="Breve descripción del formulario" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={loading}
            block
          >
            Guardar Cambios
          </Button>
        </Form.Item>
      </Form>

      <Divider />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Campos Asociados</h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Agregar Campo
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={campos}
        rowKey="id_campo"
        loading={loadingCampos}
        pagination={{ pageSize: 5 }}
      />

      <AddCampoFormulario
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCampoAdded={loadCampos}
        tipoFormularioId={tipoFormularioId}
      />
      <EditCampoFormulario
        visible={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onCampoUpdated={loadCampos}
        campoId={editingCampoId}
      />
    </div>
  );
};

export default EditTipoFormulario;
