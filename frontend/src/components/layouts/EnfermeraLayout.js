import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import CustomHeader from "./Header"; 
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

function EnfermeraLayout({ children }) {
  console.log("Renderizando EnfermeraLayout...");

  // Definir enlaces del sidebar para enfermeras
  const nurseLinks = [
    { label: "Dashboard", to: "/enfermera/dashboard", icon: <DashboardOutlined /> },
    { label: "Pacientes", to: "/enfermera/pacientes", icon: <UserOutlined /> },
    { label: "Historias Clínicas", to: "/enfermera/historias", icon: <FileTextOutlined /> },
    { label: "Formulario", to: "/enfermera/historias/formulariosEnfermera", icon: <FileTextOutlined /> },
  ];

  // Manejo de logout
  const handleLogout = () => {
    console.log("Cerrando sesión de la enfermera...");
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar links={nurseLinks} onLogout={handleLogout} />
      <Layout>
        {/* Header personalizado */}
        <CustomHeader username="Enfermera" profilePic="https://via.placeholder.com/40" />

        {/* Contenido principal */}
        <Content style={{ margin: "16px", padding: "16px", background: "#fff" }}>
          {children ? children : <h2 style={{ color: "red" }}>Error al cargar contenido</h2>}
        </Content>
      </Layout>
    </Layout>
  );
}

export default EnfermeraLayout;
