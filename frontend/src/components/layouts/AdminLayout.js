import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar"; // Asegúrate de que esta sea la ruta correcta
import CustomHeader from "./Header"; // Importa el CustomHeader
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  BookOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

function AdminLayout({ children }) {
  const adminLinks = [
    {
      label: "Dashboard",
      to: "/admin/dashboard",
      icon: <DashboardOutlined />, // Icono para Dashboard
    },
    {
      label: "Usuarios",
      to: "/admin/users",
      icon: <UserOutlined />, // Icono para Usuarios
      subMenu: [
        { label: "Firma Electrónica", to: "/admin/users/firma-electronica" },
      ],
    },
    {
      label: "Pacientes",
      to: "/admin/patients",
      icon: <TeamOutlined />, // Icono para Pacientes
    },
    {
      label: "Historia Clínica",
      to: "/admin/historia-clinica",
      icon: <BookOutlined />,
      subMenu: [
        { label: "Plantillas", to: "/admin/historia-clinica/plantillas" },
        { label: "Formularios", to: "/admin/historia-clinica/formularios" },
      ],
    },
  ];

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión, como redirigir o limpiar tokens
    console.log("Cerrando sesión...");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar con onLogout */}
      <Sidebar links={adminLinks} onLogout={handleLogout} />

      {/* Área principal */}
      <Layout>
        {/* Reemplazamos el Header por CustomHeader */}
        <CustomHeader username="Administrador" profilePic="https://via.placeholder.com/40" />

        <Content
          style={{
            margin: "16px",
            padding: "16px",
            background: "#fff",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
