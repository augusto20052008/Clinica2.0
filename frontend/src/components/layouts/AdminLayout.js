import React from "react";
import { Layout, Avatar } from "antd";
import Sidebar from "./Sidebar"; // Asegúrate de que esta sea la ruta correcta
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  ToolOutlined,
  BookOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;

function AdminLayout({ children }) {
  const adminLinks = [
    {
      label: "Dashboard",
      to: "/admin/dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: "Usuarios",
      to: "/admin/users",
      icon: <UserOutlined />,
      subMenu: [
        { label: "Firma Electrónica", to: "/admin/users/firma-electronica" },
        { label: "Jornada", to: "/admin/users/jornada" },
        { label: "Título", to: "/admin/users/titulo" },
      ],
    },
    {
      label: "Pacientes",
      to: "/admin/patients",
      icon: <TeamOutlined />,
      subMenu: [{ label: "Referidos", to: "/admin/patients/referido" }],
    },
    {
      label: "Solicitudes de Cambio",
      to: "/admin/change",
      icon: <ToolOutlined />,
    },
    {
      label: "Historia Clínica",
      to: "/admin/historia-clinica",
      icon: <BookOutlined />,
      subMenu: [
        { label: "Establecimiento", to: "/admin/historia-clinica/establecimiento" },
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
        <Header
          style={{
            background: "#001529",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: "white" }}>Bienvenido, Administrador</div>
          <Avatar src="https://via.placeholder.com/40" size="large" />
        </Header>

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
