import React, { useState } from "react";
import Modal from "../../../components/common/Modal";
import Button from "../../../components/common/Button";
import "../../../styles/modules/Administrador/user/addUserForm.css";

const AddUserForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    identificacion: "",
    correo: "",
    contraseña: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    direccionDomicilio: "",
    telefono: "",
    sexo: "M",
    estadoCivil: "Sol",
    especialidad: "",
    fotografia: null,
    consultorio: "",
    estado: "Act",
    rol: "Doctor",
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("personal"); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Blob = reader.result.split(",")[1];
        setFormData({ ...formData, fotografia: base64Blob });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.identificacion) newErrors.identificacion = "La identificación es obligatoria.";
    if (!formData.correo || !/\S+@\S+\.\S+/.test(formData.correo))
      newErrors.correo = "El correo electrónico no es válido.";
    if (!formData.contraseña || formData.contraseña.length < 6)
      newErrors.contraseña = "La contraseña debe tener al menos 6 caracteres.";
    if (!formData.nombres) newErrors.nombres = "Los nombres son obligatorios.";
    if (!formData.apellidos) newErrors.apellidos = "Los apellidos son obligatorios.";
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria.";

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
      console.error("Error al agregar el usuario:", error);
      setErrors({ general: "Ocurrió un error al agregar el usuario. Intente nuevamente." });
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>Agregar Usuario</h2>
      <div className="tabs">
        <button
          className={activeTab === "personal" ? "active" : ""}
          onClick={() => setActiveTab("personal")}
        >
          Información Personal
        </button>
        <button
          className={activeTab === "contact" ? "active" : ""}
          onClick={() => setActiveTab("contact")}
        >
          Contacto
        </button>
        <button
          className={activeTab === "professional" ? "active" : ""}
          onClick={() => setActiveTab("professional")}
        >
          Información Profesional
        </button>
      </div>

      <form className="add-user-form" onSubmit={handleSubmit}>
        {activeTab === "personal" && (
          <div className="form-section">
            <h3>Información Personal</h3>
            <div className="form-group">
              <label>Identificación</label>
              <input
                type="text"
                name="identificacion"
                value={formData.identificacion}
                onChange={handleInputChange}
              />
              {errors.identificacion && <span className="error">{errors.identificacion}</span>}
            </div>
            <div className="form-group">
              <label>Correo</label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleInputChange}
              />
              {errors.correo && <span className="error">{errors.correo}</span>}
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleInputChange}
              />
              {errors.contraseña && <span className="error">{errors.contraseña}</span>}
            </div>
            <div className="form-group">
              <label>Nombres</label>
              <input
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleInputChange}
              />
              {errors.nombres && <span className="error">{errors.nombres}</span>}
            </div>
            <div className="form-group">
              <label>Apellidos</label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleInputChange}
              />
              {errors.apellidos && <span className="error">{errors.apellidos}</span>}
            </div>
            <div className="form-group">
              <label>Fecha de Nacimiento</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
              />
              {errors.fechaNacimiento && <span className="error">{errors.fechaNacimiento}</span>}
            </div>
            <div className="form-group">
              <label>Sexo</label>
              <select name="sexo" value={formData.sexo} onChange={handleInputChange}>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
            <div className="form-group">
              <label>Estado Civil</label>
              <select name="estadoCivil" value={formData.estadoCivil} onChange={handleInputChange}>
                <option value="Sol">Soltero</option>
                <option value="Cas">Casado</option>
                <option value="Div">Divorciado</option>
                <option value="Viudo">Viudo</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="form-section">
            <h3>Contacto</h3>
            <div className="form-group">
              <label>Dirección</label>
              <input
                type="text"
                name="direccionDomicilio"
                value={formData.direccionDomicilio}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        {activeTab === "professional" && (
          <div className="form-section">
            <h3>Información Profesional</h3>
            <div className="form-group">
              <label>Especialidad</label>
              <input
                type="text"
                name="especialidad"
                value={formData.especialidad}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Fotografía</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="form-group">
              <label>Consultorio</label>
              <input
                type="text"
                name="consultorio"
                value={formData.consultorio}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Estado</label>
              <select name="estado" value={formData.estado} onChange={handleInputChange}>
                <option value="Act">Activo</option>
                <option value="Ina">Inactivo</option>
              </select>
            </div>
            <div className="form-group">
              <label>Rol</label>
              <select name="rol" value={formData.rol} onChange={handleInputChange}>
                <option value="Doctor">Doctor</option>
                <option value="Admin">Administrador</option>
                <option value="Enfermera">Enfermera</option>
              </select>
            </div>
            <div className="form-actions">
              <Button type="submit" label="Agregar Usuario" className="primary" />
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default AddUserForm;
