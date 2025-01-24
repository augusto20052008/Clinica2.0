import React, { useState, useEffect } from "react";
import Table from "../../../components/common/Table";
import Button from "../../../components/common/Button";
import SearchBar from "../../../components/common/SearchBar";
import AddHistoriaClinica from "./AddHistoriaClinica";
import EditHistoriaClinica from "./EditHistoriaClinica";
import HistoriaClinicaProfile from "./HistoriaClinicaProfile";
import Modal from "../../../components/common/Modal";
import { fetchHistorias, deleteHistoria } from "../../../utils/api";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

function HistoriasEnfermera() {
  const [historias, setHistorias] = useState([]);
  const [filteredHistorias, setFilteredHistorias] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [currentHistoria, setCurrentHistoria] = useState(null);

  useEffect(() => {
    loadHistorias();
  }, []);

  useEffect(() => {
    const filteredData = historias.filter((historia) =>
      historia.Paciente_identificacion.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHistorias(filteredData);
  }, [searchQuery, historias]);

  const loadHistorias = async () => {
    try {
      const data = await fetchHistorias();
      setHistorias(data);
      setFilteredHistorias(data);
    } catch (error) {
      console.error("Error al cargar historias clínicas:", error);
    }
  };

  const handleDelete = async (idHistoriaClinica, pacienteIdentificacion) => {
    console.log("Intentando eliminar historia con ID:", idHistoriaClinica, "y paciente:", pacienteIdentificacion);

    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta historia clínica?");
    if (!confirmDelete) return;

    try {
      await deleteHistoria(idHistoriaClinica, pacienteIdentificacion);
      alert("Historia clínica eliminada exitosamente");
      loadHistorias();
    } catch (error) {
      console.error("Error al eliminar historia clínica:", error);
      alert(
        error.message || "Error al eliminar historia clínica."
      );
    }
  };


  const handleEdit = (historia) => {
    setCurrentHistoria(historia);
    setEditModalOpen(true);
  };

  const handleView = (historia) => {
    setCurrentHistoria(historia);
    setViewModalOpen(true);
  };

  const columns = [
    { label: "Numero Historia Clinica", accessor: "nroHistoriaClinica" },
    { label: "Paciente Identificación", accessor: "Paciente_identificacion" },
    { label: "Fecha de Creación", accessor: "fechaCreacionHC" },
    { label: "Ultima Edición", accessor: "fechaUltimaEdicion" },
    {
      label: "Acciones",
      accessor: "acciones",
      render: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <FaEye onClick={() => handleView(row)} style={{ cursor: "pointer", color: "#007bff" }} />
          <FaEdit onClick={() => handleEdit(row)} style={{ cursor: "pointer", color: "#ffc107" }} />
          <FaTrash
            onClick={() => handleDelete(row.idHistoriaClinica, row.Paciente_identificacion)}
            style={{ cursor: "pointer", color: "#dc3545" }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="actions-row">
        <h2>Gestión de Historias Clínicas</h2>
        <SearchBar
          placeholder="Buscar por identificación del paciente"
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <Button label="Agregar Historia Clínica" onClick={() => setAddModalOpen(true)} />
      </div>

      <Table columns={columns} data={filteredHistorias} />
      {isAddModalOpen && (
        <Modal onClose={() => setAddModalOpen(false)}>
          <AddHistoriaClinica onClose={() => setAddModalOpen(false)} onRefresh={loadHistorias} />
        </Modal>
      )}
      {isEditModalOpen && currentHistoria && (
        <Modal onClose={() => setEditModalOpen(false)}>
          <EditHistoriaClinica
            historia={currentHistoria}
            onClose={() => setEditModalOpen(false)}
            onRefresh={loadHistorias}
          />
        </Modal>
      )}
      {isViewModalOpen && currentHistoria && (
        <HistoriaClinicaProfile
          idHistoriaClinica={currentHistoria.idHistoriaClinica}
          pacienteIdentificacion={currentHistoria.Paciente_identificacion}
          onClose={() => setViewModalOpen(false)}
        />
      )}
    </div>
  );
}

export default HistoriasEnfermera;
