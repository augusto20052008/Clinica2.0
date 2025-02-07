import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import CustomHeader from "./Header"; // Reutilizamos el CustomHeader
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

function DoctorLayout({ children }) {
  const doctorLinks = [
    {
      label: "Dashboard",
      to: "/doctor/dashboard",
      icon: <DashboardOutlined />,
    },
    {label: "Pacientes", to: "/doctor/pacientes", icon: <UserOutlined />},
    {label: "Historias Clínicas", to: "/doctor/historias", icon: <FileTextOutlined />},
    { label: "Formulario", to: "/doctor/historias/formulariosDoctor", icon: <FileTextOutlined /> },

  ];

  const handleLogout = () => {
    console.log("Cerrando sesión del doctor...");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar links={doctorLinks} onLogout={handleLogout} />
      <Layout>
        <CustomHeader username="Doctor" profilePic="https://via.placeholder.com/40" />
        <Content style={{ margin: "16px", padding: "16px", background: "#fff" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default DoctorLayout;
