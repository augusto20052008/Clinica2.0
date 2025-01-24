import React, { useEffect, useState } from "react";
import { Table, Spin, Empty, Typography, notification, Space } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import { fetchFormularioById } from "../../../utils/api";

const { Title } = Typography;

const FormulariosTable = ({ idHistoriaClinica }) => {
    const [formularios, setFormularios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadFormularios = async () => {
            try {
                setLoading(true);
                const data = await fetchFormularioById(idHistoriaClinica);
                setFormularios(data);
            } catch (err) {
                setError(`Error al cargar los formularios. ${err}`);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (idHistoriaClinica) {
            loadFormularios();
        }
    }, [idHistoriaClinica]);

    const columns = [
        {
            title: "ID Formulario",
            dataIndex: "idFormulario",
            key: "idFormulario",
        },
        {
            title: "Nro Historia Clínica",
            dataIndex: "nroHistoriaClinica",
            key: "nroHistoriaClinica",
        },
        {
            title: "Fecha Creación",
            dataIndex: "fechaCreacionF",
            key: "fechaCreacionF",
        },
        {
            title: "Última Modificación",
            dataIndex: "fechaUltimaModificacionF",
            key: "fechaUltimaModificacionF",
        },
        {
            title: "Estado",
            dataIndex: "estadoFormulario",
            key: "estadoFormulario",
        },
    ];

    if (!idHistoriaClinica) {
        return (
            <Empty
                description="No se proporcionó el ID de Historia Clínica"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
        );
    }

    if (loading) {
        return (
            <Spin tip="Cargando formularios..." style={{ display: "flex", justifyContent: "center", padding: "20px" }} />
        );
    }

    if (error) {
        notification.error({
            message: "Error al cargar los formularios",
            description: error,
        });
        return <p>{error}</p>;
    }

    if (!formularios || formularios.length === 0) {
        return (
            <Empty
                description="No se encontraron formularios para esta historia clínica"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
        );
    }

    return (
        <div style={{ padding: "20px" }}>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Title level={3} style={{ marginBottom: "20px" }}>
                    <FileSearchOutlined style={{ marginRight: "10px" }} />
                    Formularios Asociados
                </Title>

                <Table
                    columns={columns}
                    dataSource={formularios}
                    rowKey="idFormulario"
                    pagination={{ pageSize: 4 }}
                    bordered
                    scroll={{ x: true }}
                />
            </Space>
        </div>
    );
};

export default FormulariosTable;
