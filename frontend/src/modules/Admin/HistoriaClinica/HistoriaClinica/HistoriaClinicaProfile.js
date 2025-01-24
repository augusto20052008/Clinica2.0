import React, { useEffect, useState } from "react";
import Modal from "../../../../components/common/Modal";
import { fetchHistoriaById } from "../../../../utils/api";

function HistoriaClinicaProfile({ idHistoriaClinica, pacienteIdentificacion, onClose }) {
  const [historia, setHistoria] = useState(null);

  useEffect(() => {
    const loadHistoria = async () => {
      try {
        const data = await fetchHistoriaById(idHistoriaClinica, pacienteIdentificacion);
        setHistoria(data);
      } catch (error) {
        console.error("Error al cargar la historia clínica:", error);
        alert("Error al cargar la historia clínica.");
        onClose();
      }
    };

    loadHistoria();
  }, [idHistoriaClinica, pacienteIdentificacion, onClose]);

  if (!historia) {
    return <div>Cargando datos...</div>;
  }

  return (
    <Modal onClose={onClose}>
      <h2>Detalles de la Historia Clínica</h2>
      <div>
        <p>
          <strong>ID de la Historia:</strong> {historia.idHistoriaClinica}
        </p>
        <p>
          <strong>Número de Historia:</strong> {historia.nroHistoriaClinica}
        </p>
        <p>
          <strong>Fecha de Creación:</strong> {historia.fechaCreacionHC}
        </p>
        <p>
          <strong>Fecha de Última Edición:</strong> {historia.fechaUltimaEdicion}
        </p>
        <p>
          <strong>Identificación del Paciente:</strong> {historia.Paciente_identificacion}
        </p>
      </div>
    </Modal>
  );
}

export default HistoriaClinicaProfile;
