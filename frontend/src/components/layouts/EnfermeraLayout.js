import React from "react";
import { Layout, Avatar } from "antd";
import Sidebar from "./Sidebar";
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;

function EnfermeraLayout({ children }) {
  const nurseLinks = [
    {
      label: "Dashboard",
      to: "/enfermera/dashboard",
      icon: <DashboardOutlined />, 
    },
    {
      label: "Pacientes",
      to: "/enfermera/pacientes",
      icon: <UserOutlined />, 
      subMenu: [
        { label: "Referidos", to: "/enfermera/pacientes/referidoEnfermera" },
      ],
    },
    {
      label: "Historias Clínicas",
      to: "/enfermera/historias",
      icon: <FileTextOutlined />, 
      subMenu: [
        { label: "Formulario", to: "/enfermera/historias/formulariosEnfermera" },
      ],
    },
  ];

  const handleLogout = () => {
    console.log("Cerrando sesión de la enfermera...");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar con onLogout */}
      <Sidebar links={nurseLinks} onLogout={handleLogout} />

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
          <div style={{ color: "white" }}>Bienvenida, Enfermera</div>
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

export default EnfermeraLayout;
