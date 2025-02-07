// ListaFormularios.js
import React, { useEffect, useState } from "react";
import { Table, Button, Space, Spin, notification, Popconfirm } from "antd";
import { PlusOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { fetchFormularios, deleteFormulario } from "../../../../utils/api";
import VerFormularioModal from "./VerFormularioModal";
import dayjs from "dayjs";


const ListaFormularios = ({ onAgregar }) => {
    const [formularios, setFormularios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [isVerModalVisible, setIsVerModalVisible] = useState(false);
    const [formularioAVisualizar, setFormularioAVisualizar] = useState(null);

    const loadFormularios = async () => {
        setLoading(true);
        try {
            const data = await fetchFormularios();
            setFormularios(Array.isArray(data) ? data : []);
        } catch (error) {
            notification.error({
                message: "Error",
                description: "No se pudo cargar la lista de formularios.",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFormularios();
    }, []);

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await deleteFormulario(id);
            notification.success({
                message: "Éxito",
                description: "El formulario se eliminó correctamente.",
            });
            loadFormularios();
        } catch (error) {
            notification.error({
                message: "Error",
                description: "No se pudo eliminar el formulario.",
            });
        } finally {
            setDeletingId(null);
        }
    };

    const handleVer = (formulario) => {
        setFormularioAVisualizar(formulario);
        setIsVerModalVisible(true);
    };

    const handleCerrarVerModal = () => {
        setIsVerModalVisible(false);
        setFormularioAVisualizar(null);
    };

    const columns = [
        { title: "Tipo de Formulario", dataIndex: "nombre_tipo_formulario", key: "nombre_tipo_formulario" },
        { title: "Paciente", dataIndex: "cedula_paciente", key: "cedula_paciente" },
        { title: "Usuario Creador", dataIndex: "nombre_creador", key: "nombre_creador" },
        {
            title: "Fecha de Creación",
            dataIndex: "fecha_creacion",
            key: "fecha_creacion",
            render: (fecha) => dayjs(fecha).format("YYYY-MM-DD HH:mm:ss"),
        },
        { title: "Estado", dataIndex: "estado", key: "estado" },
        {
            title: "Acciones",
            key: "acciones",
            render: (_, record) => (
                <Space>
                    <Button icon={<EyeOutlined />} onClick={() => handleVer(record)}>
                        Ver
                    </Button>
                    <Popconfirm
                        title="¿Estás seguro de eliminar este formulario?"
                        okText="Sí"
                        cancelText="No"
                        onConfirm={() => handleDelete(record.id_formulario)}
                    >
                        <Button icon={<DeleteOutlined />} danger loading={deletingId === record.id_formulario}>
                            Eliminar
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={onAgregar} style={{ marginBottom: "20px" }}>
                Agregar
            </Button>

            {loading ? (
                <Spin tip="Cargando formularios..." style={{ display: "block", margin: "20px auto" }} />
            ) : (
                <Table columns={columns} dataSource={formularios} rowKey="id_formulario" pagination={{ pageSize: 10 }} />
            )}

            {/* Modal para ver formulario */}
            <VerFormularioModal 
                visible={isVerModalVisible}
                onClose={handleCerrarVerModal}
                formulario={formularioAVisualizar}
            />
        </div>
    );
};

export default ListaFormularios;
