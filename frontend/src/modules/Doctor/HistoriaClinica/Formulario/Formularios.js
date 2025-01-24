import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import SearchBar from "../../../../components/common/SearchBar";
import Button from "../../../../components/common/Button";
import Table from "../../../../components/common/Table";
import TipoFormularios from "./TipoFormularios";
import NuevoFormulario from "./NuevoFormulario";
import VerFormulario from "./VerFormulario";
import EditFormulario from "./EditFormulario";
import { fetchFormularios, deleteFormulario } from "../../../../utils/api";

const Formulario = () => {
  const [formularios, setFormularios] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlantilla, setSelectedPlantilla] = useState(null);
  const [selectedFormulario, setSelectedFormulario] = useState(null);

  useEffect(() => {
    const loadFormularios = async () => {
      try {
        const data = await fetchFormularios();
        setFormularios(data || []);
      } catch (error) {
        console.error("Error al cargar los formularios:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFormularios();
  }, []);

  const handleCreateFormulario = () => {
    setCurrentStep(2);
  };

  const handleEditFormulario = (formulario) => {
    setSelectedFormulario(formulario);
    setCurrentStep(5); // Cambiar al paso de edición
  };

  const handleViewFormulario = (idFormulario) => {
    setSelectedFormulario(idFormulario);
    setCurrentStep(4);
  };

  const handleBackToFormularios = () => {
    setCurrentStep(1);
  };

  const handlePlantillaSeleccionada = (plantilla) => {
    setCurrentStep(3);
    setSelectedPlantilla(plantilla);
  };

  const handleDeleteFormulario = async (id) => {
    try {
      await deleteFormulario(id);
      setFormularios((prev) => prev.filter((formulario) => formulario.idFormulario !== id));
      alert("Formulario eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar formulario:", error);
      alert("Error al eliminar el formulario. Intente nuevamente.");
    }
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filteredFormularios = formularios.filter((formulario) =>
    formulario?.nroHistoriaClinica?.toString().includes(searchValue)
  );

  const columns = [
    { label: "Número de Historia Clínica", accessor: "nroHistoriaClinica" },
    { label: "Fecha de Creación", accessor: "fechaCreacionF" },
    { label: "Última Modificación", accessor: "fechaUltimaModificacionF" },
    { label: "Estado", accessor: "estadoFormulario" },
    {
      label: "Acciones",
      accessor: "acciones",
      render: (formulario) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <FaEye
            onClick={() => handleViewFormulario(formulario.idFormulario)}
            title="Ver formulario"
            style={{ cursor: "pointer", color: "#007bff" }}
          />
          <FaEdit
            onClick={() => handleEditFormulario(formulario)}
            title="Editar formulario"
            style={{ cursor: "pointer", color: "#ffc107" }}
          />
          <FaTrash
            onClick={() => handleDeleteFormulario(formulario.idFormulario)}
            title="Eliminar formulario"
            style={{ cursor: "pointer", color: "#dc3545" }}
          />
        </div>
      ),
    },
  ];

  if (loading) {
    return <p>Cargando formularios...</p>;
  }

  return (
    <div className="formulario-container">
      {currentStep === 1 && (
        <>
          <div className="actions-row">
            <h2>Gestión de Formularios</h2>
            <SearchBar
              placeholder="Buscar por número de historia clínica"
              value={searchValue}
              onChange={handleSearch}
            />
            <Button
              label="Crear Formulario"
              onClick={handleCreateFormulario}
              className="primary"
            />
          </div>
          <Table columns={columns} data={filteredFormularios} />
        </>
      )}
      {currentStep === 2 && (
        <TipoFormularios
          onBack={handleBackToFormularios}
          onPlantillaSeleccionada={handlePlantillaSeleccionada}
        />
      )}
      {currentStep === 3 && (
        <NuevoFormulario plantilla={selectedPlantilla} onBack={handleBackToFormularios} />
      )}
      {currentStep === 4 && (
        <VerFormulario idFormulario={selectedFormulario} onBack={handleBackToFormularios} />
      )}
      {currentStep === 5 && selectedFormulario && (
        <EditFormulario
          formulario={selectedFormulario}
          onBack={handleBackToFormularios}
          onUpdate={handleBackToFormularios}
        />
      )}
    </div>
  );
};

export default Formulario;
