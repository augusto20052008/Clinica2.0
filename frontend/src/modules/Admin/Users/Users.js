import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import SearchBar from '../../../components/common/SearchBar';
import FilterDropdown from '../../../components/common/FilterDropdown';
import Pagination from '../../../components/common/Pagination';
import Table from '../../../components/common/Table';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import UserProfileModal from './UserProfileModal';
import '../../../styles/modules/Administrador/user/users.css';
import Button from '../../../components/common/Button';
import { fetchUsers, fetchUserDetails, removeUser, createUser, updateUser } from '../../../utils/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({ estado: '', rol: '' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedUser, setExpandedUser] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUsers();
        if (response && response.data && Array.isArray(response.data)) {
          setUsers(response.data);
          setFilteredUsers(response.data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        setUsers([]);
      }
    };
    loadUsers();
  }, []);

  const handleExpandUser = async (identificacion) => {
    try {
      const userDetails = await fetchUserDetails(identificacion);
      setExpandedUser(userDetails);
    } catch (error) {
      console.error('Error al obtener detalles del usuario:', error);
    }
  };

  const handleEditUser = async (identificacion) => {
    try {
      const userDetails = await fetchUserDetails(identificacion);
      console.log(userDetails);
      setCurrentEditUser(userDetails);
      setIsEditUserModalOpen(true);
    } catch (error) {
      console.error('Error al obtener detalles del usuario para editar:', error);
    }
  };

  const handleClose = () => {
    setIsEditUserModalOpen(false);
    setCurrentEditUser(null);
  };

  const handleDeleteUser = async (identificacion) => {
    // Confirmación antes de eliminar
    if (!window.confirm(`¿Estás seguro de que deseas eliminar al usuario con identificación ${identificacion}?`)) {
      return; // No procede si el usuario cancela la acción
    }
    try {
      // Llamada a la API para eliminar el usuario
      await removeUser(identificacion);
  
      // Actualizar el estado eliminando el usuario de la lista
      setUsers((prevUsers) => prevUsers.filter((user) => user.identificacion !== identificacion));
      setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.identificacion !== identificacion));
  
      alert('Usuario eliminado correctamente.');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('No se pudo eliminar el usuario. Por favor, inténtalo de nuevo.');
    }
  };
  

  const handleAddUser = async (newUser) => {
    try {
      const addedUser = await createUser(newUser);
      setUsers((prevUsers) => [addedUser, ...prevUsers]);
      setFilteredUsers((prevUsers) => [addedUser, ...prevUsers]);
      setIsAddUserModalOpen(false);
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await updateUser(updatedUser.identificacion, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.identificacion === updatedUser.identificacion ? updatedUser : user
        )
      );
      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.identificacion === updatedUser.identificacion ? updatedUser : user
        )
      );
      setIsEditUserModalOpen(false);
      alert('Usuario actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    const lowercasedValue = value.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.identificacion.toLowerCase().includes(lowercasedValue) ||
        user.nombres.toLowerCase().includes(lowercasedValue)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [key]: value };
      const filtered = users.filter((user) => {
        const matchEstado = !updatedFilters.estado || user.estado === updatedFilters.estado;
        const matchRol = !updatedFilters.rol || user.rol === updatedFilters.rol;
        return matchEstado && matchRol;
      });
      setFilteredUsers(filtered);
      setCurrentPage(1);
      return updatedFilters;
    });
  };

  const clearFilters = () => {
    setFilters({ estado: '', rol: '' });
    setFilteredUsers(users);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="users-container">
      <div className="actions-container">
        <div className="actions-row">
          <h2 className="title">Gestión de Usuarios</h2>
          <SearchBar
            placeholder="Buscar por nombre o cédula"
            value={searchValue}
            onChange={handleSearch}
          />
          <FilterDropdown
            isOpen={isFilterOpen}
            toggle={() => setIsFilterOpen((prev) => !prev)}
            filters={filters}
            setFilters={handleFilterChange}
            options={[
              { key: 'estado', label: 'Estado', values: ['Act', 'Ina', 'Sus'] },
              { key: 'rol', label: 'Rol', values: ['Doctor', 'Admin', 'Enfermera'] },
            ]}
          />
          <Button label="Quitar Filtros" onClick={clearFilters} className="secondary" />
          <Button label="Agregar Usuario" onClick={() => setIsAddUserModalOpen(true)} className="primary" />
        </div>
      </div>

      <Table
        columns={[
          { label: 'Identificación', accessor: 'identificacion' },
          { label: 'Nombres', accessor: 'nombres' },
          { label: 'Apellidos', accessor: 'apellidos' },
          { label: 'Correo', accessor: 'correo' },
          { label: 'Rol', accessor: 'rol' },
          { label: 'Estado', accessor: 'estado' },
          {
            label: 'Acción',
            accessor: 'acciones',
            render: (user) => (
              <div className="action-buttons" style={{ display: "flex", gap: "10px" }}>
                <FaEye
                  className="icon-view"
                  onClick={() => handleExpandUser(user.identificacion)}
                  title="Ver detalles"
                  style={{ cursor: "pointer", color: "#007bff" }}
                />
                <FaEdit
                  className="icon-edit"
                  onClick={() => handleEditUser(user.identificacion)}
                  title="Editar usuario"
                  style={{ cursor: "pointer", color: "#ffc107" }}
                />
                <FaTrash
                  className="icon-delete"
                  onClick={() => handleDeleteUser(user.identificacion)}
                  title="Eliminar usuario"
                  style={{ cursor: "pointer", color: "#dc3545" }} 
                />
              </div>
            ),
          },
        ]}
        data={paginatedUsers}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {expandedUser && (
        <UserProfileModal
          userId={expandedUser.identificacion}
          onClose={() => setExpandedUser(null)}
        />
      )}

      {isAddUserModalOpen && (
        <AddUserForm
          onClose={() => setIsAddUserModalOpen(false)}
          onAdd={handleAddUser}
        />
      )}

      {isEditUserModalOpen && currentEditUser && (
        <EditUserForm
          onClose={handleClose}
          onUpdate={handleUpdateUser}
          initialData={currentEditUser} // Pasa los datos al formulario
        />
      )}

    </div>
  );
};

export default Users;
