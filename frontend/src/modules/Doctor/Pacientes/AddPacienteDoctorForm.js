import React, { useState } from "react";
import Modal from "../../../components/common/Modal";
import Button from "../../../components/common/Button";

const AddPatientForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    identificacion: "",
    apellidoParteno: "",
    apellidoMaterno: "",
    primerNombre: "",
    segundoNombre: "",
    barrio: "",
    parroquia: "",
    canton: "",
    provincia: "",
    zona: "",
    telefonoPaciente: "",
    fechaNacimiento: "",
    lugarNacimiento: "",
    nacionalidad: "",
    grupoCultural: "",
    sexo: "M", 
    estadoCivil: "Sol", 
    instruccionUltimoAnioAprov: "",
    direccionPaciente: "",
    correo: "",
    fechaCreacion: new Date().toISOString().split("T")[0], 
    ocupacion: "",
    empresaTrabajo: "",
    tipoSeguroSalud: "",
    alergias: "",
    grupoSanguineo: "", 
    observaciones: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.identificacion) newErrors.identificacion = "La identificación es obligatoria.";
    if (!formData.primerNombre) newErrors.primerNombre = "El primer nombre es obligatorio.";
    if (!formData.apellidoParteno) newErrors.apellidoParteno = "El apellido paterno es obligatorio.";
    if (!formData.correo || !/\S+@\S+\.\S+/.test(formData.correo))
      newErrors.correo = "El correo electrónico no es válido.";
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria.";
    if (!formData.telefonoPaciente) newErrors.telefonoPaciente = "El teléfono es obligatorio.";
    if (!formData.grupoSanguineo) newErrors.grupoSanguineo = "El grupo sanguíneo es obligatorio.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onAdd(formData);
      onClose(); 
    } catch (error) {
      console.error("Error al agregar el paciente:", error);
      setErrors({ general: "Ocurrió un error al agregar el paciente. Intente nuevamente." });
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>Agregar Paciente</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Identificación</label>
          <input
            type="text"
            name="identificacion"
            value={formData.identificacion}
            onChange={handleInputChange}
          />
          {errors.identificacion && <span className="error">{errors.identificacion}</span>}
        </div>
        <div className="form-field">
          <label>Primer Nombre</label>
          <input
            type="text"
            name="primerNombre"
            value={formData.primerNombre}
            onChange={handleInputChange}
          />
          {errors.primerNombre && <span className="error">{errors.primerNombre}</span>}
        </div>
        <div className="form-field">
          <label>Apellido Paterno</label>
          <input
            type="text"
            name="apellidoParteno"
            value={formData.apellidoParteno}
            onChange={handleInputChange}
          />
          {errors.apellidoParteno && <span className="error">{errors.apellidoParteno}</span>}
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
          <label>Segundo Nombre</label>
          <input
            type="text"
            name="segundoNombre"
            value={formData.segundoNombre}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Barrio</label>
          <input
            type="text"
            name="barrio"
            value={formData.barrio}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Parroquia</label>
          <input
            type="text"
            name="parroquia"
            value={formData.parroquia}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Cantón</label>
          <input
            type="text"
            name="canton"
            value={formData.canton}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Provincia</label>
          <input
            type="text"
            name="provincia"
            value={formData.provincia}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Zona</label>
          <select
            name="zona"
            value={formData.zona}
            onChange={handleInputChange}
          >
            <option value="U">Urbano</option>
            <option value="R">Rural</option>
            </select>
        </div>

        <div className="form-field">
          <label>Teléfono</label>
          <input
            type="text"
            name="telefonoPaciente"
            value={formData.telefonoPaciente}
            onChange={handleInputChange}
          />
          {errors.telefonoPaciente && <span className="error">{errors.telefonoPaciente}</span>}
        </div>
        <div className="form-field">
          <label>Fecha de Nacimiento</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleInputChange}
          />
          {errors.fechaNacimiento && <span className="error">{errors.fechaNacimiento}</span>}
        </div>
        <div className="form-field">
          <label>Lugar de Nacimiento</label>
          <input
            type="text"
            name="lugarNacimiento"
            value={formData.lugarNacimiento}
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
          <label>Instrucción Último Año Aprobado</label>
          <input
            type="text"
            name="instruccionUltimoAnioAprov"
            value={formData.instruccionUltimoAnioAprov}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Dirección del Paciente</label>
          <input
            type="text"
            name="direccionPaciente"
            value={formData.direccionPaciente}
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
          <label>Ocupación</label>
          <input
            type="text"
            name="ocupacion"
            value={formData.ocupacion}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Empresa de Trabajo</label>
          <input
            type="text"
            name="empresaTrabajo"
            value={formData.empresaTrabajo}
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
          <label>Alergias</label>
          <textarea
            name="alergias"
            value={formData.alergias}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Grupo Sanguíneo</label>
          <select
            name="grupoSanguineo"
            value={formData.grupoSanguineo}
            onChange={handleInputChange}
          >
            <option value="">Seleccione</option>
            <option value="O-">O-</option>
            <option value="O+">O+</option>
            <option value="A−">A−</option>
            <option value="A+">A+</option>
            <option value="B−">B−</option>
            <option value="B+">B+</option>
            <option value="AB−">AB−</option>
            <option value="AB+">AB+</option>
          </select>
          {errors.grupoSanguineo && <span className="error">{errors.grupoSanguineo}</span>}
        </div>
        <div className="form-field">
          <label>Observaciones</label>
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit" label="Agregar Paciente" className="primary" />
      </form>
    </Modal>
  );
};

export default AddPatientForm;
