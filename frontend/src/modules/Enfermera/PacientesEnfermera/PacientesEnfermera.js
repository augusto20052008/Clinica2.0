import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Input, Space, Select, Popconfirm, notification, Typography } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchPatients, deletePatient } from "../../../utils/api";
import dayjs from "dayjs";
import AddPatientModal from "./AddPatientModal";
import EditPatientForm from "./EditPatientForm";
import PatientDetailsView from "./PatientDetailsView"; 

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

const Patients = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [allPatients, setAllPatients] = useState([]);
    const [displayedPatients, setDisplayedPatients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [genderFilter, setGenderFilter] = useState(null);
    const [idTypeFilter, setIdTypeFilter] = useState(null);
    const [editingPatient, setEditingPatient] = useState(null);
    const [activeView, setActiveView] = useState("list"); // Estado para alternar vistas
    const [selectedPatient, setSelectedPatient] = useState(null); // Paciente seleccionado
    const itemsPerPage = 6;

    const loadPatients = async () => {
        try {
            const data = await fetchPatients();
            setAllPatients(data);
            setDisplayedPatients(data.slice(0, itemsPerPage));
        } catch (error) {
            console.error("Error al cargar pacientes:", error);
            notification.error({
                message: "Error",
                description: "No se pudo cargar la lista de pacientes.",
            });
        }
    };

    useEffect(() => {
        loadPatients();
    }, []);

    const applyFilters = useCallback(() => {
        let filtered = allPatients;

        if (searchValue) {
            filtered = filtered.filter((patient) =>
                patient.primer_nombre.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        if (genderFilter) {
            filtered = filtered.filter((patient) => patient.genero === genderFilter);
        }

        if (idTypeFilter) {
            filtered = filtered.filter((patient) => patient.tipo_identificacion === idTypeFilter);
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedPatients(filtered.slice(startIndex, endIndex));
    }, [allPatients, searchValue, genderFilter, idTypeFilter, currentPage, itemsPerPage]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDelete = async (id) => {
        try {
            await deletePatient(id);
            notification.success({
                message: "Paciente eliminado",
                description: `El paciente con ID ${id} fue eliminado correctamente.`,
            });
            loadPatients();
        } catch (error) {
            console.error("Error al eliminar paciente:", error);
            notification.error({
                message: "Error",
                description: error.message || "No se pudo eliminar el paciente.",
            });
        }
    };

    const handlePatientAdded = () => {
        loadPatients();
        setIsAddModalOpen(false);
    };

    const handleViewDetails = (patient) => {
        setSelectedPatient(patient);
        setActiveView("details");
    };

    const columns = [
        {
            title: "Identificación",
            dataIndex: "nro_identificacion",
            key: "nro_identificacion",
        },
        {
            title: "Tipo Identificación",
            dataIndex: "tipo_identificacion",
            key: "tipo_identificacion",
        },
        {
            title: "Primer Nombre",
            dataIndex: "primer_nombre",
            key: "primer_nombre",
        },
        {
            title: "Primer Apellido",
            dataIndex: "primer_apellido",
            key: "primer_apellido",
        },
        {
            title: "Género",
            dataIndex: "genero",
            key: "genero",
        },
        {
            title: "Fecha de Nacimiento",
            dataIndex: "fecha_nacimiento",
            key: "fecha_nacimiento",
            render: (text) => dayjs(text).format("YYYY-MM-DD"),
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<EyeOutlined />}
                        onClick={() => handleViewDetails(record)}
                    />
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            setEditingPatient(record);
                            setIsEditModalOpen(true);
                        }}
                    />
                    <Popconfirm
                        title="¿Estás seguro de eliminar este paciente?"
                        onConfirm={() => handleDelete(record.nro_identificacion)}
                        okText="Sí"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            {activeView === "list" ? (
                <>
                    {/* Título principal */}
                    <Title level={2} style={{ marginBottom: 24 }}>
                        Lista de Pacientes
                    </Title>

                    {/* Filtros y acciones */}
                    <Space
                        style={{
                            marginBottom: 20,
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Search
                            placeholder="Buscar pacientes por nombre"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            style={{ width: 300 }}
                        />
                        <Select
                            placeholder="Filtrar por género"
                            value={genderFilter}
                            onChange={(value) => setGenderFilter(value)}
                            allowClear
                            style={{ width: 150 }}
                        >
                            <Option value="M">Masculino</Option>
                            <Option value="F">Femenino</Option>
                            <Option value="O">Otro</Option>
                        </Select>
                        <Select
                            placeholder="Filtrar por tipo de ID"
                            value={idTypeFilter}
                            onChange={(value) => setIdTypeFilter(value)}
                            allowClear
                            style={{ width: 150 }}
                        >
                            <Option value="cedula">Cédula</Option>
                            <Option value="pasaporte">Pasaporte</Option>
                        </Select>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            Agregar Paciente
                        </Button>
                    </Space>

                    {/* Tabla de pacientes */}
                    <Table
                        columns={columns}
                        dataSource={displayedPatients}
                        rowKey="nro_identificacion"
                        pagination={{
                            current: currentPage,
                            pageSize: itemsPerPage,
                            total: allPatients.length,
                            onChange: handlePageChange,
                        }}
                    />
                </>
            ) : (
                <PatientDetailsView
                    patient={selectedPatient}
                    onBack={() => setActiveView("list")}
                />
            )}

            {/* Modales */}
            <AddPatientModal
                visible={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onPatientAdded={handlePatientAdded}
            />
            <EditPatientForm
                visible={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onPatientUpdated={loadPatients}
                initialData={editingPatient}
            />
        </div>
    );
};

export default Patients;
