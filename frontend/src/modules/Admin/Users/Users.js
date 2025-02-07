import React, { useState, useEffect } from "react";
import { Table, Button, Input, Space, Select, Popconfirm, notification, Typography } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { fetchUsers, fetchUserDetails, downUser } from "../../../utils/api";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import ViewUserModal from "./ViewUserModal";

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [statusFilter, setStatusFilter] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const users = await fetchUsers();
            setUsers(users);
        } catch (error) {
            notification.error({
                message: "Error",
                description: error.mensaje || "No se pudo obtener la lista de usuarios.",
            });
        }
    };

    const filteredUsers = users.filter((user) => {
        return (
            user.usuario?.toLowerCase().includes(searchValue.toLowerCase()) &&
            (statusFilter === null || user.estado === statusFilter)
        );
    });

    const handleDelete = async (id) => {
        try {
            await downUser(id);

            notification.success({
                message: "Éxito",
                description: "Usuario dado de baja correctamente.",
            });

            loadUsers();

        } catch (error) {
            notification.error({
                message: "Error",
                description: "No se pudo dar de baja al usuario.",
            });
        }
    };

    const handleEditClick = async (user) => {
        try {
            const fullUserData = await fetchUserDetails(user.id_usuario);
            setEditingUser(fullUserData || user);
        } catch (error) {
            notification.warning({
                message: "Error",
                description: "No se pudo obtener los datos del usuario",
            });
        }
        setIsEditModalOpen(true);
    };

    const handleViewClick = async (user) => {
        try {
            const fullUserData = await fetchUserDetails(user.id_usuario);
            setSelectedUser(fullUserData);
        } catch (error) {
            notification.warning({
                message: "Error",
                description: "No se pudo obtener los datos del usuario",
            });
        }
        setIsProfileModalOpen(true);
    };

    const handleUserAdded = () => {
        loadUsers();
        setIsAddModalOpen(false);
    };

    const handleUserUpdated = () => {
        loadUsers();
        setIsEditModalOpen(false);
    };

    const closeProfileModal = () => {
        setIsProfileModalOpen(false);
        setSelectedUser(null);
    };

    const handlePageChange = (page) => setCurrentPage(page);

    const columns = [
        {
            title: "Usuario",
            dataIndex: "usuario",
            key: "usuario",
            render: (text) => text || "N/A",
        },
        {
            title: "Correo",
            dataIndex: "correo",
            key: "correo",
            render: (text) => text || "N/A",
        },
        {
            title: "Fecha Registro",
            dataIndex: "fecha_registro",
            key: "fecha_registro",
            render: (text) => (text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "N/A"),
        },
        {
            title: "Último Login",
            dataIndex: "ultimo_login",
            key: "ultimo_login",
            render: (text) => (text !== null ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "Sin dato"),
        },
        {
            title: "Estado",
            dataIndex: "estado",
            key: "estado",
            render: (text) => (text === "activo" ? "🟢 Activo" : "🔴 Inactivo"),
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EyeOutlined />} onClick={() => handleViewClick(record)} />
                    <Button icon={<EditOutlined />} onClick={() => handleEditClick(record)} />
                    <Popconfirm
                        title="¿Estás seguro de dar de baja al usuario?"
                        onConfirm={() => handleDelete(record.id_usuario)}
                        okText="Sí"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Title level={2} style={{ marginBottom: 24 }}>
                Lista de Usuarios
            </Title>
            <Space style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", width: "100%" }}>
                <Search
                    placeholder="Buscar por usuario"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    style={{ width: 300 }}
                />
                <Select
                    placeholder="Filtrar por estado"
                    value={statusFilter}
                    onChange={(value) => setStatusFilter(value)}
                    allowClear
                    style={{ width: 200 }}
                >
                    <Option value="activo">Activo</Option>
                    <Option value="inactivo">Inactivo</Option>
                </Select>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalOpen(true)}>
                    Agregar Usuario
                </Button>
            </Space>

            <Table
                columns={columns}
                dataSource={filteredUsers.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                )}
                rowKey="id_usuario"
                pagination={{
                    current: currentPage,
                    pageSize: itemsPerPage,
                    total: filteredUsers.length,
                    onChange: handlePageChange,
                }}
            />

            <AddUserModal
                visible={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onUserAdded={handleUserAdded}
            />
            <EditUserModal
                visible={isEditModalOpen}
                userData={editingUser}
                onClose={() => setIsEditModalOpen(false)}
                onUserUpdated={handleUserUpdated}
            />
            <ViewUserModal
                visible={isProfileModalOpen}
                onClose={closeProfileModal}
                userData={selectedUser}
            />
        </div>
    );
};

export default Users;
