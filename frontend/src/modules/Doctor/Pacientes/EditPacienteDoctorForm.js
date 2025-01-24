import React, { useState, useEffect } from "react";
import Modal from "../../../components/common/Modal";
import Button from "../../../components/common/Button";

const EditPatientForm = ({ onClose, onUpdate, initialData }) => {
  const [formData, setFormData] = useState({
    identificacion: "",
    primerNombre: "",
    apellidoParteno: "",
    apellidoMaterno: "",
    telefonoPaciente: "",
    correo: "",
    sexo: "",
    estadoCivil: "",
    fechaNacimiento: "",
    nacionalidad: "",
    grupoCultural: "",
    tipoSeguroSalud: "",
    grupoSanguineo: "",
    alergias: "",
    observaciones: "",
  });

  useEffect(() => {
    console.log("Datos iniciales recibidos en EditPatientForm:", initialData);
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({ ...initialData });
    }
  }, [initialData]);
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <Modal onClose={onClose}>
      <h2>Editar Paciente</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Identificación</label>
          <input
            type="text"
            name="identificacion"
            value={formData.identificacion}
            disabled // No se permite editar este campo
          />
        </div>
        <div className="form-field">
          <label>Primer Nombre</label>
          <input
            type="text"
            name="primerNombre"
            value={formData.primerNombre}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Apellido Paterno</label>
          <input
            type="text"
            name="apellidoParteno"
            value={formData.apellidoParteno}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Apellido Materno</label>
          <input
            type="text"
            name="apellidoMaterno"
            value={formData.apellidoMaterno}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Teléfono</label>
          <input
            type="text"
            name="telefonoPaciente"
            value={formData.telefonoPaciente}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Correo</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Sexo</label>
          <select
            name="sexo"
            value={formData.sexo}
            onChange={handleInputChange}
          >
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        <div className="form-field">
          <label>Estado Civil</label>
          <select
            name="estadoCivil"
            value={formData.estadoCivil}
            onChange={handleInputChange}
          >
            <option value="Sol">Soltero</option>
            <option value="Cas">Casado</option>
            <option value="Div">Divorciado</option>
            <option value="Viudo">Viudo</option>
          </select>
        </div>
        <div className="form-field">
          <label>Fecha de Nacimiento</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Nacionalidad</label>
          <input
            type="text"
            name="nacionalidad"
            value={formData.nacionalidad}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Grupo Cultural</label>
          <input
            type="text"
            name="grupoCultural"
            value={formData.grupoCultural}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Tipo de Seguro de Salud</label>
          <input
            type="text"
            name="tipoSeguroSalud"
            value={formData.tipoSeguroSalud}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Grupo Sanguíneo</label>
          <input
            type="text"
            name="grupoSanguineo"
            value={formData.grupoSanguineo}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Alergias</label>
          <textarea
            name="alergias"
            value={formData.alergias}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Observaciones</label>
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit" label="Guardar Cambios" className="primary" />
      </form>
    </Modal>
  );
};

export default EditPatientForm;
