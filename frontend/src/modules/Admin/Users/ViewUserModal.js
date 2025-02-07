import React, { useState } from "react";
import { Modal, Tabs, Descriptions, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { TabPane } = Tabs;

const ViewUserModal = ({ visible, onClose, userData }) => {
    const [currentTab, setCurrentTab] = useState("0");

    const handleClose = () => {
        setCurrentTab("0");
        onClose();
    };

    return (
        <Modal
            visible={visible}
            title={null}
            onCancel={handleClose}
            footer={null}
            width={800}
            centered
        >
            {/* Imagen y Nombre del Usuario */}
            <div style={{ textAlign: "center", marginBottom: 20 }}>
                <Avatar size={100} icon={<UserOutlined />} src={userData?.avatar || "/default-avatar.png"} />
                <h2>{userData?.usuario}</h2>
            </div>

            {/* Contenido de cada pestaña */}
            <Tabs activeKey={currentTab} onChange={setCurrentTab} centered>
                {/* Información del Usuario */}
                <TabPane key="0" tab="Usuario">
                    <Descriptions title="Información del Usuario" bordered column={1}>
                        <Descriptions.Item label="Usuario">{userData?.usuario || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Correo">{userData?.correo || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Fecha de Registro">
                            {userData?.fecha_registro
                                ? dayjs(userData.fecha_registro).format("YYYY-MM-DD HH:mm:ss")
                                : "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Último Login">
                            {userData?.ultimo_login
                                ? dayjs(userData.ultimo_login).format("YYYY-MM-DD HH:mm:ss")
                                : "Sin dato"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Estado">
                            {userData?.estado === "activo" ? "🟢 Activo" : "🔴 Inactivo"}
                        </Descriptions.Item>
                    </Descriptions>
                </TabPane>

                {/* Información Personal */}
                <TabPane key="1" tab="Personal">
                    <Descriptions title="Información Personal" bordered column={1}>
                        <Descriptions.Item label="Cédula">{userData?.informacion_personal?.cedula || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Nombres">{userData?.informacion_personal?.nombres || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Apellidos">{userData?.informacion_personal?.apellidos || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Fecha de Nacimiento">{userData?.informacion_personal?.fecha_nacimiento? dayjs(userData.informacion_personal.fecha_nacimiento).format("YYYY-MM-DD"): "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Género">{userData?.informacion_personal?.genero || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Estado Civil">{userData?.informacion_personal?.estado_civil || "N/A"}</Descriptions.Item>
                    </Descriptions>
                </TabPane>

                {/* Información de Contacto */}
                <TabPane key="2" tab="Contacto">
                    <Descriptions title="Información de Contacto" bordered column={1}>
                        <Descriptions.Item label="Provincia">{userData?.informacion_contacto?.provincia || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Ciudad">{userData?.informacion_contacto?.ciudad || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Calle Principal">{userData?.informacion_contacto?.calle_principal || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Calle Secundaria">{userData?.informacion_contacto?.calle_secundaria || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Celular">{userData?.informacion_contacto?.celular || "N/A"}</Descriptions.Item>
                    </Descriptions>
                </TabPane>

                {/* Información Académica */}
                <TabPane key="3" tab="Académica">
                    <Descriptions title="Información Académica" bordered column={1}>
                        <Descriptions.Item label="Institución">{userData?.informacion_academica?.institucion || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Título">{userData?.informacion_academica?.titulo || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Año de Graduación">{userData?.informacion_academica?.anio_graduacion || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Especialidad">{userData?.informacion_academica?.especialidad || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Registro SENESCYT">{userData?.informacion_academica?.registro_senescyt || "N/A"}</Descriptions.Item>
                    </Descriptions>
                </TabPane>
            </Tabs>
        </Modal>
    );
};

export default ViewUserModal;