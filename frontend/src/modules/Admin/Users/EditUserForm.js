import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';

const EditUserForm = ({ onClose, onUpdate, initialData }) => {
  const [formData, setFormData] = useState({
    identificacion: '',
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    direccionDomicilio: '',
    telefono: '',
    sexo: '',
    correo: '',
    estadoCivil: '',
    especialidad: '',
    fotografia: null,
    consultorio: '',
    estado: '',
    rol: '',
    contraseña: '',
  });

  // Cargar datos iniciales al abrir el formulario
  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Blob = reader.result.split(',')[1];
        setFormData({ ...formData, fotografia: base64Blob });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <Modal onClose={onClose}>
      <h2>Editar Usuario</h2>
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
          <label>Nombres</label>
          <input
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Apellidos</label>
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleInputChange}
          />
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
          <label>Dirección</label>
          <input
            type="text"
            name="direccionDomicilio"
            value={formData.direccionDomicilio}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
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
          <label>Correo</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
          />
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
          <label>Especialidad</label>
          <input
            type="text"
            name="especialidad"
            value={formData.especialidad}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Fotografía</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="form-field">
          <label>Consultorio</label>
          <input
            type="text"
            name="consultorio"
            value={formData.consultorio}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Estado</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleInputChange}
          >
            <option value="Act">Activo</option>
            <option value="Ina">Inactivo</option>
          </select>
        </div>
        <div className="form-field">
          <label>Rol</label>
          <select
            name="rol"
            value={formData.rol}
            onChange={handleInputChange}
          >
            <option value="Doctor">Doctor</option>
            <option value="Admin">Administrador</option>
            <option value="Enfermera">Enfermera</option>
          </select>
        </div>
        <div className="form-field">
          <label>Contraseña</label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit" label="Guardar Cambios" className="primary" />
      </form>
    </Modal>
  );
};

export default EditUserForm;
