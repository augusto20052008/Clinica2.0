import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Select, DatePicker, Tabs } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import moment from "moment";

const { TabPane } = Tabs;
const { TextArea } = Input;

const EditPatientForm = ({ onClose, onUpdate, initialData }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        ...initialData,
        fechaNacimiento: initialData.fechaNacimiento
          ? moment(initialData.fechaNacimiento)
          : null,
      });
    }
  }, [initialData]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const formattedData = {
      ...formData,
      fechaNacimiento: formData.fechaNacimiento
        ? moment(formData.fechaNacimiento).format("YYYY-MM-DD")
        : null,
    };
    onUpdate(formattedData);
  };

  return (
    <Modal
      title="Editar Paciente"
      visible
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Guardar Cambios"
      cancelText="Cancelar"
      width={700}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Información Personal" key="1">
          <Form layout="vertical">
            <Form.Item label="Identificación">
              <Input
                prefix={<UserOutlined />}
                value={formData.identificacion}
                disabled
              />
            </Form.Item>
            <Form.Item label="Primer Nombre">
              <Input
                name="primerNombre"
                value={formData.primerNombre}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Apellido Paterno">
              <Input
                name="apellidoParteno"
                value={formData.apellidoParteno}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Apellido Materno">
              <Input
                name="apellidoMaterno"
                value={formData.apellidoMaterno}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              />
            </Form.Item>
          </Form>
        </TabPane>

        <TabPane tab="Contacto" key="2">
          <Form layout="vertical">
            <Form.Item label="Teléfono">
              <Input
                prefix={<PhoneOutlined />}
                name="telefonoPaciente"
                value={formData.telefonoPaciente}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Correo">
              <Input
                prefix={<MailOutlined />}
                name="correo"
                value={formData.correo}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              />
            </Form.Item>
          </Form>
        </TabPane>

        <TabPane tab="Detalles Médicos" key="3">
          <Form layout="vertical">
            <Form.Item label="Sexo">
              <Select
                name="sexo"
                value={formData.sexo}
                onChange={(value) => handleInputChange("sexo", value)}
              >
                <Select.Option value="M">Masculino</Select.Option>
                <Select.Option value="F">Femenino</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Fecha de Nacimiento">
              <DatePicker
                value={formData.fechaNacimiento}
                onChange={(date) =>
                  handleInputChange("fechaNacimiento", date ? date : null)
                }
                format="YYYY-MM-DD"
              />
            </Form.Item>
            <Form.Item label="Grupo Sanguíneo">
              <Input
                name="grupoSanguineo"
                value={formData.grupoSanguineo}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Alergias">
              <TextArea
                name="alergias"
                value={formData.alergias}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              />
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default EditPatientForm;
