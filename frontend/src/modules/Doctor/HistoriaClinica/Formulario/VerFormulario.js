import React, { useEffect, useState } from "react";
import { fetchFormularioById } from "../../../../utils/api";

const VerFormulario = ({ idHistoriaClinica, onBack }) => {
  const [formulario, setFormulario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFormulario = async () => {
      try {
        const data = await fetchFormularioById(idHistoriaClinica);
        setFormulario(data);
      } catch (error) {
        console.error("Error al cargar el formulario:", error);
        alert("No se pudo cargar el formulario. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    loadFormulario();
  }, [idHistoriaClinica]);

  if (loading) {
    return <p>Cargando formulario...</p>;
  }

  if (!formulario) {
    return <p>No se encontró el formulario.</p>;
  }

  return (
    <div>
      <h2>Detalles del Formulario</h2>
      <div style={{ marginBottom: "20px" }}>
        <strong>Número de Historia Clínica:</strong> {formulario.nroHistoriaClinica || "N/A"}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <strong>Estado del Formulario:</strong> {formulario.estadoFormulario || "N/A"}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <strong>Notas:</strong> {formulario.notas || "N/A"}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <strong>Observaciones:</strong> {formulario.observaciones || "N/A"}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <strong>Contenido:</strong> <pre>{JSON.stringify(formulario.contenido, null, 2)}</pre>
      </div>
      <button onClick={onBack}>Volver</button>
    </div>
  );
};

export default VerFormulario;
