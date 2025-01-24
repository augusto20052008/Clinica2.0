import React, { useState } from 'react';
import Modal from '../../../../../components/common/Modal';
import Button from '../../../../../components/common/Button';
import { createTitulo } from '../../../../../utils/api';

const AddTitulo = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombreTitulo: '',
    institucionEducacionSuperior: '',
    tipoTitulo: '',
    reconocidoPor: '',
    numeroRegistro: '',
    fechaRegistro: '',
    areaConocimiento: '',
    Usuario_identificacion: '', // Este campo es obligatorio para el backend
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple en el frontend
    if (!formData.Usuario_identificacion || !formData.nombreTitulo) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      await createTitulo(formData); // Enviar los datos al backend
      alert('Título creado con éxito.');
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error al crear el título:', error);
      alert('Hubo un error al crear el título.');
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>Agregar Título</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Título *</label>
          <input
            name="nombreTitulo"
            value={formData.nombreTitulo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Institución de Educación Superior</label>
          <input
            name="institucionEducacionSuperior"
            value={formData.institucionEducacionSuperior}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Tipo de Título</label>
          <input
            name="tipoTitulo"
            value={formData.tipoTitulo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Reconocido Por</label>
          <input
            name="reconocidoPor"
            value={formData.reconocidoPor}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Número de Registro</label>
          <input
            name="numeroRegistro"
            value={formData.numeroRegistro}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Fecha de Registro</label>
          <input
            name="fechaRegistro"
            type="date"
            value={formData.fechaRegistro}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Área de Conocimiento</label>
          <input
            name="areaConocimiento"
            value={formData.areaConocimiento}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Identificación del Usuario *</label>
          <input
            name="Usuario_identificacion"
            value={formData.Usuario_identificacion}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="submit" label="Guardar" />
        <Button type="button" label="Cancelar" onClick={onClose} />
      </form>
    </Modal>
  );
};

export default AddTitulo;
