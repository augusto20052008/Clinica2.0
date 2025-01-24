import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { AiOutlineLogout } from "react-icons/ai";
import "../../styles/layouts/sidebar.css";

const { Sider } = Layout;
const { SubMenu } = Menu;

function Sidebar({ links = [], onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse} theme="dark">
      <div style={{ padding: "16px", textAlign: "center" }}>
        <h1 style={{ color: "white", fontSize: collapsed ? "16px" : "24px" }}>
          Clínica <span>San José</span>
        </h1>
        {!collapsed && <p style={{ color: "white", marginTop: "-10px" }}>Todo Corazón</p>}
      </div>

      <Menu theme="dark" mode="inline">
        {links.map((link) =>
          link.subMenu ? (
            <SubMenu
              key={link.to}
              title={
                <span style={{ display: "flex", alignItems: "center" }}>
                  <span className="icon" style={{ marginRight: "8px" }}>{link.icon}</span>
                  {link.label}
                </span>
              }
            >
              <Menu.Item key={`${link.to}-main`}>
                <NavLink to={link.to} activeClassName="active">
                  {link.label}
                </NavLink>
              </Menu.Item>
              {link.subMenu.map((subLink) => (
                <Menu.Item key={subLink.to}>
                  <NavLink to={subLink.to} activeClassName="active">
                    {subLink.label}
                  </NavLink>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={link.to}>
              <NavLink to={link.to} activeClassName="active">
                <span className="icon" style={{ marginRight: collapsed ? "0" : "8px" }}>{link.icon}</span>
                {link.label}
              </NavLink>
            </Menu.Item>
          )
        )}
      </Menu>

      <div style={{ textAlign: "center", padding: "16px" }}>
        <Button
          type="primary"
          danger
          icon={<AiOutlineLogout style={{ fontSize: "18px" }} />}
          onClick={onLogout}
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
