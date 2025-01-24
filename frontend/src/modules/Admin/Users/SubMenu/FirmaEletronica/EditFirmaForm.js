import React, { useState, useEffect } from 'react';
import Modal from '../../../../../components/common/Modal';
import Button from '../../../../../components/common/Button';
import { updateFirma, fetchFirmas } from '../../../../../utils/api';

const EditFirmaForm = ({ onClose, onUpdate, initialData }) => {
  const [formData, setFormData] = useState({
    nombreCertificado: '',
    serialNumber: '',
    validoDesde: '',
    validoHasta: '',
    clavePublica: '',
    archivoCertificado: '',
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
      await updateFirma(formData.idFirmaElectronica, formData);
      const updatedFirmas = await fetchFirmas();
      onUpdate(updatedFirmas);
      onClose();
    } catch (error) {
      console.error('Error al actualizar la firma:', error);
      alert('Error al actualizar la firma.');
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
        <Button type="submit" label="Actualizar" className="primary" />
      </form>
    </Modal>
  );
};

export default EditFirmaForm;
