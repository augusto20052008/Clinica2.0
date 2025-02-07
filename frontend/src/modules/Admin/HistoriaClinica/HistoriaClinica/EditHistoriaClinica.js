import React, { useState, useEffect } from "react";
import { Modal, Form, Select, Button, notification } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { fetchPatients, updateHistoriaClinica } from "../../../../utils/api";

const { Option } = Select;

const EditHistoriaClinica = ({ visible, onClose, historia, onHistoriaUpdated }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);

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

    if (historia) {
      form.setFieldsValue({
        nro_identificacion: historia.nro_identificacion,
      });
    }
  }, [historia, form]);

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
      await updateHistoriaClinica(historia.nro_archivo, values);
      notification.success({
        message: "Historia clínica actualizada",
        description: "La historia clínica se ha actualizado exitosamente.",
      });
      onHistoriaUpdated();
      onClose();
    } catch (error) {
      console.error("Error al actualizar historia clínica:", error);
      notification.error({
        message: "Error",
        description: "No se pudo actualizar la historia clínica.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Editar Historia Clínica"
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
            icon={<EditOutlined />}
            block
          >
            Guardar Cambios
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditHistoriaClinica;
