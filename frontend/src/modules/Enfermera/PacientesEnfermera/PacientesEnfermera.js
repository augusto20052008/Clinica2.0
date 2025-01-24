import React, { useState, useEffect } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/common/SearchBar";
import FilterDropdown from "../../../components/common/FilterDropdown";
import Pagination from "../../../components/common/Pagination";
import Table from "../../../components/common/Table";
import Button from "../../../components/common/Button";
import AddPacienteEnfermeraForm from "./AddPacienteEnfermeraForm";
import EditPacienteEnfermeraForm from "./EditPacienteEnfermeraForm";
import "../../../styles/modules/Administrador/patient/patient.css";
import { fetchPatients, createPatient, updatePatient, fetchPatientDetails } from "../../../utils/api";

const PacientesEnfermera = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState({ estado: "" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [isEditPatientModalOpen, setIsEditPatientModalOpen] = useState(false);
  const [currentEditPatient, setCurrentEditPatient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Cargar pacientes al inicio
  useEffect(() => {
    const loadPatients = async () => {
      try {
        const response = await fetchPatients();
        if (response && response.data && Array.isArray(response.data)) {
          setPatients(response.data);
          setFilteredPatients(response.data);
        } else {
          setPatients([]);
        }
      } catch (error) {
        console.error("Error al cargar los pacientes:", error);
        setPatients([]);
      }
    };
    loadPatients();
  }, []);

  // Manejo de búsqueda
  const handleSearch = (value) => {
    setSearchValue(value);
    const lowercasedValue = value.toLowerCase();
    const filtered = patients.filter(
      (patient) =>
        patient.identificacion.toLowerCase().includes(lowercasedValue) ||
        patient.primerNombre.toLowerCase().includes(lowercasedValue)
    );
    setFilteredPatients(filtered);
    setCurrentPage(1);
  };

  // Manejo de filtros
  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [key]: value };
      const filtered = patients.filter((patient) => {
        const matchEstado = !updatedFilters.estado || patient.estado === updatedFilters.estado;
        return matchEstado;
      });
      setFilteredPatients(filtered);
      setCurrentPage(1);
      return updatedFilters;
    });
  };

  const clearFilters = () => {
    setFilters({ estado: "" });
    setFilteredPatients(patients);
    setCurrentPage(1);
  };

  // Manejo de agregar paciente
  const handleAddPatient = async (newPatient) => {
    try {
      const addedPatient = await createPatient(newPatient);
      setPatients((prevPatients) => [addedPatient, ...prevPatients]);
      setFilteredPatients((prevPatients) => [addedPatient, ...prevPatients]);
      setIsAddPatientModalOpen(false);
    } catch (error) {
      console.error("Error al agregar paciente:", error);
      alert("No se pudo agregar el paciente. Verifica los datos e inténtalo de nuevo.");
    }
  };

  // Manejo de edición de paciente
  const handleEditPatient = async (identificacion) => {
    try {
      const patientDetails = await fetchPatientDetails(identificacion);
      setCurrentEditPatient(patientDetails);
      setIsEditPatientModalOpen(true);
    } catch (error) {
      console.error("Error al obtener detalles del paciente para editar:", error);
    }
  };

  const handleUpdatePatient = async (updatedPatient) => {
    try {
      await updatePatient(updatedPatient.identificacion, updatedPatient);
      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient.identificacion === updatedPatient.identificacion ? updatedPatient : patient
        )
      );
      setFilteredPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient.identificacion === updatedPatient.identificacion ? updatedPatient : patient
        )
      );
      setIsEditPatientModalOpen(false);
      alert("Paciente actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar paciente:", error);
    }
  };

  // Navegación al perfil del paciente
  const handleViewPatient = (identificacion) => {
    navigate(`/admin/patients/${identificacion}`);
  };

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, endIndex);

  return (
    <div className="patients-container">
      <div className="actions-container">
        <div className="actions-row">
          <h2 className="title">Lista de Pacientes</h2>
          <SearchBar
            placeholder="Buscar por nombre o identificación"
            value={searchValue}
            onChange={handleSearch}
          />
          <FilterDropdown
            isOpen={isFilterOpen}
            toggle={() => setIsFilterOpen((prev) => !prev)}
            filters={filters}
            setFilters={handleFilterChange}
            options={[{ key: "estado", label: "Estado", values: ["Activo", "Inactivo"] }]}
          />
          <Button label="Quitar Filtros" onClick={clearFilters} className="secondary" />
          <Button label="Agregar Paciente" onClick={() => setIsAddPatientModalOpen(true)} className="primary" />
        </div>
      </div>

      <Table
        columns={[
          { label: "Identificación", accessor: "identificacion" },
          { label: "Primer Nombre", accessor: "primerNombre" },
          { label: "Apellido Paterno", accessor: "apellidoParteno" },
          { label: "Correo", accessor: "correo" },
          { label: "Teléfono", accessor: "telefonoPaciente" },
          {
            label: "Acción",
            accessor: "acciones",
            render: (patient) => (
              <div className="action-buttons" style={{ display: "flex", gap: "10px" }}>
                <FaEye
                  className="icon-view"
                  onClick={() => handleViewPatient(patient.identificacion)}
                  title="Ver detalles"
                  style={{ cursor: "pointer", color: "#007bff" }}
                />
                <FaEdit
                  className="icon-edit"
                  onClick={() => handleEditPatient(patient.identificacion)}
                  title="Editar paciente"
                  style={{ cursor: "pointer", color: "#ffc107" }}
                />
              </div>
            ),
          },
        ]}
        data={paginatedPatients}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {isAddPatientModalOpen && (
        <AddPacienteEnfermeraForm
          onClose={() => setIsAddPatientModalOpen(false)}
          onAdd={handleAddPatient}
        />
      )}

      {isEditPatientModalOpen && currentEditPatient && (
        <EditPacienteEnfermeraForm
          onClose={() => setIsEditPatientModalOpen(false)}
          onUpdate={handleUpdatePatient}
          initialData={currentEditPatient}
        />
      )}
    </div>
  );
};

export default PacientesEnfermera;
