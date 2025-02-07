import React, { useState, useEffect } from "react";
import { Modal, Form, Select, Button, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { fetchPatients, createHistoriaClinica } from "../../../../utils/api";

const { Option } = Select;

const AddHistoriaClinica = ({ visible, onClose, onHistoriaAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);

  // Cargar todos los pacientes al abrir el modal
  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
        setFilteredPatients(data);
      } catch (error) {
        console.error("Error al cargar pacientes:", error);
        notification.error({
          message: "Error",
          description: "No se pudo cargar la lista de pacientes.",
        });
      }
    };

    loadPatients();
  }, []);

  // Filtrar pacientes mientras se escribe
  const handleSearch = (value) => {
    const filtered = patients.filter(
      (patient) =>
        patient.nro_identificacion.includes(value) &&
        !patients.some((p) => p.nro_identificacion === value)
    );
    setFilteredPatients(filtered);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await createHistoriaClinica(values);
      notification.success({
        message: "Historia clínica agregada",
        description: "La historia clínica se ha creado exitosamente.",
      });
      onHistoriaAdded(); // Actualiza la lista en el componente principal
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Error al agregar historia clínica:", error);
      notification.error({
        message: "Error",
        description: "No se pudo agregar la historia clínica.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Agregar Historia Clínica"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="nro_identificacion"
          label="Identificación del Paciente"
          rules={[{ required: true, message: "Este campo es obligatorio." }]}
        >
          <Select
            showSearch
            placeholder="Buscar pacientes"
            onSearch={handleSearch}
            filterOption={false}
          >
            {filteredPatients.map((patient) => (
              <Option key={patient.nro_identificacion} value={patient.nro_identificacion}>
                {`${patient.nro_identificacion} - ${patient.primer_nombre} ${patient.primer_apellido}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<PlusOutlined />}
            block
          >
            Crear Historia Clínica
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddHistoriaClinica;
