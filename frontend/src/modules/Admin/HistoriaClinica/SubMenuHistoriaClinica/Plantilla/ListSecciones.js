import React, { useEffect, useState, useCallback } from "react";
import { Table, Button, Space, Empty } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { fetchSeccionByTipoFormulario } from "../../../../../utils/api";
import DeleteSeccion from "./DeleteSeccion";

const ListSecciones = ({ idFormulario, refresh, onSeccionSelected }) => {
    const [secciones, setSecciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRowKey, setSelectedRowKey] = useState(null);

    // Cargar solo las secciones asociadas al ID del formulario
    const loadSecciones = useCallback(async () => {
        if (!idFormulario) {
            setSecciones([]); // Limpiar si no hay un formulario seleccionado
            return;
        }

        setLoading(true);
        try {
            const data = await fetchSeccionByTipoFormulario(idFormulario);
            setSecciones(data);
        } catch (error) {
            console.error("Error al cargar secciones:", error);
            setSecciones([]);
        } finally {
            setLoading(false);
        }
    }, [idFormulario]);

    // Efecto que recarga las secciones cuando cambia el formulario
    useEffect(() => {
        loadSecciones();
    }, [loadSecciones, idFormulario, refresh]);

    const handleSeccionDeleted = (id) => {
        setSecciones((prevSecciones) => prevSecciones.filter((seccion) => seccion.id_seccion !== id));
    };

    const rowSelection = {
        type: "radio",
        selectedRowKeys: [selectedRowKey],
        onChange: (selectedKeys, selectedRows) => {
            const selectedId = selectedRows[0]?.id_seccion || null;
            setSelectedRowKey(selectedId);
            onSeccionSelected(selectedId);
        },
    };

    return (
        <div>
            {secciones.length === 0 && !loading ? (
                <Empty description="No hay secciones registradas." style={{ margin: "20px 0", textAlign: "center" }} />
            ) : (
                <Table
                    columns={[
                        { title: "Nombre", dataIndex: "nombre_seccion", key: "nombre_seccion" },
                        { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
                        {
                            title: "Acción",
                            key: "accion",
                            render: (_, record) => (
                                <Space size="middle">
                                    <Button icon={<EditOutlined />} />
                                    <DeleteSeccion idSeccion={record.id_seccion} onSeccionDeleted={handleSeccionDeleted} />
                                </Space>
                            ),
                        },
                    ]}
                    dataSource={secciones}
                    rowKey="id_seccion"
                    rowSelection={rowSelection}
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                />
            )}
        </div>
    );
};

export default ListSecciones;
