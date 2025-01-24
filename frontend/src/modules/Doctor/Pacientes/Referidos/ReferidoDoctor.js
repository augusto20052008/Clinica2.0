import React, { useEffect, useState } from 'react';
import { fetchReferidos, createReferido, updateReferido, deleteReferido, fetchReferidoById } from '../../../../utils/api';
import SearchBar from '../../../../components/common/SearchBar';
import Table from '../../../../components/common/Table';
import Button from '../../../../components/common/Button';
import AddReferidoDoctor from './AddReferidoDoctor';
import EditReferidoDoctor from './EditReferidoDoctor';
import ReferidoProfileDoctor from './ReferidoProfileDoctor';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

function ReferidoDoctor() {
  const [referidos, setReferidos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentReferido, setCurrentReferido] = useState(null);
  const [notification, setNotification] = useState('');

  const loadReferidos = async () => {
    try {
      setLoading(true);
      const data = await fetchReferidos();
      setReferidos(data);
    } catch (error) {
      console.error('Error al cargar referidos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReferidos();
  }, []);

  const handleAddReferido = async (newReferido) => {
    try {
      await createReferido(newReferido);
      loadReferidos();
    } catch (error) {
      console.error('Error al agregar referido:', error);
    }
  };

  const handleEditReferido = async (updatedReferido) => {
    try {
      const { idReferido, Paciente_identificacion } = updatedReferido;
      await updateReferido(idReferido, Paciente_identificacion, updatedReferido);
      loadReferidos();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error al actualizar referido:', error);
    }
  };

  const handleDeleteReferido = async (idReferido, Paciente_identificacion) => {
    try {
      await deleteReferido(idReferido, Paciente_identificacion);
      setNotification('Referido eliminado correctamente.');
      loadReferidos();
      setTimeout(() => setNotification(''), 3000); // Limpia la notificación después de 3 segundos
    } catch (error) {
      console.error('Error al eliminar referido:', error);
    }
  };

  const handleViewReferido = async (idReferido, Paciente_identificacion) => {
    try {
      const referido = await fetchReferidoById(idReferido, Paciente_identificacion);
      setCurrentReferido(referido);
      setShowViewModal(true);
    } catch (error) {
      console.error('Error al cargar detalles del referido:', error);
    }
  };

  const handleOpenEditModal = (referido) => {
    setCurrentReferido(referido);
    setShowEditModal(true);
  };

  const filteredReferidos = referidos.filter((referido) => {
    const term = searchTerm.toLowerCase();
    return (
      referido.nombreReferido.toLowerCase().includes(term) ||
      referido.Paciente_identificacion.toLowerCase().includes(term)
    );
  });

  const columns = [
    { label: 'ID Referido', accessor: 'idReferido' },
    { label: 'Nombre', accessor: 'nombreReferido' },
    { label: 'Parentesco', accessor: 'parentescoReferido' },
    { label: 'Dirección', accessor: 'direccionReferido' },
    { label: 'Identificación', accessor: 'Paciente_identificacion' },
    {
      label: 'Acciones',
      accessor: 'acciones',
      render: (row) => (
        <div>
          <FaEye
            className="icon-view"
            onClick={() => handleViewReferido(row.idReferido, row.Paciente_identificacion)}
            title="Ver detalles"
            style={{ cursor: 'pointer', color: '#007bff', marginRight: '8px' }}
          />
          <FaEdit
            className="icon-edit"
            onClick={() => handleOpenEditModal(row)}
            title="Editar referido"
            style={{ cursor: 'pointer', color: '#ffc107', marginRight: '8px' }}
          />
          <FaTrash
            className="icon-delete"
            onClick={() => handleDeleteReferido(row.idReferido, row.Paciente_identificacion)}
            title="Eliminar referido"
            style={{ cursor: 'pointer', color: '#dc3545' }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className='actions-row'>
        <h2>Gestión de Referidos</h2>
        {notification && <p className="notification">{notification}</p>}
        <SearchBar
          placeholder="Buscar por Identificación o Nombre del Referido"
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <Button label="Agregar Referido" onClick={() => setShowAddModal(true)} />
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Table columns={columns} data={filteredReferidos} />
      )}
      {showAddModal && (
        <AddReferidoDoctor
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddReferido}
        />
      )}
      {showEditModal && (
        <EditReferidoDoctor
          onClose={() => setShowEditModal(false)}
          onUpdate={handleEditReferido}
          initialData={currentReferido}
        />
      )}
      {showViewModal && currentReferido && (
        <ReferidoProfileDoctor
          referido={currentReferido}
          onClose={() => setShowViewModal(false)}
        />
      )}
    </div>
  );
}

export default ReferidoDoctor;
