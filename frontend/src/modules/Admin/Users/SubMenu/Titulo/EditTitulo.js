import React, { useState, useEffect } from 'react';
import Modal from '../../../../../components/common/Modal';
import Button from '../../../../../components/common/Button';
import { updateTitulo } from '../../../../../utils/api';

const EditTitulo = ({ onClose, initialData }) => {
  const [formData, setFormData] = useState({
    nombreTitulo: '',
    institucionEducacionSuperior: '',
    tipoTitulo: '',
    reconocidoPor: '',
    numeroRegistro: '',
    fechaRegistro: '',
    areaConocimiento: '',
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
      const { idTitulo, Usuario_identificacion } = formData;
      await updateTitulo(idTitulo, Usuario_identificacion, formData);
      alert('Título actualizado con éxito.');
      onClose();
    } catch (error) {
      console.error('Error al actualizar el título:', error);
      alert('Hubo un error al actualizar el título.');
    }
  };
  
  return (
    <Modal onClose={onClose}>
      <h2>Editar Título</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Nombre del Título</label>
          <input
            type="text"
            name="nombreTitulo"
            value={formData.nombreTitulo}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Institución de Educación Superior</label>
          <input
            type="text"
            name="institucionEducacionSuperior"
            value={formData.institucionEducacionSuperior}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Tipo de Título</label>
          <input
            type="text"
            name="tipoTitulo"
            value={formData.tipoTitulo}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Reconocido Por</label>
          <input
            type="text"
            name="reconocidoPor"
            value={formData.reconocidoPor}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Número de Registro</label>
          <input
            type="text"
            name="numeroRegistro"
            value={formData.numeroRegistro}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Fecha de Registro</label>
          <input
            type="date"
            name="fechaRegistro"
            value={formData.fechaRegistro}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label>Área de Conocimiento</label>
          <input
            type="text"
            name="areaConocimiento"
            value={formData.areaConocimiento}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit" label="Guardar Cambios" className="primary" />
        <Button type="button" label="Cancelar" onClick={onClose} className="secondary" />
      </form>
    </Modal>
  );
};

export default EditTitulo;
