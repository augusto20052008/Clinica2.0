import React, { useState, useEffect } from "react";
import { Modal, Descriptions, Spin, Typography, Image } from "antd";
import { fetchUserDetails } from "../../../utils/api";

const { Title } = Typography;

const UserProfileModal = ({ userId, onClose }) => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchUserDetails(userId);
        setFormData(response);
      } catch (error) {
        console.error("Error al obtener detalles del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchDetails();
    }
  }, [userId]);

  return (
    <Modal
      title={<Title level={4}>Detalles del Usuario</Title>}
      visible
      onCancel={onClose}
      footer={null}
      centered
    >
      {loading ? (
        <Spin tip="Cargando..." style={{ width: "100%", textAlign: "center" }} />
      ) : formData ? (
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="Identificación">
            {formData.identificacion}
          </Descriptions.Item>
          <Descriptions.Item label="Nombres">
            {formData.nombres}
          </Descriptions.Item>
          <Descriptions.Item label="Apellidos">
            {formData.apellidos}
          </Descriptions.Item>
          <Descriptions.Item label="Correo">
            {formData.correo}
          </Descriptions.Item>
          <Descriptions.Item label="Rol">
            {formData.rol}
          </Descriptions.Item>
          <Descriptions.Item label="Estado">
            {formData.estado}
          </Descriptions.Item>
          <Descriptions.Item label="Fecha de Nacimiento">
            {formData.fechaNacimiento
              ? new Date(formData.fechaNacimiento).toLocaleDateString()
              : "No especificada"}
          </Descriptions.Item>
          <Descriptions.Item label="Teléfono">
            {formData.telefono || "No especificado"}
          </Descriptions.Item>
          <Descriptions.Item label="Dirección">
            {formData.direccionDomicilio || "No especificada"}
          </Descriptions.Item>
          <Descriptions.Item label="Especialidad">
            {formData.especialidad || "No especificada"}
          </Descriptions.Item>
          <Descriptions.Item label="Consultorio">
            {formData.consultorio || "No especificado"}
          </Descriptions.Item>
          <Descriptions.Item label="Sexo">
            {formData.sexo === "M" ? "Masculino" : "Femenino"}
          </Descriptions.Item>
          <Descriptions.Item label="Estado Civil">
            {formData.estadoCivil || "No especificado"}
          </Descriptions.Item>
          <Descriptions.Item label="Fotografía">
            {formData.fotografia ? (
              <Image
                width={200}
                src={formData.fotografia}
                alt="Fotografía del usuario"
              />
            ) : (
              "No disponible"
            )}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <p>No se encontraron datos del usuario.</p>
      )}
    </Modal>
  );
};

export default UserProfileModal;
