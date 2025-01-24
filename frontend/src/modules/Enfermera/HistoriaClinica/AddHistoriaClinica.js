import React, { useState, useEffect } from "react";
import Button from "../../../components/common/Button";
import { createHistoria, fetchPatients } from "../../../utils/api";
import SearchBar from "../../../components/common/SearchBar";
import "../../../styles/modules/Administrador/autocomplete.css";

function AddHistoriaClinica({ onClose, onRefresh }) {
  const [formData, setFormData] = useState({
    nroHistoriaClinica: "",
    Paciente_identificacion: "",
  });
  const [pacientes, setPacientes] = useState([]); // Lista completa de pacientes
  const [filteredPacientes, setFilteredPacientes] = useState([]); // Lista filtrada según la búsqueda
  const [pacienteExiste, setPacienteExiste] = useState(null); // null, true o false

  useEffect(() => {
    // Cargar todos los pacientes al montar el componente
    const loadPacientes = async () => {
      try {
        const data = await fetchPatients(); // Asume que fetchPatients ya está configurado para usar la ruta GET /paciente
        setPacientes(data.data || []); // Almacena la lista completa de pacientes
      } catch (error) {
        console.error("Error al cargar pacientes:", error);
      }
    };
    loadPacientes();
  }, []);

  const handleInputChange = (value) => {
    setFormData({ ...formData, Paciente_identificacion: value });

    // Filtrar pacientes según el valor ingresado
    const filtered = pacientes.filter((paciente) =>
      paciente.identificacion.startsWith(value)
    );
    setFilteredPacientes(filtered);

    // Verificar si el valor completo corresponde a un paciente existente
    const existe = pacientes.some(
      (paciente) => paciente.identificacion === value
    );
    setPacienteExiste(existe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nroHistoriaClinica || !formData.Paciente_identificacion) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    if (pacienteExiste === false) {
      alert("El paciente no existe. Por favor, créalo primero.");
      return;
    }

    try {
      await createHistoria(formData);
      alert("Historia clínica creada exitosamente");
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error al crear historia clínica:", error);
      alert(
        error.response?.data?.message || "Error al crear historia clínica."
      );
    }
  };

  return (
    <div>
      <h2>Agregar Nueva Historia Clínica</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nroHistoriaClinica">Número de Historia Clínica:</label>
          <input
            type="text"
            name="nroHistoriaClinica"
            id="nroHistoriaClinica"
            value={formData.nroHistoriaClinica}
            onChange={(e) =>
              setFormData({ ...formData, nroHistoriaClinica: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Paciente_identificacion">
            Identificación del Paciente:
          </label>
          <SearchBar
            placeholder="Buscar identificación del paciente"
            value={formData.Paciente_identificacion}
            onChange={handleInputChange}
          />
          {filteredPacientes.length > 0 && (
            <ul className="autocomplete-list">
              {filteredPacientes.map((paciente) => (
                <li
                  key={paciente.identificacion}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      Paciente_identificacion: paciente.identificacion,
                    })
                  }
                >
                  <span className="id">{paciente.identificacion}</span>
                  <span className="name">
                    {paciente.primerNombre} {paciente.apellidoMaterno}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {pacienteExiste === true && (
            <p style={{ color: "green" }}>Paciente encontrado.</p>
          )}
          {pacienteExiste === false && (
            <p style={{ color: "red" }}>Paciente no encontrado.</p>
          )}
        </div>
        <div className="form-buttons">
          <Button type="submit" label="Guardar" />
          <Button type="button" label="Cancelar" onClick={onClose} />
        </div>
      </form>
    </div>
  );
}

export default AddHistoriaClinica;
