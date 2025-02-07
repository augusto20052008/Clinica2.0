import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, Tabs, DatePicker, Card, Avatar, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { updateUser, updateUserPersonalInfo, updateUserAcademicInfo, updateUserContactInfo, fetchRoles } from "../../../utils/api";

const { Option } = Select;
const { TabPane } = Tabs;

// Mapeo de Género para mayor consistencia y reutilización
const generoMap = {
    'M': 'Masculino',
    'F': 'Femenino',
    'O': 'Otro',
};

const EditUserModal = ({ visible, onClose, onUserUpdated, userData }) => {
    const [form] = Form.useForm();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("1");

    // Cargar roles al montar el componente
    useEffect(() => {
        const loadRoles = async () => {
            try {
                const data = await fetchRoles();
                setRoles(data);
            } catch (error) {
                console.error("Error al obtener roles:", error);
                notification.error({
                    message: "Error",
                    description: "No se pudieron cargar los roles. Por favor, recarga la página o contacta al administrador.",
                });
            }
        };
        loadRoles();
    }, []);

    // Establecer los valores del formulario cuando userData cambia
    useEffect(() => {
        if (userData) {
            form.resetFields();
            form.setFieldsValue({
                usuario: userData.usuario,
                correo: userData.correo,
                contraseña: "",
                id_rol: userData.id_rol,
                estado: userData.estado,
                ...userData.informacion_personal,
                fecha_nacimiento: userData.informacion_personal?.fecha_nacimiento ? dayjs(userData.informacion_personal.fecha_nacimiento) : null,
                ...userData.informacion_academica,
                ...userData.informacion_contacto,
            });
        }
    }, [userData, form]);

    const handleCancel = () => {
        form.resetFields();
        setActiveTab("1");
        onClose();
    };

    const handleFinish = async (values) => {
        if (!userData) {
            notification.error({
                message: "Error",
                description: "No se proporcionaron datos del usuario.",
            });
            return;
        }
        setLoading(true);
        try {
            const idUsuario = userData.id_usuario;
            const idPersonalInfo = userData.informacion_personal?.id_informacion_personal;
            const idAcademicaInfo = userData.informacion_academica?.id_informacion_academica;
            const idContactoInfo = userData.informacion_contacto?.id_informacion_contacto;

            // Verificar que todos los IDs necesarios estén presentes
            if (!idPersonalInfo || !idAcademicaInfo || !idContactoInfo) {
                throw new Error("Faltan identificadores de información del usuario.");
            }

            // Actualizar Información Básica del Usuario
            await updateUser(idUsuario, {
                usuario: values.usuario,
                correo: values.correo,
                contraseña: values.contraseña ? values.contraseña : userData.contraseña,
                id_rol: values.id_rol,
                estado: values.estado ? values.estado : userData.estado
            });

            // Actualizar Información Personal
            await updateUserPersonalInfo(idPersonalInfo, {
                ...values,
                fecha_nacimiento: values.fecha_nacimiento ? dayjs(values.fecha_nacimiento).format("YYYY-MM-DD") : null
            });

            // Actualizar Información Académica
            await updateUserAcademicInfo(idAcademicaInfo, values);

            // Actualizar Información de Contacto
            await updateUserContactInfo(idContactoInfo, values);

            // Mostrar Notificación de Éxito
            notification.success({
                message: "Éxito",
                description: "Usuario actualizado correctamente."
            });

            // Ejecutar Callback para Actualizar el Componente Padre y Cerrar el Modal
            onUserUpdated();
            form.resetFields();
            setActiveTab("1");
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            notification.error({
                message: "Error",
                description: error.message || "No se pudo actualizar el usuario. Por favor, inténtalo de nuevo.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            visible={visible}
            title="Editar Usuario"
            onCancel={handleCancel}
            footer={null}
            width={700}
            centered
        >
            <div style={{ textAlign: "center", marginBottom: 20 }}>
                <Avatar size={100} icon={<UserOutlined />} src={userData?.avatar || "/default-avatar.png"} />
                <h2>{userData?.usuario || "Usuario Desconocido"}</h2>
            </div>
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
                    <TabPane tab="Usuario" key="1">
                        <Card>
                            <Form.Item
                                name="usuario"
                                label="Usuario"
                                rules={[{ required: true, message: "Ingrese un usuario." }]}
                            >
                                <Input placeholder="Nombre de usuario" />
                            </Form.Item>
                            <Form.Item
                                name="correo"
                                label="Correo Electrónico"
                                rules={[
                                    { required: true, type: "email", message: "Ingrese un correo válido." }
                                ]}
                            >
                                <Input placeholder="Correo electrónico" />
                            </Form.Item>
                            <Form.Item name="contraseña" label="Contraseña">
                                <Input.Password prefix={<LockOutlined />} placeholder="Nueva contraseña" />
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
                            <Form.Item
                                name="estado"
                                label="Estado"
                                rules={[{ required: true, message: "Seleccione un estado." }]}
                            >
                                <Select placeholder="Seleccione un estado">
                                    <Option value="activo">Activo</Option>
                                    <Option value="inactivo">Inactivo</Option>
                                </Select>
                            </Form.Item>
                        </Card>
                    </TabPane>
                    <TabPane tab="Personal" key="2">
                        <Card>
                            <Form.Item
                                name="cedula"
                                label="Cédula"
                                rules={[{ required: true, message: "Ingrese una cédula." }]}
                            >
                                <Input placeholder="Número de cédula" />
                            </Form.Item>
                            <Form.Item
                                name="nombres"
                                label="Nombres"
                                rules={[{ required: true, message: "Ingrese los nombres." }]}
                            >
                                <Input placeholder="Nombres completos" />
                            </Form.Item>
                            <Form.Item
                                name="apellidos"
                                label="Apellidos"
                                rules={[{ required: true, message: "Ingrese los apellidos." }]}
                            >
                                <Input placeholder="Apellidos completos" />
                            </Form.Item>
                            <Form.Item
                                name="fecha_nacimiento"
                                label="Fecha de Nacimiento"
                                rules={[{ required: true, message: "Seleccione una fecha de nacimiento." }]}
                            >
                                <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                            </Form.Item>
                            <Form.Item
                                name="genero"
                                label="Género"
                                rules={[{ required: true, message: "Seleccione un género." }]}
                            >
                                <Select placeholder="Seleccione un género">
                                    {Object.entries(generoMap).map(([value, label]) => (
                                        <Option key={value} value={value}>
                                            {label}
                                        </Option>
                                    ))}
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
                    <TabPane tab="Académica" key="3">
                        <Card>
                            <Form.Item
                                name="institucion"
                                label="Institución"
                                rules={[{ required: true, message: "Ingrese la institución." }]}
                            >
                                <Input placeholder="Institución educativa" />
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
                                rules={[{ required: true, message: "Ingrese el año de graduación." }]}
                            >
                                <Input placeholder="Año de graduación" />
                            </Form.Item>
                            <Form.Item
                                name="especialidad"
                                label="Especialidad"
                                rules={[{ required: true, message: "Ingrese la especialidad." }]}
                            >
                                <Input placeholder="Especialidad" />
                            </Form.Item>
                            <Form.Item
                                name="registro_senescyt"
                                label="Registro SENESCYT"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="Registro SENESCYT" />
                            </Form.Item>
                        </Card>
                    </TabPane>
                    <TabPane tab="Contacto" key="4">
                        <Card>
                            <Form.Item
                                name="provincia"
                                label="Provincia"
                                rules={[{ required: true, message: "Ingrese la provincia." }]}
                            >
                                <Input placeholder="Provincia" />
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
                                    { required: true, message: "Ingrese un número de celular." },
                                    { pattern: /^\d{10}$/, message: "El número de celular debe tener 10 dígitos." }
                                ]}
                            >
                                <Input placeholder="Número de celular" />
                            </Form.Item>
                        </Card>
                    </TabPane>
                </Tabs>
                <Button type="primary" htmlType="submit" loading={loading} block>
                    Guardar Cambios
                </Button>
            </Form>
        </Modal>
    );
}

export default EditUserModal;
