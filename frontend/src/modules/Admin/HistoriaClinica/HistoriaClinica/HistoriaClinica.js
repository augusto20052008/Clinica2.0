import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Input, Space, Popconfirm, notification, DatePicker, Typography } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchHistoriaClinica, deleteHistoriaClinica } from "../../../../utils/api";
import AddHistoriaClinica from "./AddHistoriaClinica";
import EditHistoriaClinica from "./EditHistoriaClinica";
import HistoriaClinicaProfile from "./HistoriaClinicaProfile";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

const { Title } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

const HistoriaClinica = () => {
  const [historias, setHistorias] = useState([]);
  const [filteredHistorias, setFilteredHistorias] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editingHistoria, setEditingHistoria] = useState(null);
  const [viewingHistoria, setViewingHistoria] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [sortRecent, setSortRecent] = useState(false);
  const itemsPerPage = 6; // Cambiado a 6 elementos por página

  useEffect(() => {
    loadHistorias();
  }, []);

  const loadHistorias = async () => {
    try {
      const data = await fetchHistoriaClinica();
      setHistorias(data);
      setFilteredHistorias(data);
    } catch (error) {
      console.error("Error al cargar historias clínicas:", error);
      notification.error({
        message: "Error",
        description: "No se pudo cargar la lista de historias clínicas.",
      });
    }
  };

  const handleSearch = useCallback(() => {
    let filtered = historias;
  
    // Filtrar por búsqueda
    if (searchValue) {
      filtered = filtered.filter((historia) =>
        historia.nro_identificacion.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  
    // Filtrar por rango de fechas
    if (dateRange) {
      const [start, end] = dateRange;
      filtered = filtered.filter((historia) => {
        const fecha = dayjs(historia.fecha_creacion);
        return fecha.isAfter(start) && fecha.isBefore(end);
      });
    }
  
    // Ordenar por los más recientes o antiguos
    filtered = [...filtered].sort((a, b) =>
      sortRecent
        ? new Date(b.fecha_creacion) - new Date(a.fecha_creacion) // Más recientes primero
        : new Date(a.fecha_creacion) - new Date(b.fecha_creacion) // Más antiguos primero
    );
  
    setFilteredHistorias(filtered);
    setCurrentPage(1); // Reiniciar a la primera página
  }, [historias, searchValue, dateRange, sortRecent]);
  
  useEffect(() => {
    handleSearch();
  }, [searchValue, dateRange, sortRecent, handleSearch]);

  const handleDelete = async (nroArchivo) => {
    try {
      await deleteHistoriaClinica(nroArchivo);
      notification.success({
        message: "Historia clínica eliminada",
        description: `La historia clínica con número ${nroArchivo} fue eliminada correctamente.`,
      });
      loadHistorias();
    } catch (error) {
      console.error("Error al eliminar historia clínica:", error);
      notification.error({
        message: "Error",
        description: "No se pudo eliminar la historia clínica.",
      });
    }
  };

  const columns = [
    {
      title: "Número de Archivo",
      dataIndex: "nro_archivo",
      key: "nro_archivo",
      render: (text) => text.toString().padStart(6, "0"),
    },
    {
      title: "Identificación del Paciente",
      dataIndex: "nro_identificacion",
      key: "nro_identificacion",
    },
    {
      title: "Fecha de Creación",
      dataIndex: "fecha_creacion",
      key: "fecha_creacion",
      render: (text) => dayjs(text).format("dddd, MMMM D, YYYY, h:mm:ss A"),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setViewingHistoria(record);
              setIsProfileModalOpen(true);
            }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingHistoria(record);
              setIsEditModalOpen(true);
            }}
          />
          <Popconfirm
            title="¿Estás seguro de eliminar esta historia clínica?"
            onConfirm={() => handleDelete(record.nro_archivo)}
            okText="Sí"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const paginatedData = filteredHistorias.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {/* Título de la página */}
      <Title level={2} style={{ marginBottom: 24 }}>
        Lista de Historia Clínica
      </Title>
      <Space style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <Search
          placeholder="Buscar por paciente"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 300 }}
        />
        <RangePicker
          onChange={(dates) =>
            setDateRange(dates ? [dates[0].startOf("day"), dates[1].endOf("day")] : null)
          }
        />
        <Button type="default" onClick={() => setSortRecent(!sortRecent)}>
          {sortRecent ? "Ordenar: Antiguos" : "Ordenar: Recientes"}
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Agregar Historia Clínica
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={paginatedData}
        rowKey="nro_archivo"
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: filteredHistorias.length,
          onChange: (page) => setCurrentPage(page),
        }}
      />
      <AddHistoriaClinica
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onHistoriaAdded={loadHistorias}
      />
      <EditHistoriaClinica
        visible={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        historia={editingHistoria}
        onHistoriaUpdated={loadHistorias}
      />
      <HistoriaClinicaProfile
        visible={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        historia={viewingHistoria}
      />
    </div>
  );
};

export default HistoriaClinica;
