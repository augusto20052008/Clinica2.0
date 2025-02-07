import React from 'react';
import { Layout, Avatar, Badge, Typography, Dropdown, Menu } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

function CustomHeader({ username, profilePic }) {
  const menu = (
    <Menu>
      <Menu.Item key="1">Ver perfil</Menu.Item>
      <Menu.Item key="2">Cerrar sesión</Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F6FFED',
        color: '#000',
        padding: '0 20px',
      }}
    >
      <Title level={3} style={{ margin: 0, color: '#000' }}>
        Bienvenido, <span style={{ fontWeight: 'bold' }}>{username}</span>
      </Title>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Notification Icon */}
        <Badge count={5} offset={[0, 5]} style={{ backgroundColor: '#f5222d' }}>
          <BellOutlined style={{ fontSize: '20px', color: '#000' }} />
        </Badge>

        {/* Profile Avatar with Dropdown */}
        <Dropdown overlay={menu} placement="bottomRight">
          <Avatar
            src={profilePic || null}
            icon={!profilePic ? <UserOutlined /> : null}
            size="large"
            style={{ cursor: 'pointer', backgroundColor: '#87d068' }}
          />
        </Dropdown>
      </div>
    </Header>
  );
}

export default CustomHeader;
