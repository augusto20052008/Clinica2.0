import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button, notification } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { updateCampoFormulario, fetchCamposFormulario } from "../../../../../utils/api";

const { Option } = Select;

const EditCampoFormulario = ({ visible, onClose, onCampoUpdated, campoId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [formularioTipoId, setFormularioTipoId] = useState(null); // Almacena el id_formulario_tipo

  useEffect(() => {
    const loadCampo = async () => {
      if (campoId) {
        try {
          // Obtener el campo por ID
          const campo = await fetchCamposFormulario(campoId);

          if (campo) {
            // Llenar el formulario con los valores existentes
            form.setFieldsValue({
              nombre_campo: campo.nombre_campo,
              tipo_dato: campo.tipo_dato,
              opciones: campo.opciones,
              requerido: campo.requerido ? true : false,
            });

            // Establecer id_formulario_tipo
            setFormularioTipoId(campo.id_formulario_tipo);
          } else {
            notification.error({
              message: "Error",
              description: "El campo no fue encontrado.",
            });
          }
        } catch (error) {
          console.error("Error al cargar el campo:", error);
          notification.error({
            message: "Error",
            description: "No se pudo cargar la información del campo.",
          });
        }
      }
    };

    if (visible) {
      loadCampo();
    }
  }, [campoId, visible, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Crear el payload con id_formulario_tipo
      const payload = {
        ...values,
        id_formulario_tipo: formularioTipoId, // Asegura incluir id_formulario_tipo
      };

      if (!payload.id_formulario_tipo) {
        throw new Error("id_formulario_tipo es obligatorio.");
      }

      // Actualizar el campo en el backend
      await updateCampoFormulario(campoId, payload);
      notification.success({
        message: "Campo actualizado",
        description: "El campo se ha actualizado correctamente.",
      });

      onCampoUpdated(); // Refresca la lista de campos
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al actualizar el campo:", error);
      notification.error({
        message: "Error",
        description: error.message || "No se pudo actualizar el campo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Editar Campo"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="nombre_campo"
          label="Nombre del Campo"
          rules={[{ required: true, message: "Ingrese el nombre del campo." }]}
        >
          <Input placeholder="Ejemplo: Fecha de Admisión" />
        </Form.Item>
        <Form.Item
          name="tipo_dato"
          label="Tipo de Dato"
        >
          <Select disabled>
            <Option value="TEXT">Texto</Option>
            <Option value="NUMBER">Numérico</Option>
            <Option value="DATE">Fecha</Option>
            <Option value="BOOLEAN">Booleano</Option>
            <Option value="ENUM">Opciones (ENUM)</Option>
          </Select>
        </Form.Item>
        <Form.Item name="opciones" label="Opciones (solo para ENUM)">
          <Input placeholder="Separar las opciones por comas (Ejemplo: Opción1,Opción2)" />
        </Form.Item>
        <Form.Item name="requerido" label="¿Es requerido?">
          <Select>
            <Option value={true}>Sí</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<EditOutlined />}
            loading={loading}
            block
          >
            Guardar Cambios
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCampoFormulario;
