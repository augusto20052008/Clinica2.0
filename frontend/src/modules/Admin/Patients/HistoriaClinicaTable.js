import React, { useEffect, useState } from "react";
import Table from "../../../components/common/Table";
import { fetchHistoriaById } from "../../../utils/api";

const HistoriaClinicaTable = ({ pacienteIdentificacion }) => {
  const [historiasClinicas, setHistoriasClinicas] = useState([]);

  useEffect(() => {
    const loadHistoriasClinicas = async () => {
      try {
        const response = await fetchHistoriaById(pacienteIdentificacion);
        if (response && Array.isArray(response) && response.length > 0) {
          setHistoriasClinicas(response);
        } else {
          console.error("Error: No se encontraron historias clínicas.");
        }
      } catch (error) {
        console.error("Error al cargar las historias clínicas:", error);
      }
    };

    if (pacienteIdentificacion) {
      loadHistoriasClinicas();
    }
  }, [pacienteIdentificacion]);

  const columns = [
    { label: "ID Historia Clínica", accessor: "idHistoriaClinica" },
    { label: "Número Historia Clínica", accessor: "nroHistoriaClinica" },
    { label: "Fecha de Creación", accessor: "fechaCreacionHC" },
    { label: "Última Edición", accessor: "fechaUltimaEdicion" },
    { label: "Identificación Paciente", accessor: "Paciente_identificacion" },
  ];

  if (!pacienteIdentificacion) {
    return <p>No se proporcionó identificación del paciente.</p>;
  }

  if (historiasClinicas.length === 0) {
    return <p>No se encontraron historias clínicas para este paciente.</p>;
  }

  return (
    <div>
      <h3>Historia Clínica</h3>
      <Table columns={columns} data={historiasClinicas} />
    </div>
  );
};

export default HistoriaClinicaTable;