import React, { useEffect, useState } from "react";
import { Button, Spin, notification } from "antd";
import { createFormulario, fetchHistoriaClinica, guardarRespuestasFormulario } from "../../../../utils/api";
import jwt_decode from "jwt-decode";

const ConfirmarVinculacion = ({ onConfirmar, onAtras, formularioId, pacienteId, respuestas }) => {
    const [loading, setLoading] = useState(false);
    const [idUsuario, setIdUsuario] = useState(null);
    const [nroArchivo, setNroArchivo] = useState(null);

    // Obtener el ID del usuario desde el token JWT
    useEffect(() => {
        const token = localStorage.getItem("jwt_token");
        if (token) {
            try {
                const decoded = jwt_decode(token);
                setIdUsuario(decoded.id);
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }
    }, []);

    // Obtener el número de archivo clínico del paciente
    useEffect(() => {
        if (!pacienteId) return;

        const fetchNroArchivo = async () => {
            try {
                const historiaClinica = await fetchHistoriaClinica();

                // Buscar el paciente en la historia clínica
                const pacienteHistorial = historiaClinica.find((historia) => historia.nro_identificacion === pacienteId);
                
                if (pacienteHistorial) {
                    setNroArchivo(pacienteHistorial.nro_archivo);
                } else {
                    notification.error({ message: "Error", description: "No se encontró historia clínica para este paciente." });
                }
            } catch (error) {
                console.error("Error al obtener la historia clínica:", error);
                notification.error({ message: "Error", description: "No se pudo obtener la historia clínica." });
            }
        };

        fetchNroArchivo();
    }, [pacienteId]);

    // Manejar la confirmación
    const handleConfirmar = async () => {
        if (!idUsuario || !nroArchivo || !formularioId) {
            notification.warning({ message: "Advertencia", description: "Faltan datos para completar la vinculación." });
            return;
        }

        if (!respuestas || respuestas.length === 0) {
            notification.warning({ message: "Advertencia", description: "No hay respuestas para guardar." });
            return;
        }

        setLoading(true);
        try {
            const nuevoFormulario = await createFormulario({
                id_formulario_tipo: formularioId,
                nro_archivo: nroArchivo,
                id_usuario_creador: idUsuario,
                estado: "COMPLETADO",
            });

            if (!nuevoFormulario || !nuevoFormulario.id_formulario) throw new Error("Error en la creación del formulario.");

            const respuestasArray = respuestas.map(({ id_campo, valor }) => ({
                id_formulario: nuevoFormulario.id_formulario,
                id_campo,
                valor,
            }));

            for (const respuesta of respuestasArray) {
                await guardarRespuestasFormulario(respuesta);
            }

            notification.success({ message: "Éxito", description: "Formulario vinculado exitosamente." });
            onConfirmar();
        } catch (error) {
            console.error("Error al vincular el formulario:", error);
            notification.error({ message: "Error", description: "No se pudo vincular el formulario." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h3>¿Está seguro de vincular este formulario?</h3>
            <p><strong>Usuario ID:</strong> {idUsuario}</p>
            <p><strong>Número de archivo:</strong> {nroArchivo}</p>
            <p><strong>Formulario ID:</strong> {formularioId}</p>

            {loading ? (
                <Spin tip="Vinculando formulario..." />
            ) : (
                <>
                    <Button 
                        type="primary" 
                        onClick={handleConfirmar} 
                        disabled={!nroArchivo || loading} 
                        style={{ marginRight: "10px" }}
                    >
                        Sí
                    </Button>
                    <Button onClick={onAtras}>No</Button>
                </>
            )}
        </div>
    );
};

export default ConfirmarVinculacion;
