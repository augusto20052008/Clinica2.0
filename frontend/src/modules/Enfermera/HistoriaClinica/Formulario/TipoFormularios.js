import React, { useEffect, useState } from "react";
import BackButton from "../../../../components/common/BackButton";
import Table from "../../../../components/common/Table";
import Pagination from "../../../../components/common/Pagination";
import { fetchPlantillas, fetchPlantilla } from "../../../../utils/api";
import "../../../../styles/modules/Administrador/tipoFormulario.css";
import { FaArrowRight } from "react-icons/fa"; // Importa el ícono de flecha que prefieras

function TipoFormularios({ onBack, onPlantillaSeleccionada }) {
  const [plantillas, setPlantillas] = useState([]);
  const [filteredPlantillas, setFilteredPlantillas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadPlantillas = async () => {
      try {
        const data = await fetchPlantillas();
        setPlantillas(data);
        setFilteredPlantillas(data);
      } catch (error) {
        console.error("Error al cargar las plantillas:", error);
      }
    };

    loadPlantillas();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredPlantillas(
      plantillas.filter((plantilla) =>
        plantilla.nombreTipoFormulario.toLowerCase().includes(term)
      )
    );
    setCurrentPage(1);
  };

  const handlePlantillaSelect = async (plantilla) => {
    try {
      const response = await fetchPlantilla(plantilla.idPlantilla_Formulario);

      // Verificar si la estructura está definida y es un objeto
      let estructura = response.data.Estructura;
      if (!estructura || typeof estructura !== "object") {
        throw new Error("Estructura no válida o inexistente");
      }

      // Validar que tenga la propiedad sections
      if (!estructura.sections || !Array.isArray(estructura.sections)) {
        throw new Error("La estructura no contiene secciones válidas");
      }

      const transformedData = {
        idPlantilla_Formulario: plantilla.idPlantilla_Formulario,
        nombreTipoFormulario: estructura.title || "Formulario Sin Título",
        secciones: estructura.sections.map((section) => ({
          nombre: section.title || "Sección Sin Título",
          campos: section.fields || [],
        })),
      };

      onPlantillaSeleccionada(transformedData);
    } catch (error) {
      console.error("Error al cargar la plantilla seleccionada:", error);
      alert(
        "No se pudo cargar la plantilla. Verifica la información e intenta nuevamente."
      );
    }
  };

  const paginatedPlantillas = filteredPlantillas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="tipo-formularios-container">
      <div className="tipo-formularios-header">
        <BackButton onClick={onBack} />
        <h2 className="tipo-formularios-title">Seleccionar Plantilla</h2>
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Buscar por nombre de plantilla..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <Table
        columns={[
          { label: "Nombre de Plantilla", accessor: "nombreTipoFormulario" },
          {
            label: "Acción",
            accessor: "action",
            render: (row) => (
              <button
                className="table-action-button"
                onClick={() => handlePlantillaSelect(row)}
              >
                <FaArrowRight />
              </button>
            ),
          },
        ]}
        data={paginatedPlantillas}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredPlantillas.length / itemsPerPage)}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default TipoFormularios;
