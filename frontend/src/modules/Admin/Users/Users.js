import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, notification, Popconfirm, Space, Select } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";
import UserProfileModal from "./UserProfileModal";
import { fetchUsers, fetchUserDetails, removeUser, createUser, updateUser } from "../../../utils/api";

const { Search } = Input;
const { Option } = Select;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesSearch =
        user.identificacion.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.nombres.toLowerCase().includes(searchValue.toLowerCase());
      const matchesRole = !roleFilter || user.rol === roleFilter;
      return matchesSearch && matchesRole;
    });
    setFilteredUsers(filtered);
  }, [searchValue, roleFilter, users]);

  const loadUsers = async () => {
    try {
      const response = await fetchUsers();
      if (response && response.data && Array.isArray(response.data)) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      }
    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
    }
  };

  const handleDeleteUser = async (identificacion) => {
    try {
      await removeUser(identificacion);
      notification.success({
        message: "Éxito",
        description: "Usuario eliminado correctamente.",
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.identificacion !== identificacion));
      setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.identificacion !== identificacion));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      notification.error({
        message: "Error",
        description: "No se pudo eliminar el usuario.",
      });
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      const addedUser = await createUser(newUser);
      setUsers((prevUsers) => [addedUser, ...prevUsers]);
      setFilteredUsers((prevUsers) => [addedUser, ...prevUsers]);
      setIsAddModalOpen(false);
      notification.success({
        message: "Éxito",
        description: "Usuario agregado correctamente.",
      });
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      notification.error({
        message: "Error",
        description: "No se pudo agregar el usuario.",
      });
    }
  };

  const handleEditUser = async (identificacion) => {
    try {
      const userDetails = await fetchUserDetails(identificacion);
      setCurrentEditUser(userDetails);
      setIsEditModalOpen(true);
    } catch (error) {
      console.error("Error al obtener detalles del usuario para editar:", error);
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await updateUser(updatedUser.identificacion, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.identificacion === updatedUser.identificacion ? updatedUser : user
        )
      );
      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.identificacion === updatedUser.identificacion ? updatedUser : user
        )
      );
      setIsEditModalOpen(false);
      notification.success({
        message: "Éxito",
        description: "Usuario actualizado correctamente.",
      });
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      notification.error({
        message: "Error",
        description: "No se pudo actualizar el usuario.",
      });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { title: "Identificación", dataIndex: "identificacion", key: "identificacion" },
    { title: "Nombres", dataIndex: "nombres", key: "nombres" },
    { title: "Apellidos", dataIndex: "apellidos", key: "apellidos" },
    { title: "Correo", dataIndex: "correo", key: "correo" },
    { title: "Rol", dataIndex: "rol", key: "rol" },
    { title: "Estado", dataIndex: "estado", key: "estado" },
    {
      title: "Acciones",
      key: "acciones",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => setExpandedUser(record)}
            style={{ color: "#1890ff" }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record.identificacion)}
            style={{ color: "#ffc107" }}
          />
          <Popconfirm
            title="¿Estás seguro de eliminar este usuario?"
            onConfirm={() => handleDeleteUser(record.identificacion)}
            okText="Sí"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              style={{ color: "#dc3545" }}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h2>Gestión de Usuarios</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <Search
            placeholder="Buscar por nombre o cédula"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 300 }}
          />
          <Select
            placeholder="Filtrar por rol"
            style={{ width: 200 }}
            value={roleFilter}
            onChange={(value) => setRoleFilter(value)}
            allowClear
          >
            <Option value="Doctor">Doctor</Option>
            <Option value="Administrador">Administrador</Option>
            <Option value="Enfermera">Enfermera</Option>
          </Select>
          <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
            Agregar Usuario
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={paginatedUsers}
        rowKey="identificacion"
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: filteredUsers.length,
          onChange: handlePageChange,
        }}
      />

      {isAddModalOpen && (
        <Modal
          title="Agregar Usuario"
          visible={isAddModalOpen}
          onCancel={() => setIsAddModalOpen(false)}
          footer={null}
        >
          <AddUserForm onClose={() => setIsAddModalOpen(false)} onAdd={handleAddUser} />
        </Modal>
      )}

      {isEditModalOpen && currentEditUser && (
        <Modal
          title="Editar Usuario"
          visible={isEditModalOpen}
          onCancel={() => setIsEditModalOpen(false)}
          footer={null}
        >
          <EditUserForm
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={handleUpdateUser}
            initialData={currentEditUser}
          />
        </Modal>
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
