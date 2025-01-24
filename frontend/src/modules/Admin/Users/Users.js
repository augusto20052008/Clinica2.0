import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Select,
  Space,
  Modal,
  Typography,
  Popconfirm,
  message,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import UserProfileModal from './UserProfileModal';
import { fetchUsers, fetchUserDetails, removeUser, createUser, updateUser } from '../../../utils/api';

const { Title } = Typography;
const { Option } = Select;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');
  const [selectedRol, setSelectedRol] = useState('');
  const [expandedUser, setExpandedUser] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUsers();
        if (response && response.data && Array.isArray(response.data)) {
          setUsers(response.data);
          setFilteredUsers(response.data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        setUsers([]);
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.nombres.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!selectedEstado || user.estado === selectedEstado) &&
        (!selectedRol || user.rol === selectedRol)
    );
    setFilteredUsers(filtered);
  }, [searchQuery, selectedEstado, selectedRol, users]);

  const handleDeleteUser = async (identificacion) => {
    try {
      await removeUser(identificacion);
      setUsers((prevUsers) => prevUsers.filter((user) => user.identificacion !== identificacion));
      setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.identificacion !== identificacion));
      message.success('Usuario eliminado correctamente.');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      message.error('No se pudo eliminar el usuario. Por favor, inténtalo de nuevo.');
    }
  };

  const columns = [
    {
      title: 'Identificación',
      dataIndex: 'identificacion',
      key: 'identificacion',
    },
    {
      title: 'Nombres',
      dataIndex: 'nombres',
      key: 'nombres',
    },
    {
      title: 'Apellidos',
      dataIndex: 'apellidos',
      key: 'apellidos',
    },
    {
      title: 'Correo',
      dataIndex: 'correo',
      key: 'correo',
    },
    {
      title: 'Rol',
      dataIndex: 'rol',
      key: 'rol',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => setExpandedUser(record)}
            style={{ color: '#1890ff', border: 'none', background: 'transparent' }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentEditUser(record);
              setIsEditUserModalOpen(true);
            }}
            style={{ color: '#ffc107', border: 'none', background: 'transparent' }}
          />
          <Popconfirm
            title="¿Estás seguro de eliminar este usuario?"
            onConfirm={() => handleDeleteUser(record.identificacion)}
            okText="Sí"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              style={{ color: '#ff4d4f', border: 'none', background: 'transparent' }}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space
        style={{
          marginBottom: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Gestión de Usuarios
        </Title>
        <Input
          placeholder="Buscar por nombre"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: 300 }}
          prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
        />
        <Select
          placeholder="Filtrar por estado"
          value={selectedEstado}
          onChange={(value) => setSelectedEstado(value)}
          style={{ width: 200 }}
          allowClear
        >
          <Option value="Act">Activo</Option>
          <Option value="Ina">Inactivo</Option>
        </Select>
        <Select
          placeholder="Filtrar por rol"
          value={selectedRol}
          onChange={(value) => setSelectedRol(value)}
          style={{ width: 200 }}
          allowClear
        >
          <Option value="Doctor">Doctor</Option>
          <Option value="Admin">Administrador</Option>
          <Option value="Enfermera">Enfermera</Option>
        </Select>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsAddUserModalOpen(true)}
        >
          Agregar Usuario
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="identificacion"
        pagination={{
          pageSize: 6,
          showSizeChanger: false,
        }}
      />

      {isAddUserModalOpen && (
        <AddUserForm
          onClose={() => setIsAddUserModalOpen(false)}
          onAdd={(user) => {
            setUsers((prev) => [user, ...prev]);
            setFilteredUsers((prev) => [user, ...prev]);
          }}
        />
      )}

      {isEditUserModalOpen && currentEditUser && (
        <EditUserForm
          onClose={() => setIsEditUserModalOpen(false)}
          onUpdate={(user) => {
            setUsers((prev) =>
              prev.map((u) => (u.identificacion === user.identificacion ? user : u))
            );
            setFilteredUsers((prev) =>
              prev.map((u) => (u.identificacion === user.identificacion ? user : u))
            );
          }}
          initialData={currentEditUser}
        />
      )}

      {expandedUser && (
        <UserProfileModal
          userId={expandedUser.identificacion}
          onClose={() => setExpandedUser(null)}
        />
      )}
    </div>
  );
};

export default Users;