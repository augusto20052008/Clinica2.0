import React, { useEffect, useState } from "react";
import { Select, Button, Spin, notification } from "antd";
import { fetchTiposFormulario, fetchPatients } from "../../../../../utils/api";

const { Option } = Select;

const SeleccionarFormularioYPaciente = ({ onNext }) => {
    const [tiposFormulario, setTiposFormulario] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedFormulario, setSelectedFormulario] = useState(null);
    const [selectedPaciente, setSelectedPaciente] = useState(null);

    // Cargar tipos de formulario y pacientes
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [tiposData, pacientesData] = await Promise.all([
                    fetchTiposFormulario(),
                    fetchPatients(),
                ]);

                setTiposFormulario(Array.isArray(tiposData) ? tiposData : []);
                setPacientes(Array.isArray(pacientesData) ? pacientesData : []);
            } catch (error) {
                notification.error({ message: "Error", description: "No se pudieron cargar los datos." });
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleNext = () => {
        if (!selectedFormulario || !selectedPaciente) {
            notification.warning({ message: "Advertencia", description: "Debe seleccionar un formulario y un paciente." });
            return;
        }

        onNext(selectedFormulario, selectedPaciente);
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto", textAlign: "center" }}>
            <h2>Seleccionar Formulario y Paciente</h2>

            {loading ? (
                <Spin tip="Cargando datos..." style={{ display: "block", margin: "20px auto" }} />
            ) : (
                <>
                    {/* 📝 Selección de formulario con búsqueda */}
                    <div style={{ marginBottom: "20px" }}>
                        <label>Formulario:</label>
                        <Select
                            showSearch
                            style={{ width: "100%" }}
                            placeholder="Seleccionar tipo de formulario"
                            onChange={setSelectedFormulario}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {tiposFormulario.map((tipo) => (
                                <Option key={tipo.id_formulario_tipo} value={tipo.id_formulario_tipo}>
                                    {tipo.nombre}
                                </Option>
                            ))}
                        </Select>
                    </div>

                    {/* 👤 Selección de paciente con búsqueda */}
                    <div style={{ marginBottom: "20px" }}>
                        <label>Paciente:</label>
                        <Select
                            showSearch
                            style={{ width: "100%" }}
                            placeholder="Seleccionar paciente"
                            onChange={setSelectedPaciente}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {pacientes.map((paciente) => (
                                <Option key={paciente.nro_identificacion} value={paciente.nro_identificacion}>
                                    {paciente.nro_identificacion}
                                </Option>
                            ))}
                        </Select>
                    </div>

                    <Button type="primary" onClick={handleNext} style={{ backgroundColor: "#d1a000", borderColor: "#d1a000" }}>
                        Siguiente
                    </Button>
                </>
            )}
        </div>
    );
};

export default SeleccionarFormularioYPaciente;
