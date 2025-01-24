import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Upload,
  Tabs,
  Row,
  Col,
  message,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Option } = Select;

const AddUserForm = ({ onClose, onAdd }) => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("personal");

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (values.fotografia) {
        const file = values.fotografia.file;
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Blob = reader.result.split(",")[1];
          values.fotografia = base64Blob;
          onAdd(values);
          notification.success({
            message: "Usuario creado",
            description: "El usuario ha sido creado exitosamente.",
          });
          onClose();
        };
        reader.readAsDataURL(file);
      } else {
        onAdd(values);
        notification.success({
          message: "Usuario creado",
          description: "El usuario ha sido creado exitosamente.",
        });
        onClose();
      }
    } catch (error) {
      message.error("Por favor, complete todos los campos requeridos.");
    }
  };

  return (
    <Modal
      title="Agregar Usuario"
      visible
      onCancel={onClose}
      footer={null}
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
        <TabPane tab="Información Personal" key="personal">
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              sexo: "M",
              estadoCivil: "Sol",
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Identificación"
                  name="identificacion"
                  rules={[{ required: true, message: "La identificación es obligatoria." }]}
                >
                  <Input placeholder="Ingrese la identificación" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Correo"
                  name="correo"
                  rules={[{ required: true, type: "email", message: "El correo no es válido." }]}
                >
                  <Input placeholder="Ingrese el correo" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Contraseña"
                  name="contraseña"
                  rules={[{ required: true, min: 6, message: "La contraseña debe tener al menos 6 caracteres." }]}
                >
                  <Input.Password placeholder="Ingrese la contraseña" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Nombres"
                  name="nombres"
                  rules={[{ required: true, message: "Los nombres son obligatorios." }]}
                >
                  <Input placeholder="Ingrese los nombres" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Apellidos"
                  name="apellidos"
                  rules={[{ required: true, message: "Los apellidos son obligatorios." }]}
                >
                  <Input placeholder="Ingrese los apellidos" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Fecha de Nacimiento"
                  name="fechaNacimiento"
                  rules={[{ required: true, message: "La fecha de nacimiento es obligatoria." }]}
                >
                  <DatePicker style={{ width: "100%" }} placeholder="Seleccione la fecha" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Sexo" name="sexo">
                  <Select>
                    <Option value="M">Masculino</Option>
                    <Option value="F">Femenino</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Estado Civil" name="estadoCivil">
                  <Select>
                    <Option value="Sol">Soltero</Option>
                    <Option value="Cas">Casado</Option>
                    <Option value="Div">Divorciado</Option>
                    <Option value="Viudo">Viudo</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TabPane>

        <TabPane tab="Contacto" key="contact">
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Dirección" name="direccionDomicilio">
                  <Input placeholder="Ingrese la dirección" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Teléfono" name="telefono">
                  <Input placeholder="Ingrese el teléfono" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TabPane>

        <TabPane tab="Información Profesional" key="professional">
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Especialidad" name="especialidad">
                  <Input placeholder="Ingrese la especialidad" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Fotografía" name="fotografia">
                  <Upload beforeUpload={() => false} maxCount={1}>
                    <Button icon={<UploadOutlined />}>Subir Fotografía</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Consultorio" name="consultorio">
                  <Input placeholder="Ingrese el consultorio" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Estado" name="estado">
                  <Select>
                    <Option value="Act">Activo</Option>
                    <Option value="Ina">Inactivo</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Rol" name="rol">
                  <Select>
                    <Option value="Doctor">Doctor</Option>
                    <Option value="Admin">Administrador</Option>
                    <Option value="Enfermera">Enfermera</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TabPane>
      </Tabs>

      <div style={{ textAlign: "right", marginTop: 16 }}>
        <Button onClick={onClose} style={{ marginRight: 8 }}>
          Cancelar
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          Agregar Usuario
        </Button>
      </div>
    </Modal>
  );
};

export default AddUserForm;
