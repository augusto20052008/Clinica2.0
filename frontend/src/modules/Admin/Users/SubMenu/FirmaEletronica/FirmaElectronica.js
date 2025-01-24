import React, { useState, useEffect } from 'react';
import Table from '../../../../../components/common/Table';
import Button from '../../../../../components/common/Button';
import SearchBar from '../../../../../components/common/SearchBar';
import AddFirmaForm from './AddFirmaForm';
import EditFirmaForm from './EditFirmaForm';
import { fetchFirmas, deleteFirma } from '../../../../../utils/api';
import { FaEdit, FaTrash } from 'react-icons/fa';

const FirmaElectronica = () => {
  const [firmas, setFirmas] = useState([]);
  const [filteredFirmas, setFilteredFirmas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentFirma, setCurrentFirma] = useState(null);

  useEffect(() => {
    const cargarFirmas = async () => {
      const data = await fetchFirmas();
      setFirmas(data);
      setFilteredFirmas(data);
    };
    cargarFirmas();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredFirmas(firmas);
    } else {
      const filtered = firmas.filter((firma) =>
        firma.nombreCertificado.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredFirmas(filtered);
    }
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleEdit = (firma) => {
    setCurrentFirma(firma);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id, usuarioIdentificacion) => {
    if (window.confirm('¿Estás seguro de eliminar esta firma?')) {
      try {
        await deleteFirma(id, usuarioIdentificacion);
        alert('Firma eliminada con éxito.');
        const data = await fetchFirmas();
        setFirmas(data);
        setFilteredFirmas(data);
      } catch (error) {
        console.error('Error al eliminar la firma:', error);
        alert('Hubo un error al eliminar la firma.');
      }
    }
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setCurrentFirma(null);
    fetchFirmas().then((data) => {
      setFirmas(data);
      setFilteredFirmas(data);
    });
  };

  const columns = [
    { label: 'ID', accessor: 'idFirmaElectronica' },
    { label: 'Nombre', accessor: 'nombreCertificado' },
    { label: 'Serial', accessor: 'serialNumber' },
    { label: 'Válido Desde', accessor: 'validoDesde' },
    { label: 'Válido Hasta', accessor: 'validoHasta' },
    {
      label: 'Acciones',
      accessor: 'acciones',
      render: (firma) => (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <FaEdit
            onClick={() => handleEdit(firma)}
            title="Editar firma"
            style={{ cursor: 'pointer', color: '#ffc107' }}
          />
          <FaTrash
            onClick={() => handleDelete(firma.idFirmaElectronica, firma.Usuario_identificacion)}
            title="Eliminar firma"
            style={{ cursor: 'pointer', color: '#dc3545' }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="actions-row">
        <h2>Gestión de Firma Electronica</h2>
        <SearchBar
          placeholder="Buscar por nombre de certificado"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button label="Agregar Firma" onClick={handleAdd} />
      </div>
      <Table columns={columns} data={filteredFirmas} />
      {isAddModalOpen && <AddFirmaForm onClose={closeModal} onAdd={closeModal} />}
      {isEditModalOpen && currentFirma && (
        <EditFirmaForm onClose={closeModal} onUpdate={closeModal} initialData={currentFirma} />
      )}
    </div>
  );
};

export default FirmaElectronica;
