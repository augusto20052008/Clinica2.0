import React, { useState, useEffect } from "react";
import { Table, Button, Input, Space, Popconfirm, notification, Typography } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { fetchFirmaElectronica, fetchUsersWithInfo, deleteFirmaElectronica } from "../../../../../utils/api";
import AddFirmaForm from "./AddFirmaForm";
import EditFirmaForm from "./EditFirmaForm";
import FirmaProfileModal from "./FirmaProfileModal";

const { Search } = Input;

const { Title } = Typography;

const FirmaElectronica = () => {
    const [firmas, setFirmas] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [selectedFirma, setSelectedFirma] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    useEffect(() => {
        loadFirmas();
        loadUsers();
    }, []);

    const loadFirmas = async () => {
        try {
            const data = await fetchFirmaElectronica();
            setFirmas(data || []);
        } catch (error) {
            notification.error({
                message: "Error",
                description: "No se pudo cargar la lista de firmas electrónicas.",
            });
        }
    };

    const loadUsers = async () => {
        try {
            const data = await fetchUsersWithInfo();
            const filteredUsers = data.filter(user => user.cedula && user.cedula.trim() !== "");
            setUsers(filteredUsers);
        } catch (error) {
            notification.error({
                message: "Error",
                description: "No se pudo cargar la lista de usuarios.",
            });
        }
    };

    const handleDelete = async (idFirma) => {
        try {
            await deleteFirmaElectronica(idFirma);
            notification.success({ message: "Firma eliminada correctamente." });
            loadFirmas();
        } catch (error) {
            notification.error({ message: "Error al eliminar la firma." });
        }
    };

    const handleEditClick = (firma) => {
        setSelectedFirma(firma);
        setIsEditModalOpen(true);
    };

    const handleViewClick = (firma) => {
        setSelectedFirma(firma);
        setIsProfileModalOpen(true);
    };

    const filteredFirmas = firmas.filter((firma) => {
        const usuario = users.find(user => user.id_usuario === firma.id_usuario);
        return usuario?.cedula?.includes(searchValue);
    });

    const handlePageChange = (page) => setCurrentPage(page);

    const columns = [
        {
            title: "Usuario",
            dataIndex: "id_usuario",
            key: "id_usuario",
            render: (id_usuario) => {
                const usuario = users.find(user => user.id_usuario === id_usuario);
                return usuario ? `${usuario.nombres} ${usuario.apellidos} (${usuario.cedula})` : "Desconocido";
            },
        },
        {
            title: "Fecha de Creación",
            dataIndex: "fecha_creacion",
            key: "fecha_creacion",
            render: (text) => (text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "N/A"),
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (_, firma) => (
                <Space size="middle">
                    <Button icon={<EyeOutlined />} onClick={() => handleViewClick(firma)} />
                    <Button icon={<EditOutlined />} onClick={() => handleEditClick(firma)} />
                    <Popconfirm
                        title="¿Eliminar esta firma?"
                        onConfirm={() => handleDelete(firma.id_firma_electronica)}
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Title level={2} style={{ marginBottom: 24 }}>Lista de Firmas Electrónicas</Title>
            <Space style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", width: "100%" }}>
                <Search
                    placeholder="Buscar por cédula"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    style={{ width: 300 }}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalOpen(true)}>
                    Agregar Firma
                </Button>
            </Space>

            <Table
                columns={columns}
                dataSource={filteredFirmas.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                )}
                rowKey="id_firma_electronica"
                pagination={{
                    current: currentPage,
                    pageSize: itemsPerPage,
                    total: filteredFirmas.length,
                    onChange: handlePageChange,
                }}
            />

            <AddFirmaForm visible={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onFirmaAdded={loadFirmas} />
            <EditFirmaForm visible={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} firma={selectedFirma} onFirmaUpdated={loadFirmas} />
            <FirmaProfileModal visible={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} firma={selectedFirma} />
        </div>
    );
};

export default FirmaElectronica;
