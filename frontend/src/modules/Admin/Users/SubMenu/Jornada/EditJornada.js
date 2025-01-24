import React, { useState, useEffect } from 'react';
import Modal from '../../../../../components/common/Modal';
import Button from '../../../../../components/common/Button';
import { updateJornada } from '../../../../../utils/api';

const EditJornada = ({ onClose, initialData }) => {
  const [formData, setFormData] = useState({
    supervisor: '',
    fechaContratacion: '',
    fechaFinContratacion: '',
    inicioJornada: '',
    finJornada: '',
    Usuario_identificacion: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llama al método de actualización del backend
      const { idJornada, Usuario_identificacion } = formData;
      await updateJornada(idJornada, Usuario_identificacion, formData);
      alert('Jornada actualizada con éxito.');
      onClose();
    } catch (error) {
      console.error('Error al actualizar la jornada:', error);
      alert('Hubo un error al actualizar la jornada.');
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>Editar Jornada</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Supervisor</label>
          <input
            type="text"
            name="supervisor"
            value={formData.supervisor}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Fecha Contratación</label>
          <input
            type="date"
            name="fechaContratacion"
            value={formData.fechaContratacion}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Fecha Fin Contratación</label>
          <input
            type="date"
            name="fechaFinContratacion"
            value={formData.fechaFinContratacion}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Inicio Jornada</label>
          <input
            type="time"
            name="inicioJornada"
            value={formData.inicioJornada}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Fin Jornada</label>
          <input
            type="time"
            name="finJornada"
            value={formData.finJornada}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit" label="Guardar Cambios" className="primary" />
        <Button type="button" label="Cancelar" onClick={onClose} className="secondary" />
      </form>
    </Modal>
  );
};

export default EditJornada;
