import React from "react";
import { Layout, Avatar } from "antd";
import Sidebar from "./Sidebar";
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;

function DoctorLayout({ children }) {
  const doctorLinks = [
    {
      label: "Dashboard",
      to: "/doctor/dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: "Pacientes",
      to: "/doctor/pacientes",
      icon: <UserOutlined />,
      subMenu: [
        { label: "Referidos", to: "/doctor/pacientes/referidoDoctor" },
      ],
    },
    {
      label: "Historias Clínicas",
      to: "/doctor/historias",
      icon: <FileTextOutlined />,
      subMenu: [
        { label: "Formulario", to: "/doctor/historias/formulariosDoctor" },
      ],
    },
  ];

  const handleLogout = () => {
    console.log("Cerrando sesión del doctor...");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar con onLogout */}
      <Sidebar links={doctorLinks} onLogout={handleLogout} />

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
          <div style={{ color: "white" }}>Bienvenido, Doctor</div>
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

export default DoctorLayout;
