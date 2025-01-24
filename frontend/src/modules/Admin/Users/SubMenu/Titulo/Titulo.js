import React, { useState, useEffect } from 'react';
import Table from '../../../../../components/common/Table';
import Button from '../../../../../components/common/Button';
import SearchBar from '../../../../../components/common/SearchBar';
import AddTitulo from './AddTitulo';
import EditTitulo from './EditTitulo';
import { fetchTitulos, deleteTitulo } from '../../../../../utils/api';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Titulo = () => {
  const [titulos, setTitulos] = useState([]);
  const [filteredTitulos, setFilteredTitulos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTitulo, setCurrentTitulo] = useState(null);

  useEffect(() => {
    const cargarTitulos = async () => {
      try {
        const data = await fetchTitulos();
        setTitulos(data);
        setFilteredTitulos(data);
      } catch (error) {
        console.error('Error al cargar los títulos:', error);
      }
    };
    cargarTitulos();
  }, []);
  
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredTitulos(titulos);
    } else {
      const filtered = titulos.filter((titulo) =>
        titulo.nombreTitulo.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredTitulos(filtered);
    }
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleEdit = (titulo) => {
    setCurrentTitulo(titulo);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (idTitulo, usuarioIdentificacion) => {
    if (window.confirm('¿Estás seguro de eliminar este título?')) {
      try {
        await deleteTitulo(idTitulo, usuarioIdentificacion);
        alert('Título eliminado con éxito.');
        const data = await fetchTitulos();  
        setTitulos(data);
        setFilteredTitulos(data);
      } catch (error) {
        console.error('Error al eliminar el título:', error);
        alert('Hubo un error al eliminar el título.');
      }
    }
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setCurrentTitulo(null);
    fetchTitulos().then((data) => {
      setTitulos(data);
      setFilteredTitulos(data);
    });
  };

  const columns = [
    { label: 'ID', accessor: 'idTitulo' },
    { label: 'Nombre', accessor: 'nombreTitulo' },
    { label: 'Institución', accessor: 'institucionEducacionSuperior' },
    { label: 'Tipo', accessor: 'tipoTitulo' },
    { label: 'Registro', accessor: 'numeroRegistro' },
    {
      label: 'Acciones',
      accessor: 'acciones',
      render: (titulo) => (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <FaEdit
            onClick={() => handleEdit(titulo)}
            title="Editar título"
            style={{ cursor: 'pointer', color: '#ffc107' }}
          />
          <FaTrash
            onClick={() => handleDelete(titulo.idTitulo, titulo.Usuario_identificacion)}
            title="Eliminar título"
            style={{ cursor: 'pointer', color: '#dc3545' }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="actions-row">
        <h2>Gestión de Título</h2>
        <SearchBar
          placeholder="Buscar por nombre de título"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button label="Agregar Título" onClick={handleAdd} />
      </div>
      <Table columns={columns} data={filteredTitulos} />
      {isAddModalOpen && <AddTitulo onClose={closeModal} />}
      {isEditModalOpen && currentTitulo && (
        <EditTitulo onClose={closeModal} initialData={currentTitulo} />
      )}
    </div>
  );
};

export default Titulo;
