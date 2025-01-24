import React from "react";
import { Layout, Menu, Avatar } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  ToolOutlined,
  BookOutlined,
  FormOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible>
        <div className="logo" style={{ padding: "16px", textAlign: "center", color: "white" }}>
          <h1 style={{ color: "white", fontSize: "18px" }}>Clínica San José</h1>
        </div>
        <Menu theme="dark" mode="inline">
          {adminLinks.map((link) =>
            link.subMenu ? (
              <SubMenu
                key={link.label}
                icon={link.icon}
                title={link.label}
              >
                {link.subMenu.map((subLink) => (
                  <Menu.Item key={subLink.to}>
                    <a href={subLink.to}>{subLink.label}</a>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={link.to} icon={link.icon}>
                <a href={link.to}>{link.label}</a>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout>
        {/* Header */}
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>Bienvenido, Administrador</div>
          <Avatar src="https://via.placeholder.com/40" />
        </Header>

        {/* Main Content */}
        <Content style={{ margin: "16px", padding: "16px", background: "#fff" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
