import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';
import '../../../styles/modules/Administrador/user/userProfileModal.css';
import { fetchUserDetails } from '../../../utils/api';

const UserProfileModal = ({ userId, onClose }) => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchUserDetails(userId); // Cambiamos id a userId para usar identificación
        setFormData(response);
      } catch (error) {
        console.error("Error al obtener detalles del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchDetails();
    }
  }, [userId]);

  if (loading) return <p>Cargando...</p>;
  if (!formData) return <p>No se encontraron datos del usuario.</p>;

  return (
    <Modal onClose={onClose}>
      <div className="modal-header">
        <h2>Detalles del Usuario</h2>
      </div>
      <div className="user-details">
        <p><strong>Identificación:</strong> {formData.identificacion}</p>
        <p><strong>Nombres:</strong> {formData.nombres}</p>
        <p><strong>Apellidos:</strong> {formData.apellidos}</p>
        <p><strong>Correo:</strong> {formData.correo}</p>
        <p><strong>Rol:</strong> {formData.rol}</p>
        <p><strong>Estado:</strong> {formData.estado}</p>
        <p><strong>Fecha de Nacimiento:</strong> {formData.fechaNacimiento ? new Date(formData.fechaNacimiento).toLocaleDateString() : 'No especificada'}</p>
        <p><strong>Teléfono:</strong> {formData.telefono || 'No especificado'}</p>
        <p><strong>Dirección:</strong> {formData.direccionDomicilio || 'No especificada'}</p>
        <p><strong>Especialidad:</strong> {formData.especialidad || 'No especificada'}</p>
        <p><strong>Consultorio:</strong> {formData.consultorio || 'No especificado'}</p>
        <p><strong>Sexo:</strong> {formData.sexo === 'M' ? 'Masculino' : 'Femenino'}</p>
        <p><strong>Estado Civil:</strong> {formData.estadoCivil || 'No especificado'}</p>
        <p>
          <strong>Fotografía:</strong>{' '}
          {formData.fotografia ? (
            <img src={formData.fotografia} alt="Fotografía del usuario" />
          ) : (
            'No disponible'
          )}
        </p>
      </div>
    </Modal>
  );
};

export default UserProfileModal;
