import React, { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { createEstablecimiento } from "../../../../../utils/api";

function AddEstablecimiento({ onClose, onRefresh }) {
  const [formData, setFormData] = useState({
    nombreEstablecimiento: "",
    codigoEstablecimiento: "",
    institucionSistema: "",
    codigoParroquiaUO: "",
    codigoCantonUO: "",
    codigoProvinciaUO: "",
  });

  const handleSubmit = async (values) => {
    try {
      await createEstablecimiento(values);
      alert("Establecimiento creado exitosamente");
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error al crear el establecimiento:", error);
      alert("Error al crear el establecimiento");
    }
  };

  return (
    <div className="add-establecimiento-container">
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={formData}
        onValuesChange={(_, values) => setFormData(values)}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Nombre:"
              name="nombreEstablecimiento"
              rules={[{ required: true, message: "Por favor ingrese el nombre" }]}
            >
              <Input
                prefix={<SaveOutlined />}
                placeholder="Nombre del establecimiento"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Código:"
              name="codigoEstablecimiento"
              rules={[{ required: true, message: "Por favor ingrese el código" }]}
            >
              <Input
                prefix={<SaveOutlined />}
                placeholder="Código del establecimiento"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Sistema Institucional:" name="institucionSistema">
              <Input
                prefix={<SaveOutlined />}
                placeholder="Sistema institucional"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Código Parroquia:" name="codigoParroquiaUO">
              <Input
                prefix={<SaveOutlined />}
                placeholder="Código parroquia"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Código Cantón:" name="codigoCantonUO">
              <Input
                prefix={<SaveOutlined />}
                placeholder="Código cantón"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Código Provincia:" name="codigoProvinciaUO">
              <Input
                prefix={<SaveOutlined />}
                placeholder="Código provincia"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            style={{ marginRight: 8 }}
          >
            Guardar
          </Button>
          <Button
            type="default"
            onClick={onClose}
            icon={<CloseOutlined />}
          >
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddEstablecimiento;
