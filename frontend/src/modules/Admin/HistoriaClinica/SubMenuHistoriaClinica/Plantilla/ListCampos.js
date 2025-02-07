import React, { useEffect, useState, useCallback } from "react";
import { Table, Button, Space, Empty } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { fetchCamposByFormularioYSeccion } from "../../../../../utils/api";
import DeleteCampo from "./DeleteCampo";

const ListCampos = ({ idFormulario, idSeccion, refresh }) => {
    const [campos, setCampos] = useState([]);
    const [loading, setLoading] = useState(false);

    // Cargar los campos según el idFormulario y idSeccion
    const loadCampos = useCallback(async () => {
        if (!idFormulario || !idSeccion) {
            setCampos([]); // Limpiar si no hay formulario o sección seleccionada
            return;
        }

        setLoading(true);
        try {
            const data = await fetchCamposByFormularioYSeccion(idFormulario, idSeccion);

            let camposArray = [];
            if (Array.isArray(data)) {
                camposArray = data;
            } else if (data && typeof data === "object") {
                camposArray = [data]; // Si la API devuelve un solo objeto, convertirlo en array
            } else {
                console.warn("Formato inesperado en la API de campos:", data);
                camposArray = [];
            }

            setCampos(camposArray);
        } catch (error) {
            console.error("Error al cargar los campos:", error);
            setCampos([]);
        } finally {
            setLoading(false);
        }
    }, [idFormulario, idSeccion]);

    // Recargar los campos cuando cambian el formulario o la sección
    useEffect(() => {
        loadCampos();
    }, [loadCampos, idFormulario, idSeccion, refresh]);

    const handleCampoDeleted = (id) => {
        setCampos((prevCampos) => prevCampos.filter((campo) => campo.id_campo !== id));
    };

    return (
        <div>
            {campos.length === 0 && !loading ? (
                <Empty description="No hay campos registrados." style={{ margin: "20px 0", textAlign: "center" }} />
            ) : (
                <Table
                    columns={[
                        { title: "Nombre", dataIndex: "nombre_campo", key: "nombre_campo" },
                        { title: "Tipo de Dato", dataIndex: "tipo_dato", key: "tipo_dato" },
                        { title: "Requerido", dataIndex: "requerido", key: "requerido", render: (text) => (text ? "Sí" : "No") },
                        { title: "Opciones", dataIndex: "opciones", key: "opciones", render: (text) => text || "N/A" },
                        {
                            title: "Acción",
                            key: "accion",
                            render: (_, record) => (
                                <Space size="middle">
                                    <Button icon={<EditOutlined />} />
                                    <DeleteCampo idCampo={record.id_campo} onCampoDeleted={handleCampoDeleted} />
                                </Space>
                            ),
                        },
                    ]}
                    dataSource={campos}
                    rowKey="id_campo"
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                />
            )}
        </div>
    );
};

export default ListCampos;
