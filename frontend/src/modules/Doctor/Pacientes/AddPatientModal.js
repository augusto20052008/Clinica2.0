import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, DatePicker, Row, Col, notification } from "antd";
import { UserOutlined, IdcardOutlined, CalendarOutlined, ManOutlined, WomanOutlined, SaveOutlined } from "@ant-design/icons";
import { createPatient } from "../../../utils/api"; // Función para crear paciente
import dayjs from "dayjs";

const { Option } = Select;

const AddPatientModal = ({ visible, onClose, onPatientAdded }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const formattedData = {
                ...values,
                fecha_nacimiento: values.fecha_nacimiento
                    ? dayjs(values.fecha_nacimiento).format("YYYY-MM-DD")
                    : null,
            };

            await createPatient(formattedData);

            notification.success({
                message: "Paciente agregado",
                description: "El paciente se ha creado exitosamente.",
            });

            onPatientAdded(); // Actualiza la lista en el componente principal
            form.resetFields(); // Limpia el formulario
            onClose(); // Cierra el modal
        } catch (error) {
            console.error("Error al agregar paciente:", error);
            notification.error({
                message: "Error",
                description: error.message || "No se pudo crear el paciente.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Agregar Paciente"
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            name="nro_identificacion"
                            label="Número de Identificación"
                            rules={[{ required: true, message: "Este campo es obligatorio." }]}
                        >
                            <Input
                                prefix={<IdcardOutlined />}
                                placeholder="Número de identificación"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="tipo_identificacion"
                            label="Tipo de Identificación"
                            rules={[{ required: true, message: "Este campo es obligatorio." }]}
                        >
                            <Select placeholder="Seleccione un tipo de identificación">
                                <Option value="cedula">Cédula</Option>
                                <Option value="pasaporte">Pasaporte</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            name="primer_nombre"
                            label="Primer Nombre"
                            rules={[{ required: true, message: "Este campo es obligatorio." }]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Primer nombre"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="segundo_nombre"
                            label="Segundo Nombre"
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Segundo nombre"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            name="primer_apellido"
                            label="Primer Apellido"
                            rules={[{ required: true, message: "Este campo es obligatorio." }]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Primer apellido"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="segundo_apellido"
                            label="Segundo Apellido"
                            rules={[{ required: true, message: "Este campo es obligatorio." }]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Segundo apellido"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            name="genero"
                            label="Género"
                            rules={[{ required: true, message: "Seleccione un género." }]}
                        >
                            <Select placeholder="Seleccione un género">
                                <Option value="M">
                                    <ManOutlined /> Masculino
                                </Option>
                                <Option value="F">
                                    <WomanOutlined /> Femenino
                                </Option>
                                <Option value="O">Otro</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="fecha_nacimiento"
                            label="Fecha de Nacimiento"
                            rules={[{ required: true, message: "Seleccione una fecha." }]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                prefix={<CalendarOutlined />}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="end">
                    <Col>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SaveOutlined />}
                                loading={loading}
                                style={{ marginTop: 20 }}
                            >
                                Guardar
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default AddPatientModal;
