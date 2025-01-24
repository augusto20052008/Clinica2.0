import React, { useState, useEffect } from "react";
import { Button, Form, Input, AutoComplete, message } from "antd";
import { SearchOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { createHistoria, fetchPatients, fetchHistorias } from "../../../../utils/api";

function AddHistoriaClinica({ onClose, onRefresh }) {
  const [formData, setFormData] = useState({
    Paciente_identificacion: "",
  });
  const [pacientes, setPacientes] = useState([]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [pacienteExiste, setPacienteExiste] = useState(null);
  const [ultimoNumeroHistoria, setUltimoNumeroHistoria] = useState(0);

  useEffect(() => {
    const loadPacientes = async () => {
      try {
        const data = await fetchPatients();
        setPacientes(data.data || []);
      } catch (error) {
        console.error("Error al cargar pacientes:", error);
      }
    };

    const fetchUltimoNumeroHistoria = async () => {
      try {
        const historias = await fetchHistorias();
        const ultimoNumero = historias?.length > 0
          ? Math.max(
              ...historias
                .map((h) => parseInt(h.nroHistoriaClinica, 10))
                .filter((num) => !isNaN(num))
            )
          : 0;
        setUltimoNumeroHistoria(ultimoNumero + 1);
      } catch (error) {
        console.error("Error al obtener el último número de historia clínica:", error);
        setUltimoNumeroHistoria(1);
      }
    };

    loadPacientes();
    fetchUltimoNumeroHistoria();
  }, []);

  const formatHistoriaClinicaNumber = (number) => {
    return number.toString().padStart(6, '0');
  };

  const handleInputChange = (value) => {
    setFormData({ ...formData, Paciente_identificacion: value });

    const filtered = pacientes.filter((paciente) =>
      paciente.identificacion.startsWith(value)
    );
    setFilteredPacientes(filtered);

    const existe = pacientes.some(
      (paciente) => paciente.identificacion === value
    );
    setPacienteExiste(existe);
  };

  const handleSubmit = async (values) => {
    if (!formData.Paciente_identificacion) {
      message.error("Por favor, completa la identificación del paciente.");
      return;
    }

    if (pacienteExiste === false) {
      message.error("El paciente no existe. Por favor, créalo primero.");
      return;
    }

    const dataToSend = {
      ...values,
      nroHistoriaClinica: formatHistoriaClinicaNumber(ultimoNumeroHistoria),
    };

    try {
      await createHistoria(dataToSend);
      message.success("Historia Clínica Agregada");
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error al crear historia clínica:", error);
      message.error(error.response?.data?.message || "Error al crear historia clínica.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Identificación del Paciente"
          name="Paciente_identificacion"
          initialValue={formData.Paciente_identificacion}
          rules={[{ required: true, message: "Por favor, ingrese la identificación del paciente." }]}
        >
          <AutoComplete
            options={filteredPacientes.map((paciente) => ({
              value: paciente.identificacion,
              label: (
                <div>
                  <strong>{paciente.identificacion}</strong> - {paciente.primerNombre} {paciente.apellidoMaterno}
                </div>
              ),
            }))}
            onSearch={handleInputChange}
            placeholder="Buscar identificación del paciente"
            allowClear
            suffixIcon={<SearchOutlined />}
          />
        </Form.Item>

        {pacienteExiste === true && (
          <p style={{ color: "green" }}>Paciente encontrado.</p>
        )}
        {pacienteExiste === false && (
          <p style={{ color: "red" }}>Paciente no encontrado.</p>
        )}

        <div className="form-buttons">
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            style={{ marginRight: 10 }}
          >
            Guardar
          </Button>
          <Button
            type="default"
            onClick={onClose}
            icon={<CloseOutlined />}
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddHistoriaClinica;
