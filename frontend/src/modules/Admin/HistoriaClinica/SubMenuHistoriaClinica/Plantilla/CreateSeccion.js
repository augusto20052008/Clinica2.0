import React, { useState } from "react";
import { Input, Button, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createSeccion } from "../../../../../utils/api";
import ListSecciones from "./ListSecciones";

const CreateSeccion = ({ idFormulario, onSeccionSelected }) => {
    const [nombreSeccion, setNombreSeccion] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const handleAddSeccion = async () => {
        if (!nombreSeccion.trim() || !descripcion.trim()) {
            notification.warning({ message: "Advertencia", description: "El nombre y la descripción son obligatorios." });
            return;
        }

        if (!idFormulario) {
            notification.error({ message: "Error", description: "No se puede crear una sección sin un formulario asociado." });
            return;
        }

        setLoading(true);
        try {
            const newSeccion = await createSeccion({
                id_formulario_tipo: idFormulario,
                nombre_seccion: nombreSeccion,
                descripcion,
            });

            if (newSeccion.id_seccion) {
                setNombreSeccion("");
                setDescripcion("");
                setRefresh((prev) => !prev);
                onSeccionSelected(newSeccion.id_seccion);
                notification.success({
                    message: "Sección creada",
                    description: `Sección "${newSeccion.nombre_seccion}" creada exitosamente.`,
                });
            } else {
                throw new Error("No se recibió un ID de sección válido desde el backend.");
            }
        } catch (error) {
            notification.error({ message: "Error", description: "No se pudo crear la sección." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Input placeholder="Nombre de la Sección" value={nombreSeccion} onChange={(e) => setNombreSeccion(e.target.value)} />
            <Input placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            <Button type="primary" icon={<PlusOutlined />} loading={loading} onClick={handleAddSeccion}>
                Crear Sección
            </Button>

            {/* Tabla de secciones con actualización automática */}
            <ListSecciones idFormulario={idFormulario} refresh={refresh} onSeccionSelected={onSeccionSelected} />
        </div>
    );
};

export default CreateSeccion;
