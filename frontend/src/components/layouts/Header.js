import React from 'react';
import { Layout, Avatar, Badge, Typography } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

function CustomHeader({ username, profilePic }) {
  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#001529', color: '#fff', padding: '0 20px' }}>
      <Title level={3} style={{ margin: 0, color: '#fff' }}>
        Bienvenido, <span style={{ fontWeight: 'bold' }}>{username}</span>
      </Title>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Notification Icon */}
        <Badge count={5} offset={[0, 5]} style={{ backgroundColor: '#f5222d' }}>
          <BellOutlined style={{ fontSize: '20px', color: '#fff' }} />
        </Badge>

        {/* Profile Avatar */}
        <Avatar
          src={profilePic || null}
          icon={!profilePic ? <UserOutlined /> : null}
          size="large"
          style={{ border: '2px solid #fff' }}
        />
      </div>
    </Header>
  );
}

export default CustomHeader;
