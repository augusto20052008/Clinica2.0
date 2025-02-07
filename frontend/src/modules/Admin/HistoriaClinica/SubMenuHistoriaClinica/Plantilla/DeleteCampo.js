import React, { useState } from "react";
import { Button, Popconfirm, notification } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteCampo } from "../../../../../utils/api";

const DeleteCampo = ({ idCampo, onCampoDeleted }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteCampo(idCampo);
            notification.success({ message: "Campo eliminado", description: "El campo se eliminó correctamente." });
            onCampoDeleted(idCampo);
        } catch (error) {
            notification.error({ message: "Error", description: "No se pudo eliminar el campo." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Popconfirm title="¿Seguro que quieres eliminar este campo?" okText="Sí" cancelText="No" onConfirm={handleDelete}>
            <Button icon={<DeleteOutlined />} danger loading={loading} />
        </Popconfirm>
    );
};

export default DeleteCampo;
