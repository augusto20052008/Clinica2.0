import React, { useState, useEffect } from 'react';
import Modal from '../../../../components/common/Modal';
import Button from '../../../../components/common/Button';

const EditReferido = ({ onClose, onUpdate, initialData }) => {
  const [formData, setFormData] = useState({
    nombreReferido: '',
    parentescoReferido: '',
    direccionReferido: '',
    telefonoReferido: '',
    Paciente_identificacion: '',
  });

  useEffect(() => {
    if (initialData) {
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
      <h2>Editar Referido</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombreReferido"
            value={formData.nombreReferido}
            onChange={handleInputChange}
          />
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
            disabled
          />
        </div>
        <Button type="submit" label="Guardar Cambios" className="primary" />
      </form>
    </Modal>
  );
};

export default EditReferido;
