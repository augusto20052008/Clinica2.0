import React, { useState } from 'react';
import Modal from '../../../../../components/common/Modal';
import Button from '../../../../../components/common/Button';
import { createFirma } from '../../../../../utils/api';

const AddFirmaForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    nombreCertificado: '',
    serialNumber: '',
    validoDesde: '',
    validoHasta: '',
    clavePublica: '',
    archivoCertificado: '',
    Usuario_identificacion: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFirma(formData);
      onAdd(); 
      onClose();
    } catch (error) {
      console.error('Error al crear la firma:', error);
      alert('Error al crear la firma.');
    }
  };

  return (
    <Modal onClose={onClose}>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Nombre Certificado</label>
          <input
            type="text"
            name="nombreCertificado"
            value={formData.nombreCertificado}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Serial Number</label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Válido Desde</label>
          <input
            type="date"
            name="validoDesde"
            value={formData.validoDesde}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Válido Hasta</label>
          <input
            type="date"
            name="validoHasta"
            value={formData.validoHasta}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit" label="Guardar" className="primary" />
      </form>
    </Modal>
  );
};

export default AddFirmaForm;
