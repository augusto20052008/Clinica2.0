import React, { useState, useEffect } from "react";
import Modal from "../../../../../components/common/Modal";
import AddPlantilla from "./AddPlantilla";
import EditPlantilla from "./EditPlantilla";
import { fetchPlantillas, deletePlantilla } from "../../../../../utils/api";
import Table from "../../../../../components/common/Table";
import Button from "../../../../../components/common/Button";
import SearchBar from "../../../../../components/common/SearchBar";
import { FaEdit, FaTrash } from "react-icons/fa";

function Plantillas() {
  const [plantillas, setPlantillas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [currentPlantilla, setCurrentPlantilla] = useState(null);

  useEffect(() => {
    loadPlantillas();
  }, []);

  // Carga inicial de plantillas
  const loadPlantillas = async () => {
    try {
      const data = await fetchPlantillas();
      setPlantillas(data);
    } catch (error) {
      console.error("Error al cargar plantillas:", error);
    }
  };

  // Manejo de eliminación de una plantilla
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta plantilla?"
    );

    if (!confirmDelete) return;

    try {
      const response = await deletePlantilla(id);
      alert(response.message || "Plantilla eliminada exitosamente");
      loadPlantillas();
    } catch (error) {
      console.error("Error al eliminar plantilla:", error);
      alert(
        error.message ||
          "No se pudo eliminar la plantilla. Inténtalo nuevamente más tarde."
      );
    }
  };

  // Manejo de edición de una plantilla (ahora sin modal)
  const handleEdit = (plantilla) => {
    setCurrentPlantilla(plantilla);
  };

  // Manejo para volver a la lista (regresar)
  const handleBackToList = () => {
    setCurrentPlantilla(null);
  };

  // Columnas de la tabla
  const columns = [
    { label: "ID", accessor: "idPlantilla_Formulario" },
    { label: "Número Tipo Formulario", accessor: "nroTipoFormulario" },
    { label: "Nombre", accessor: "nombreTipoFormulario" },
    {
      label: "Acciones",
      accessor: "acciones",
      render: (row) => (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <FaEdit
            onClick={() => handleEdit(row)}
            title="Editar plantilla"
            style={{ cursor: "pointer", color: "#ffc107" }}
          />
          <FaTrash
            onClick={() => handleDelete(row.idPlantilla_Formulario)}
            title="Eliminar plantilla"
            style={{ cursor: "pointer", color: "#dc3545" }}
          />
        </div>
      ),
    },
  ];

  // Filtrado de plantillas según la barra de búsqueda
  const filteredPlantillas = plantillas.filter((plantilla) =>
    plantilla.nombreTipoFormulario
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Si se está editando una plantilla, renderizamos la vista de edición
  if (currentPlantilla) {
    return (
      <EditPlantilla
        plantilla={currentPlantilla}
        onClose={handleBackToList}
        onRefresh={loadPlantillas}
      />
    );
  }

  // De lo contrario, mostramos la tabla de plantillas
  return (
    <div>
      <div className="actions-row">
        <h2>Gestión de Plantillas de Formularios</h2>
        <SearchBar
          placeholder="Buscar por nombre de formulario..."
          value={searchTerm}
          onChange={(valor) => setSearchTerm(valor)}
        />

        <Button label="Agregar Plantilla" onClick={() => setAddModalOpen(true)} />
      </div>


      <Table columns={columns} data={filteredPlantillas} />

      {/* Modal para Agregar Plantilla (opcional, si lo quieres conservar) */}
      {isAddModalOpen && (
        <Modal onClose={() => setAddModalOpen(false)}>
          <AddPlantilla
            onClose={() => setAddModalOpen(false)}
            onRefresh={loadPlantillas}
          />
        </Modal>
      )}
    </div>
  );
}

export default Plantillas;
