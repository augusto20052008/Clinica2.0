import React, { useState } from 'react';
import Modal from '../../../../../components/common/Modal';
import Button from '../../../../../components/common/Button';
import { createJornada } from '../../../../../utils/api';

const AddJornada = ({ onClose }) => {
  const [formData, setFormData] = useState({
    supervisor: '',
    fechaContratacion: '',
    fechaFinContratacion: '',
    inicioJornada: '',
    finJornada: '',
    Usuario_identificacion: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJornada(formData);
      alert('Jornada creada con éxito.');
      onClose();
    } catch (error) {
      console.error('Error al crear la jornada:', error);
      alert('Hubo un error al crear la jornada.');
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>Agregar Jornada</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Supervisor</label>
          <input name="supervisor" value={formData.supervisor} onChange={handleInputChange} />
        </div>
        {/* Agregar más campos aquí */}
        <Button type="submit" label="Guardar" />
        <Button type="button" label="Cancelar" onClick={onClose} />
      </form>
    </Modal>
  );
};

export default AddJornada;
