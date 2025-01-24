import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Upload,
  Row,
  Col,
  Button,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;

const EditUserForm = ({ onClose, onUpdate, initialData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        ...initialData,
        fechaNacimiento: initialData.fechaNacimiento
          ? moment(initialData.fechaNacimiento)
          : null,
      });
    }
  }, [initialData, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (values.fotografia) {
        const file = values.fotografia.file;
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Blob = reader.result.split(",")[1];
          values.fotografia = base64Blob;
          onUpdate({ ...initialData, ...values });
          message.success("Usuario actualizado exitosamente.");
          onClose();
        };
        reader.readAsDataURL(file);
      } else {
        onUpdate({ ...initialData, ...values });
        message.success("Usuario actualizado exitosamente.");
        onClose();
      }
    } catch (error) {
      message.error("Por favor, complete todos los campos requeridos.");
    }
  };

  return (
    <Modal
      title="Editar Usuario"
      visible
      onCancel={onClose}
      footer={null}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialData}
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Identificación"
              name="identificacion"
              rules={[{ required: true, message: "La identificación es obligatoria." }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Nombres"
              name="nombres"
              rules={[{ required: true, message: "Los nombres son obligatorios." }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Apellidos"
              name="apellidos"
              rules={[{ required: true, message: "Los apellidos son obligatorios." }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Fecha de Nacimiento"
              name="fechaNacimiento"
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Dirección" name="direccionDomicilio">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Teléfono" name="telefono">
              <Input />
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
            <Form.Item
              label="Correo"
              name="correo"
              rules={[{ required: true, type: "email", message: "El correo no es válido." }]}
            >
              <Input />
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
          <Col span={12}>
            <Form.Item label="Especialidad" name="especialidad">
              <Input />
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
              <Input />
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
          <Col span={12}>
            <Form.Item
              label="Contraseña"
              name="contraseña"
              rules={[{ required: true, message: "La contraseña es obligatoria." }]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <div style={{ textAlign: "right", marginTop: 16 }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit">
            Guardar Cambios
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditUserForm;
