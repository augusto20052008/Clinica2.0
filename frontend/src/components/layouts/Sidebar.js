import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { LogoutOutlined, HeartOutlined } from "@ant-design/icons";
import { logout } from "../../utils/authUtils";

const { Sider } = Layout;
const { SubMenu } = Menu;

function Sidebar({ links = [] }) {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();

  /** Alterna el colapso del menú */
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    if (collapsed) setOpenKeys([]);
  };

  /** Controla la apertura de submenús */
  const handleOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  /** Maneja la navegación dentro del sidebar */
  const handleMenuClick = (path) => {
    navigate(path);
    if (collapsed) setOpenKeys([]);
  };

  /** Maneja el cierre de sesión */
  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse} style={{ backgroundColor: "#F6FFED" }}>
      {/* Header del Sidebar */}
      <div style={{ padding: "16px", textAlign: "center" }}>
        {collapsed ? (
          <HeartOutlined style={{ fontSize: "24px", color: "#333" }} />
        ) : (
          <h1 style={{ color: "#333", fontSize: "24px" }}>
            Clínica <span>San José</span>
          </h1>
        )}
        {!collapsed && <p style={{ color: "#333", marginTop: "-10px" }}>Todo Corazón</p>}
      </div>

      {/* Menú de navegación */}
      <Menu
        mode="inline"
        openKeys={!collapsed ? openKeys : []}
        onOpenChange={handleOpenChange}
        style={{ backgroundColor: "#F6FFED", borderRight: "none" }}
      >
        {links.map((link) =>
          link.subMenu ? (
            <SubMenu
              key={link.to}
              title={
                <div
                  onClick={() => handleMenuClick(link.to)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <span className="icon" style={{ marginRight: collapsed ? "0" : "8px" }}>
                    {link.icon}
                  </span>
                  {!collapsed && link.label}
                </div>
              }
            >
              {link.subMenu.map((subLink) => (
                <Menu.Item key={subLink.to}>
                  <NavLink to={subLink.to} className={({ isActive }) => (isActive ? "active" : "")}>
                    {subLink.label}
                  </NavLink>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={link.to}>
              <NavLink to={link.to} className={({ isActive }) => (isActive ? "active" : "")}>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <span className="icon" style={{ marginRight: collapsed ? "0" : "8px" }}>
                    {link.icon}
                  </span>
                  {!collapsed && link.label}
                </span>
              </NavLink>
            </Menu.Item>
          )
        )}
      </Menu>

      {/* Botón de Toggle Collapse */}
      <div
        className="ant-layout-sider-trigger"
        style={{
          textAlign: "center",
          backgroundColor: "#001F3F",
          color: "#fff",
          height: "48px",
          lineHeight: "48px",
          cursor: "pointer",
        }}
        onClick={toggleCollapse}
      >
        {collapsed ? ">" : "<"}
      </div>

      {/* Botón de Cerrar Sesión */}
      <div style={{ textAlign: "center", padding: "16px" }}>
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined style={{ fontSize: "18px" }} />}
          onClick={handleLogout}
          style={{
            width: collapsed ? "48px" : "90%",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          {!collapsed && "Cerrar Sesión"}
        </Button>
      </div>
    </Sider>
  );
}

export default Sidebar;
