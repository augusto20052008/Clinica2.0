import React from 'react';
import Modal from '../../../../components/common/Modal';

const ReferidoProfile = ({ referido, onClose }) => {
  return (
    <Modal onClose={onClose} title="Detalles del Referido">
      <div className="form-group">
        <label><strong>Nombre:</strong></label>
        <p>{referido.nombreReferido}</p>
      </div>
      <div className="form-group">
        <label><strong>Parentesco:</strong></label>
        <p>{referido.parentescoReferido}</p>
      </div>
      <div className="form-group">
        <label><strong>Dirección:</strong></label>
        <p>{referido.direccionReferido}</p>
      </div>
      <div className="form-group">
        <label><strong>Teléfono:</strong></label>
        <p>{referido.telefonoReferido}</p>
      </div>
      <div className="form-group">
        <label><strong>Identificación del Paciente:</strong></label>
        <p>{referido.Paciente_identificacion}</p>
      </div>
    </Modal>
  );
};

export default ReferidoProfile;
