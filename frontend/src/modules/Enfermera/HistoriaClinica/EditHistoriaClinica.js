import React, { useState } from "react";
import Button from "../../../components/common/Button";
import { updateHistoria } from "../../../utils/api";

function EditHistoriaClinica({ onClose, onRefresh, historia }) {
  const [formData, setFormData] = useState({
    idHistoriaClinica: historia.idHistoriaClinica || "",
    nroHistoriaClinica: historia.nroHistoriaClinica || "",
    fechaCreacionHC: historia.fechaCreacionHC || "",
    fechaUltimaEdicion: new Date().toISOString().split("T")[0], // Fecha actual como valor por defecto
    Paciente_identificacion: historia.Paciente_identificacion || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateHistoria(historia.idHistoriaClinica, historia.Paciente_identificacion, formData);
      alert("Historia clínica actualizada exitosamente");
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error al actualizar historia clínica:", error);
      alert("Error al actualizar historia clínica");
    }
  };

  return (
    <div>
      <h2>Editar Historia Clínica</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="idHistoriaClinica">ID de la Historia Clínica:</label>
          <input
            type="text"
            name="idHistoriaClinica"
            id="idHistoriaClinica"
            value={formData.idHistoriaClinica}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="nroHistoriaClinica">Número de Historia Clínica:</label>
          <input
            type="text"
            name="nroHistoriaClinica"
            id="nroHistoriaClinica"
            value={formData.nroHistoriaClinica}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fechaCreacionHC">Fecha de Creación:</label>
          <input
            type="date"
            name="fechaCreacionHC"
            id="fechaCreacionHC"
            value={formData.fechaCreacionHC}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="fechaUltimaEdicion">Fecha de Última Edición:</label>
          <input
            type="date"
            name="fechaUltimaEdicion"
            id="fechaUltimaEdicion"
            value={formData.fechaUltimaEdicion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Paciente_identificacion">Identificación del Paciente:</label>
          <input
            type="text"
            name="Paciente_identificacion"
            id="Paciente_identificacion"
            value={formData.Paciente_identificacion}
            readOnly
          />
        </div>
        <div className="form-buttons">
          <Button type="submit" label="Guardar" />
          <Button type="button" label="Cancelar" onClick={onClose} />
        </div>
      </form>
    </div>
  );
}

export default EditHistoriaClinica;
