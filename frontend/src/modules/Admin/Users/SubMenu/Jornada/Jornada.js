import React, { useState, useEffect } from 'react';
import Table from '../../../../../components/common/Table';
import Button from '../../../../../components/common/Button';
import SearchBar from '../../../../../components/common/SearchBar';
import AddJornada from './AddJornada';
import EditJornada from './EditJornada';
import { fetchJornadas, deleteJornada } from '../../../../../utils/api';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Jornada = () => {
  const [jornadas, setJornadas] = useState([]);
  const [filteredJornadas, setFilteredJornadas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentJornada, setCurrentJornada] = useState(null);

  useEffect(() => {
    const cargarJornadas = async () => {
      const data = await fetchJornadas();
      setJornadas(data);
      setFilteredJornadas(data);
    };
    cargarJornadas();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredJornadas(jornadas);
    } else {
      const filtered = jornadas.filter((jornada) =>
        jornada.supervisor.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredJornadas(filtered);
    }
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleEdit = (jornada) => {
    setCurrentJornada(jornada);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id, usuarioId) => {
    if (window.confirm('¿Estás seguro de eliminar esta jornada?')) {
      try {
        await deleteJornada(id, usuarioId);
        const data = await fetchJornadas();
        setJornadas(data);
        setFilteredJornadas(data);
      } catch (error) {
        console.error('Error al eliminar la jornada:', error);
        alert('Hubo un error al eliminar la jornada.');
      }
    }
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setCurrentJornada(null);
    fetchJornadas().then((data) => {
      setJornadas(data);
      setFilteredJornadas(data);
    });
  };

  const columns = [
    { label: 'ID', accessor: 'idJornada' },
    { label: 'Supervisor', accessor: 'supervisor' },
    { label: 'Inicio', accessor: 'inicioJornada' },
    { label: 'Fin', accessor: 'finJornada' },
    { label: 'Fecha Contratación', accessor: 'fechaContratacion' },
    { label: 'Fecha Fin Contratación', accessor: 'fechaFinContratacion' },
    {
      label: 'Acciones',
      accessor: 'acciones',
      render: (jornada) => (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <FaEdit
            onClick={() => handleEdit(jornada)}
            title="Editar jornada"
            style={{ cursor: 'pointer', color: '#ffc107' }}
          />
          <FaTrash
            onClick={() => handleDelete(jornada.idJornada, jornada.Usuario_identificacion)}
            title="Eliminar jornada"
            style={{ cursor: 'pointer', color: '#dc3545' }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="actions-row">
        <h2>Gestión de Jornada</h2>
        <SearchBar
          placeholder="Buscar por supervisor"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button label="Agregar Jornada" onClick={handleAdd} />
      </div>
      <Table columns={columns} data={filteredJornadas} />
      {isAddModalOpen && <AddJornada onClose={closeModal} />}
      {isEditModalOpen && currentJornada && (
        <EditJornada onClose={closeModal} initialData={currentJornada} />
      )}
    </div>
  );
};

export default Jornada;
