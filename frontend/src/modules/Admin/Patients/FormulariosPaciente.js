import React, { useState, useEffect } from "react";
import Table from "../../../components/common/Table";
import SearchBar from "../../../components/common/SearchBar";
import Button from "../../../components/common/Button";
import BackButton from "../../../components/common/BackButton";
import { fetchFormulariosByHistoriaClinica } from "../../../utils/api";

const FormulariosPaciente = ({ idHistoriaClinica, onBack, onAddFormulario }) => {
  const [formularios, setFormularios] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFormularios = async () => {
      try {
        if (!idHistoriaClinica) {
          throw new Error("ID de Historia Clínica no proporcionado.");
        }
        const data = await fetchFormulariosByHistoriaClinica(idHistoriaClinica);
        setFormularios(data);
      } catch (err) {
        console.error("Error al cargar los formularios:", err);
        setError("No se pudieron cargar los formularios.");
      } finally {
        setLoading(false);
      }
    };

    loadFormularios();
  }, [idHistoriaClinica]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filteredFormularios = formularios.filter((formulario) =>
    formulario.idFormulario.toString().includes(searchValue)
  );

  return (
    <div className="formularios-paciente">
      <div className="actions-row">
        <BackButton onClick={onBack} />
        <SearchBar
          placeholder="Buscar por ID de formulario"
          value={searchValue}
          onChange={handleSearch}
        />
        <Button label="Agregar Formulario" onClick={onAddFormulario} />
      </div>
      {loading ? (
        <p>Cargando formularios...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Table
          columns={[
            { label: "ID", accessor: "idFormulario" },
            { label: "Fecha Creación", accessor: "fechaCreacionF" },
            { label: "Estado", accessor: "estadoFormulario" },
            { label: "Notas", accessor: "notas" },
          ]}
          data={filteredFormularios}
          onRowAction={(row) =>
            alert(`Seleccionaste el formulario con ID: ${row.idFormulario}`)
          }
        />
      )}
    </div>
  );
};

export default FormulariosPaciente;
