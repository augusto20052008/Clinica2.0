import React, { useState } from 'react';
import Modal from '../../../../components/common/Modal';
import Button from '../../../../components/common/Button';

const AddReferido = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    nombreReferido: '',
    parentescoReferido: '',
    direccionReferido: '',
    telefonoReferido: '',
    Paciente_identificacion: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombreReferido) newErrors.nombreReferido = 'El nombre es obligatorio.';
    if (!formData.Paciente_identificacion) newErrors.Paciente_identificacion = 'La identificación del paciente es obligatoria.';
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
      console.error('Error al agregar el referido:', error);
      setErrors({ general: 'Ocurrió un error al agregar el referido. Intente nuevamente.' });
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>Agregar Referido</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del Referido</label>
          <input
            type="text"
            name="nombreReferido"
            value={formData.nombreReferido}
            onChange={handleInputChange}
          />
          {errors.nombreReferido && <span className="error">{errors.nombreReferido}</span>}
        </div>
        <div className="form-group">
          <label>Parentesco</label>
          <input
            type="text"
            name="parentescoReferido"
            value={formData.parentescoReferido}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            name="direccionReferido"
            value={formData.direccionReferido}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="text"
            name="telefonoReferido"
            value={formData.telefonoReferido}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Identificación del Paciente</label>
          <input
            type="text"
            name="Paciente_identificacion"
            value={formData.Paciente_identificacion}
            onChange={handleInputChange}
          />
          {errors.Paciente_identificacion && <span className="error">{errors.Paciente_identificacion}</span>}
        </div>
        <div className="form-actions">
          <Button label="Agregar Referido" type="submit" />
        </div>
      </form>
    </Modal>
  );
};

export default AddReferido;
