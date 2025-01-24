import React, { useState } from "react";
import { Input, Form, Button, notification } from "antd";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { updateEstablecimiento } from "../../../../../utils/api"; // Asegúrate de definir esta función en api.js

function EditEstablecimiento({ onClose, onRefresh, establecimiento }) {
  const [formData, setFormData] = useState({
    nombreEstablecimiento: establecimiento.nombreEstablecimiento || "",
    codigoEstablecimiento: establecimiento.codigoEstablecimiento || "",
    institucionSistema: establecimiento.institucionSistema || "",
    codigoParroquiaUO: establecimiento.codigoParroquiaUO || "",
    codigoCantonUO: establecimiento.codigoCantonUO || "",
    codigoProvinciaUO: establecimiento.codigoProvinciaUO || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEstablecimiento(establecimiento.idEstablecimiento, formData);
      notification.success({
        message: "Éxito",
        description: "Establecimiento actualizado exitosamente",
      });
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error al actualizar el establecimiento:", error);
      notification.error({
        message: "Error",
        description: "Error al actualizar el establecimiento",
      });
    }
  };

  return (
    <div className="edit-establecimiento-container">
      <h2>Editar Establecimiento</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Nombre" required>
          <Input
            type="text"
            name="nombreEstablecimiento"
            value={formData.nombreEstablecimiento}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Código" required>
          <Input
            type="text"
            name="codigoEstablecimiento"
            value={formData.codigoEstablecimiento}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Sistema Institucional">
          <Input
            type="text"
            name="institucionSistema"
            value={formData.institucionSistema}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Código Parroquia">
          <Input
            type="text"
            name="codigoParroquiaUO"
            value={formData.codigoParroquiaUO}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Código Cantón">
          <Input
            type="text"
            name="codigoCantonUO"
            value={formData.codigoCantonUO}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Código Provincia">
          <Input
            type="text"
            name="codigoProvinciaUO"
            value={formData.codigoProvinciaUO}
            onChange={handleChange}
          />
        </Form.Item>
        <div className="form-buttons">
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSubmit}
          >
            Guardar
          </Button>
          <Button
            type="default"
            icon={<CloseOutlined />}
            onClick={onClose}
            style={{ marginLeft: "10px" }}
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EditEstablecimiento;
