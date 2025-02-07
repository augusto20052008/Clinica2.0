import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space, Spin, notification } from "antd";
import { PlusOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { fetchTiposFormulario, deleteTipoFormulario } from "../../../../../utils/api";
import TipoFormularioModal from "./TipoFormularioModal";
import TipoFormularioDetailsModal from "./TipoFormularioDetailsModal";
import dayjs from "dayjs";

const TipoFormularioList = () => {
    const [tipoFormularios, setTipoFormularios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [deletingId, setDeletingId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [editingTipoFormularioId] = useState(null);
    const [viewingTipoFormulario, setViewingTipoFormulario] = useState(null);
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);

    useEffect(() => {
        loadTipoFormularios();
    }, []);

    const loadTipoFormularios = async () => {
        setLoading(true);
        try {
            const data = await fetchTiposFormulario();
            setTipoFormularios(Array.isArray(data) ? data : []);
        } catch (error) {
            notification.error({ message: "Error", description: "No se pudo cargar la lista de formularios." });
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (record) => {
        setViewingTipoFormulario(record);
        setIsViewModalVisible(true);
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await deleteTipoFormulario(id);
            notification.success({ message: "Éxito", description: "El formulario se eliminó correctamente." });
            loadTipoFormularios();
        } catch (error) {
            notification.error({ message: "Error", description: "No se pudo eliminar el formulario." });
        } finally {
            setDeletingId(null);
        }
    };

    const columns = [
        { title: "Nombre", dataIndex: "nombre", key: "nombre" },
        { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
        { 
            title: "Fecha de Creación", 
            dataIndex: "fecha_creacion", 
            key: "fecha_creacion", 
            render: (text) => dayjs(text).format("YYYY-MM-DD") 
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<EyeOutlined />}
                        onClick={() => handleViewDetails(record)}
                    />
                    <Button 
                        icon={<DeleteOutlined />} 
                        danger 
                        loading={deletingId === record.id_formulario_tipo} 
                        onClick={() => handleDelete(record.id_formulario_tipo)} 
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1>Plantilla de Formularios</h1>
            <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
                <Input 
                    placeholder="Buscar por nombre" 
                    value={searchText} 
                    onChange={(e) => setSearchText(e.target.value)} 
                    style={{ width: 300, marginRight: 16 }} 
                />
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />} 
                    onClick={() => { 
                        setModalType("add"); 
                        setIsModalVisible(true); 
                    }}
                >
                    Agregar Plantilla
                </Button>
            </div>

            {loading ? (
                <Spin tip="Cargando formularios..." style={{ display: "block", margin: "20px auto" }} />
            ) : (
                <Table 
                    columns={columns} 
                    dataSource={tipoFormularios.filter((formulario) => formulario.nombre.toLowerCase().includes(searchText.toLowerCase()))} 
                    rowKey="id_formulario_tipo" 
                    pagination={{ pageSize: 10 }} 
                />
            )}

            <TipoFormularioModal 
                isVisible={isModalVisible} 
                onClose={() => setIsModalVisible(false)} 
                modalType={modalType} 
                editingTipoFormularioId={editingTipoFormularioId} 
                reloadFormularios={loadTipoFormularios} 
            />

            {/* Nuevo Modal para ver detalles */}
            <TipoFormularioDetailsModal
                visible={isViewModalVisible}
                onClose={() => setIsViewModalVisible(false)}
                formulario={viewingTipoFormulario}
            />
        </div>
    );
};

export default TipoFormularioList;
