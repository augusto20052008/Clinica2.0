import React, { useState, useEffect } from "react";
import Button from "../../../../components/common/Button";
import { createHistoria, fetchPatients, fetchHistorias } from "../../../../utils/api";
import SearchBar from "../../../../components/common/SearchBar";
import "../../../../styles/modules/Administrador/autocomplete.css";

function AddHistoriaClinica({ onClose, onRefresh }) {
  const [formData, setFormData] = useState({
    Paciente_identificacion: "",
  });
  const [pacientes, setPacientes] = useState([]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [pacienteExiste, setPacienteExiste] = useState(null);
  const [ultimoNumeroHistoria, setUltimoNumeroHistoria] = useState(0);

  useEffect(() => {
    const loadPacientes = async () => {
      try {
        const data = await fetchPatients();
        setPacientes(data.data || []);
      } catch (error) {
        console.error("Error al cargar pacientes:", error);
      }
    };

    const fetchUltimoNumeroHistoria = async () => {
      try {
        const historias = await fetchHistorias();
        const ultimoNumero = historias?.length > 0
          ? Math.max(
              ...historias
                .map((h) => parseInt(h.nroHistoriaClinica, 10))
                .filter((num) => !isNaN(num))
            )
          : 0;
        setUltimoNumeroHistoria(ultimoNumero + 1);
      } catch (error) {
        console.error("Error al obtener el último número de historia clínica:", error);
        setUltimoNumeroHistoria(1);
      }
    };

    loadPacientes();
    fetchUltimoNumeroHistoria();
  }, []);

  const formatHistoriaClinicaNumber = (number) => {
    return number.toString().padStart(6, '0');
  };

  const handleInputChange = (value) => {
    setFormData({ ...formData, Paciente_identificacion: value });

    const filtered = pacientes.filter((paciente) =>
      paciente.identificacion.startsWith(value)
    );
    setFilteredPacientes(filtered);

    const existe = pacientes.some(
      (paciente) => paciente.identificacion === value
    );
    setPacienteExiste(existe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Paciente_identificacion) {
      alert("Por favor, completa la identificación del paciente.");
      return;
    }

    if (pacienteExiste === false) {
      alert("El paciente no existe. Por favor, créalo primero.");
      return;
    }

    const dataToSend = {
      ...formData,
      nroHistoriaClinica: formatHistoriaClinicaNumber(ultimoNumeroHistoria),
    };

    try {
      console.log("Datos enviados al backend:", dataToSend);
      await createHistoria(dataToSend);
      alert("Historia Clínica Agregada");
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
