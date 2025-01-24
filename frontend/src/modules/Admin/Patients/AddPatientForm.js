import React, { useState } from "react";
import { Modal, Button, Input, Select, DatePicker, Form, Space, Tabs, Row, Col, message } from "antd";
import { UserAddOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import moment from "moment";

const { Option } = Select;
const { TabPane } = Tabs;

const AddPatientForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    identificacion: "",
    primerNombre: "",
    apellidoParteno: "",
    telefonoPaciente: "",
    fechaNacimiento: "",
    correo: "",
    sexo: "M",
    estadoCivil: "Sol",
    direccionPaciente: "",
    grupoSanguineo: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.identificacion) newErrors.identificacion = "La identificación es obligatoria.";
    if (!formData.primerNombre) newErrors.primerNombre = "El primer nombre es obligatorio.";
    if (!formData.apellidoParteno) newErrors.apellidoParteno = "El apellido paterno es obligatorio.";
    if (!formData.correo || !/\S+@\S+\.\S+/.test(formData.correo)) newErrors.correo = "El correo electrónico no es válido.";
    if (!formData.telefonoPaciente) newErrors.telefonoPaciente = "El teléfono es obligatorio.";
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria.";
    if (!formData.grupoSanguineo) newErrors.grupoSanguineo = "El grupo sanguíneo es obligatorio.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await onAdd(formData);
      onClose();
      message.success("Paciente agregado exitosamente");
    } catch (error) {
      message.error("Ocurrió un error al agregar el paciente. Intente nuevamente.");
    }
  };

  return (
    <Modal
      title={<Space><UserAddOutlined /> Agregar Paciente</Space>}
      visible={true}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Datos Personales" key="1">
          <Form layout="vertical" onFinish={handleSubmit}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Identificación" required>
                  <Input
                    prefix={<UserAddOutlined />}
                    value={formData.identificacion}
                    onChange={(e) => handleInputChange('identificacion', e.target.value)}
                    className={errors.identificacion ? 'error' : ''}
                  />
                  {errors.identificacion && <span className="ant-form-item-explain">{errors.identificacion}</span>}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Primer Nombre" required>
                  <Input
                    value={formData.primerNombre}
                    onChange={(e) => handleInputChange('primerNombre', e.target.value)}
                    className={errors.primerNombre ? 'error' : ''}
                  />
                  {errors.primerNombre && <span className="ant-form-item-explain">{errors.primerNombre}</span>}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Apellido Paterno" required>
                  <Input
                    value={formData.apellidoParteno}
                    onChange={(e) => handleInputChange('apellidoParteno', e.target.value)}
                    className={errors.apellidoParteno ? 'error' : ''}
                  />
                  {errors.apellidoParteno && <span className="ant-form-item-explain">{errors.apellidoParteno}</span>}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Apellido Materno">
                  <Input
                    value={formData.apellidoMaterno}
                    onChange={(e) => handleInputChange('apellidoMaterno', e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Teléfono" required>
                  <Input
                    prefix={<PhoneOutlined />}
                    value={formData.telefonoPaciente}
                    onChange={(e) => handleInputChange('telefonoPaciente', e.target.value)}
                    className={errors.telefonoPaciente ? 'error' : ''}
                  />
                  {errors.telefonoPaciente && <span className="ant-form-item-explain">{errors.telefonoPaciente}</span>}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Correo" required>
                  <Input
                    prefix={<MailOutlined />}
                    value={formData.correo}
                    onChange={(e) => handleInputChange('correo', e.target.value)}
                    className={errors.correo ? 'error' : ''}
                  />
                  {errors.correo && <span className="ant-form-item-explain">{errors.correo}</span>}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Fecha de Nacimiento" required>
                  <DatePicker
                    value={formData.fechaNacimiento ? moment(formData.fechaNacimiento) : null}
                    onChange={(date) => handleInputChange('fechaNacimiento', date ? date.format('YYYY-MM-DD') : '')}
                    style={{ width: '100%' }}
                  />
                  {errors.fechaNacimiento && <span className="ant-form-item-explain">{errors.fechaNacimiento}</span>}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Sexo">
                  <Select
                    value={formData.sexo}
                    onChange={(value) => handleInputChange('sexo', value)}
                  >
                    <Option value="M">Masculino</Option>
                    <Option value="F">Femenino</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Grupo Sanguíneo" required>
                  <Select
                    value={formData.grupoSanguineo}
                    onChange={(value) => handleInputChange('grupoSanguineo', value)}
                  >
                    <Option value="O-">O-</Option>
                    <Option value="O+">O+</Option>
                    <Option value="A−">A−</Option>
                    <Option value="A+">A+</Option>
                    <Option value="B−">B−</Option>
                    <Option value="B+">B+</Option>
                    <Option value="AB−">AB−</Option>
                    <Option value="AB+">AB+</Option>
                  </Select>
                  {errors.grupoSanguineo && <span className="ant-form-item-explain">{errors.grupoSanguineo}</span>}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Estado Civil">
                  <Select
                    value={formData.estadoCivil}
                    onChange={(value) => handleInputChange('estadoCivil', value)}
                  >
                    <Option value="Sol">Soltero</Option>
                    <Option value="Cas">Casado</Option>
                    <Option value="Div">Divorciado</Option>
                    <Option value="Viudo">Viudo</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Dirección">
              <Input
                prefix={<EnvironmentOutlined />}
                value={formData.direccionPaciente}
                onChange={(e) => handleInputChange('direccionPaciente', e.target.value)}
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
            >
              Agregar Paciente
            </Button>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default AddPatientForm;
