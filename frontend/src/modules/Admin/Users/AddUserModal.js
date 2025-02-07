import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, Tabs, notification, DatePicker, Card, Divider, } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, IdcardOutlined, HomeOutlined, PhoneOutlined, BookOutlined, CalendarOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
import { createUser, createUserPersonalInfo, createUserAcademicInfo, createUserContactInfo, fetchRoles, } from "../../../utils/api";

const { Option } = Select;
const { TabPane } = Tabs;

const AddUserModal = ({ visible, onClose, onUserAdded }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [activeKey, setActiveKey] = useState("1");

    const tabs = [{ key: "1", label: "Datos Básicos" }, { key: "2", label: "Información Personal" }, { key: "3", label: "Información Académica" }, { key: "4", label: "Información de Contacto" },];

    useEffect(() => {
        const loadRoles = async () => {
            try {
                const data = await fetchRoles();
                setRoles(data);
            } catch (error) {
                notification.error({ message: "Error", description: "Roles no disponibles", });
            }
        };
        loadRoles();
    }, []);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const newUser = await createUser({usuario: values.usuario, correo: values.correo, contraseña: values.contraseña, id_rol: values.id_rol});
            const userId = newUser.id_usuario;

            if (values.cedula || values.nombres || values.apellidos) {
                await createUserPersonalInfo({
                    id_usuario: userId,
                    cedula: values.cedula,
                    nombres: values.nombres,
                    apellidos: values.apellidos,
                    fecha_nacimiento: values.fecha_nacimiento ? dayjs(values.fecha_nacimiento).format("YYYY-MM-DD") : null,
                    genero: values.genero || null,
                    estado_civil: values.estado_civil || null,
                });
            }

            if (values.institucion || values.titulo || values.anio_graduacion || values.registro_senescyt) {
                await createUserAcademicInfo({
                    id_usuario: userId,
                    institucion: values.institucion,
                    titulo: values.titulo,
                    anio_graduacion: values.anio_graduacion,
                    especialidad: values.especialidad || null,
                    registro_senescyt: values.registro_senescyt,
                });
            }

            if (values.provincia || values.ciudad || values.calle_principal || values.calle_secundaria || values.celular) {
                await createUserContactInfo({
                    id_usuario: userId,
                    provincia: values.provincia,
                    ciudad: values.ciudad,
                    calle_principal: values.calle_principal,
                    calle_secundaria: values.calle_secundaria,
                    celular: values.celular,
                });
            }

            notification.success({
                message: "Usuario Creado",
                description: `Registro completo de ${values.nombres} ${values.apellidos}`,
            });

            onUserAdded();
            form.resetFields();
            setActiveKey("1");
            onClose();
        } catch (error) {
            notification.error({
                message: "Error",
                description: "Problema al crear el usuario.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleNext = async () => {
        try {
            await form.validateFields(getFieldsByTab(activeKey));
            const currentIndex = tabs.findIndex((tab) => tab.key === activeKey);
            if (currentIndex < tabs.length - 1) {
                setActiveKey(tabs[currentIndex + 1].key);
            }
        } catch (errorInfo) {
            console.error("Validación fallida:", errorInfo);
        }
    };

    const handlePrev = () => {
        const currentIndex = tabs.findIndex((tab) => tab.key === activeKey);
        if (currentIndex > 0) {
            setActiveKey(tabs[currentIndex - 1].key);
        }
    };

    const getFieldsByTab = (key) => {
        switch (key) {
            case "1":
                return ["usuario", "correo", "contraseña", "id_rol"];
            case "2":
                return [
                    "cedula",
                    "nombres",
                    "apellidos",
                    "fecha_nacimiento",
                    "genero",
                    "estado_civil",
                ];
            case "3":
                return [
                    "institucion",
                    "titulo",
                    "anio_graduacion",
                    "especialidad",
                    "registro_senescyt",
                ];
            case "4":
                return [
                    "provincia",
                    "ciudad",
                    "calle_principal",
                    "calle_secundaria",
                    "celular",
                ];
            default:
                return [];
        }
    };

    return (
        <Modal
            title="Agregar Usuario"
            visible={visible}
            onCancel={() => {
                form.resetFields();
                setActiveKey("1");
                onClose();
            }}
            footer={null}
            width={700}
            destroyOnClose
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Tabs
                    activeKey={activeKey}
                    onChange={(key) => setActiveKey(key)}
                    tabPosition="top"
                >
                    {/* DATOS BÁSICOS */}
                    <TabPane tab="Datos Básicos" key="1">
                        <Card>
                            <Form.Item
                                name="usuario"
                                label="Usuario"
                                rules={[{ required: true, message: "Ingrese un usuario." }]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="Nombre de usuario"
                                />
                            </Form.Item>
                            <Form.Item
                                name="correo"
                                label="Correo Electrónico"
                                rules={[
                                    { required: true, type: "email", message: "Ingrese un correo válido." },
                                ]}
                            >
                                <Input
                                    prefix={<MailOutlined />}
                                    placeholder="Correo electrónico"
                                />
                            </Form.Item>
                            <Form.Item
                                name="contraseña"
                                label="Contraseña"
                                rules={[{ required: true, message: "Ingrese una contraseña." }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Contraseña"
                                />
                            </Form.Item>
                            <Form.Item
                                name="id_rol"
                                label="Rol"
                                rules={[{ required: true, message: "Seleccione un rol." }]}
                            >
                                <Select placeholder="Seleccione un rol">
                                    {roles.map((rol) => (
                                        <Option key={rol.id_rol} value={rol.id_rol}>
                                            {rol.nombre_rol}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Card>
                    </TabPane>

                    {/* INFORMACIÓN PERSONAL */}
                    <TabPane tab="Información Personal" key="2">
                        <Card>
                            <Form.Item
                                name="cedula"
                                label="Cédula"
                                rules={[
                                    { required: true, message: "Ingrese su número de cédula." },
                                    { pattern: /^\d+$/, message: "La cédula debe contener solo números." },
                                ]}
                            >
                                <Input
                                    prefix={<IdcardOutlined />}
                                    placeholder="Número de cédula"
                                />
                            </Form.Item>
                            <Form.Item
                                name="nombres"
                                label="Nombres"
                                rules={[{ required: true, message: "Ingrese sus nombres." }]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="Nombres completos"
                                />
                            </Form.Item>
                            <Form.Item
                                name="apellidos"
                                label="Apellidos"
                                rules={[{ required: true, message: "Ingrese sus apellidos." }]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="Apellidos completos"
                                />
                            </Form.Item>
                            <Form.Item
                                name="fecha_nacimiento"
                                label="Fecha de Nacimiento"
                                rules={[{ required: true, message: "Seleccione su fecha de nacimiento." }]}
                            >
                                <DatePicker
                                    style={{ width: "100%" }}
                                    format="YYYY-MM-DD"
                                    placeholder="YYYY-MM-DD"
                                    prefix={<CalendarOutlined />}
                                />
                            </Form.Item>
                            <Form.Item
                                name="genero"
                                label="Género"
                                rules={[{ required: true, message: "Seleccione un género." }]}
                            >
                                <Select placeholder="Seleccione un género">
                                    <Option value="M">Masculino</Option>
                                    <Option value="F">Femenino</Option>
                                    <Option value="O">Otro</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="estado_civil"
                                label="Estado Civil"
                                rules={[{ required: true, message: "Seleccione el estado civil." }]}
                            >
                                <Select placeholder="Seleccione el estado civil">
                                    <Option value="SOLTERO">Soltero</Option>
                                    <Option value="CASADO">Casado</Option>
                                    <Option value="DIVORCIADO">Divorciado</Option>
                                    <Option value="VIUDO">Viudo</Option>
                                    <Option value="OTRO">Otro</Option>
                                </Select>
                            </Form.Item>
                        </Card>
                    </TabPane>

                    {/* INFORMACIÓN ACADÉMICA */}
                    <TabPane tab="Información Académica" key="3">
                        <Card>
                            <Form.Item
                                name="institucion"
                                label="Institución"
                                rules={[{ required: true, message: "Ingrese la institución." }]}
                            >
                                <Input
                                    prefix={<BookOutlined />}
                                    placeholder="Institución educativa"
                                />
                            </Form.Item>
                            <Form.Item
                                name="titulo"
                                label="Título"
                                rules={[{ required: true, message: "Ingrese el título." }]}
                            >
                                <Input placeholder="Título académico" />
                            </Form.Item>
                            <Form.Item
                                name="anio_graduacion"
                                label="Año de Graduación"
                                rules={[
                                    { required: true, message: "Ingrese el año de graduación." },
                                    {
                                        pattern: /^\d{4}$/,
                                        message: "Ingrese un año válido de 4 dígitos.",
                                    },
                                ]}
                            >
                                <Input placeholder="2020" maxLength={4} />
                            </Form.Item>
                            <Form.Item
                                name="especialidad"
                                label="Especialidad"
                                rules={[{ required: false, message: "Ingrese la especialidad." }]}
                            >
                                <Input placeholder="Especialidad médica" />
                            </Form.Item>
                            <Form.Item
                                name="registro_senescyt"
                                label="Registro SENESCYT"
                                rules={[{ required: true, message: "Ingrese el registro SENESCYT." }]}
                            >
                                <Input placeholder="Registro SENESCYT" />
                            </Form.Item>
                        </Card>
                    </TabPane>

                    {/* INFORMACIÓN DE CONTACTO */}
                    <TabPane tab="Información de Contacto" key="4">
                        <Card>
                            <Form.Item
                                name="provincia"
                                label="Provincia"
                                rules={[{ required: true, message: "Ingrese la provincia." }]}
                            >
                                <Input
                                    prefix={<HomeOutlined />}
                                    placeholder="Provincia"
                                />
                            </Form.Item>
                            <Form.Item
                                name="ciudad"
                                label="Ciudad"
                                rules={[{ required: true, message: "Ingrese la ciudad." }]}
                            >
                                <Input placeholder="Ciudad" />
                            </Form.Item>
                            <Form.Item
                                name="calle_principal"
                                label="Calle Principal"
                                rules={[{ required: true, message: "Ingrese la calle principal." }]}
                            >
                                <Input placeholder="Calle principal" />
                            </Form.Item>
                            <Form.Item
                                name="calle_secundaria"
                                label="Calle Secundaria"
                                rules={[{ required: true, message: "Ingrese la calle secundaria." }]}
                            >
                                <Input placeholder="Calle secundaria" />
                            </Form.Item>
                            <Form.Item
                                name="celular"
                                label="Celular"
                                rules={[
                                    { required: true, message: "Ingrese el número de celular." },
                                    {
                                        pattern: /^\d{10}$/,
                                        message: "Ingrese un número de celular válido de 10 dígitos.",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<PhoneOutlined />}
                                    placeholder="Número de celular"
                                />
                            </Form.Item>

                            {/* Botones de Navegación */}
                            <Divider />
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button onClick={handlePrev}>Anterior</Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    Registrar
                                </Button>
                            </div>
                        </Card>
                    </TabPane>
                </Tabs>

                {/* Botones de Navegación para Pestañas Anteriores */}
                {activeKey !== "4" && (
                    <Divider />
                )}

                {activeKey !== "4" && (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {activeKey !== "1" && (
                            <Button onClick={handlePrev}>Anterior</Button>
                        )}
                        <Button type="primary" onClick={handleNext}>
                            Siguiente
                        </Button>
                    </div>
                )}
            </Form>
        </Modal>
    );
};

export default AddUserModal;
