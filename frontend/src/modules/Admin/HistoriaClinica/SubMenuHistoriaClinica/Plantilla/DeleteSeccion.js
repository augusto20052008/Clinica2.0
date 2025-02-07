import React, { useState } from "react";
import { Button, Popconfirm, notification } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteSeccion } from "../../../../../utils/api";

const DeleteSeccion = ({ idSeccion, onSeccionDeleted }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteSeccion(idSeccion);
            notification.success({ message: "Sección eliminada", description: "La sección se eliminó correctamente." });
            onSeccionDeleted(idSeccion);
        } catch (error) {
            notification.error({ message: "Error", description: "No se pudo eliminar la sección." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Popconfirm
            title="¿Seguro que quieres eliminar esta sección?"
            okText="Sí"
            cancelText="No"
            onConfirm={handleDelete}
        >
            <Button icon={<DeleteOutlined />} danger loading={loading} />
        </Popconfirm>
    );
};

export default DeleteSeccion;
