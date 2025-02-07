import React, { useEffect, useState } from "react";
import { Button, Input, Spin, notification } from "antd";
import { fetchSeccionByTipoFormulario, fetchSeccionByTipoFormularioYSeccion } from "../../../../utils/api";

const SeleccionarSecciones = ({ formularioId, onSiguiente, onAtras }) => {
    const [secciones, setSecciones] = useState([]);
    const [campos, setCampos] = useState([]);
    const [loadingSecciones, setLoadingSecciones] = useState(false);
    const [loadingCampos, setLoadingCampos] = useState(false);
    const [selectedSeccion, setSelectedSeccion] = useState(null);
    const [respuestas, setRespuestas] = useState([]); // Ahora es un array en lugar de objeto

    // Cargar secciones
    useEffect(() => {
        const loadSecciones = async () => {
            if (!formularioId) return;
            setLoadingSecciones(true);

            try {
                const data = await fetchSeccionByTipoFormulario(formularioId);
                let seccionesArray = Array.isArray(data[0]) ? data[0] : data;
                setSecciones(seccionesArray);
            } catch (error) {
                notification.error({ message: "Error", description: "No se pudieron cargar las secciones." });
            } finally {
                setLoadingSecciones(false);
            }
        };

        loadSecciones();
    }, [formularioId]);

    // Cargar campos de la sección seleccionada
    useEffect(() => {
        const loadCampos = async () => {
            if (!selectedSeccion || !formularioId) return;
            setLoadingCampos(true);

            try {
                const data = await fetchSeccionByTipoFormularioYSeccion(formularioId, selectedSeccion);
                setCampos(Array.isArray(data) ? data : []);
            } catch (error) {
                notification.error({ message: "Error", description: "No se pudieron cargar los campos de la sección." });
            } finally {
                setLoadingCampos(false);
            }
        };

        loadCampos();
    }, [selectedSeccion, formularioId]);

    // Manejar cambios en los valores de los campos
    const handleChange = (campoId, value) => {
        setRespuestas((prev) => {
            const nuevasRespuestas = prev.filter((r) => r.id_campo !== campoId);
            return [...nuevasRespuestas, { id_campo: campoId, valor: value }];
        });
    };

    return (
        <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
            <div style={{ flex: "1", minWidth: "200px" }}>
                <h3>Secciones</h3>
                {loadingSecciones ? (
                    <Spin tip="Cargando secciones..." style={{ display: "block", margin: "20px auto" }} />
                ) : (
                    secciones.map((seccion) => (
                        <Button
                            key={seccion.id_seccion}
                            block
                            style={{ marginBottom: "10px" }}
                            type={selectedSeccion === seccion.id_seccion ? "primary" : "default"}
                            onClick={() => setSelectedSeccion(seccion.id_seccion)}
                        >
                            {seccion.nombre_seccion}
                        </Button>
                    ))
                )}

                <Button 
                    type="primary" 
                    onClick={() => onSiguiente(respuestas)} 
                    style={{ marginTop: "10px" }} 
                    disabled={respuestas.length === 0}
                >
                    Siguiente
                </Button>
                <Button onClick={onAtras} style={{ marginTop: "10px", marginLeft: "10px" }}>
                    Atrás
                </Button>
            </div>

            <div style={{ flex: "2", paddingLeft: "20px" }}>
                <h3>Campos</h3>
                {loadingCampos ? (
                    <Spin tip="Cargando campos..." style={{ display: "block", margin: "20px auto" }} />
                ) : selectedSeccion ? (
                    campos.length > 0 ? (
                        campos.map((campo) => (
                            <div key={campo.id_campo} style={{ marginBottom: "10px" }}>
                                <label>{campo.nombre_campo}: </label>
                                <Input
                                    type={campo.tipo_dato.toLowerCase()}
                                    value={respuestas.find((r) => r.id_campo === campo.id_campo)?.valor || ""}
                                    onChange={(e) => handleChange(campo.id_campo, e.target.value)}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No hay campos en esta sección.</p>
                    )
                ) : (
                    <p>Seleccione una sección para ver los campos.</p>
                )}
            </div>
        </div>
    );
};

export default SeleccionarSecciones;
