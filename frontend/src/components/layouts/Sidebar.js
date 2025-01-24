import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { AiOutlineLogout } from "react-icons/ai";

const { Sider } = Layout;
const { SubMenu } = Menu;

function Sidebar({ links = [], onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse}>
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
              key={link.label}
              title={
                <NavLink to={link.to} style={{ display: "flex", alignItems: "center" }}>
                  <span className="icon" style={{ marginRight: "8px" }}>{link.icon}</span>
                  {link.label}
                </NavLink>
              }
            >
              {link.subMenu.map((subLink) => (
                <Menu.Item key={subLink.to}>
                  <NavLink to={subLink.to}>{subLink.label}</NavLink>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={link.to}>
              <NavLink to={link.to}>
                <span className="icon">{link.icon}</span>
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
          icon={<AiOutlineLogout />}
          onClick={onLogout}
          block={!collapsed}
        >
          {!collapsed && "Cerrar Sesión"}
        </Button>
      </div>
    </Sider>
  );
}

export default Sidebar;
