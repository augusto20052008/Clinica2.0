import React, { useState, useEffect } from "react";
import { Modal, Form, Select, Button, Upload, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { fetchUsersWithInfo, fetchFirmaElectronicaById, updateFirmaElectronica } from "../../../../../utils/api";

const { Option } = Select;

const EditFirmaForm = ({ visible, onClose, firma, onFirmaUpdated }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [fileBase64, setFileBase64] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const loadUsuarios = async () => {
      try {
        const data = await fetchUsersWithInfo();
        const filteredData = data.filter(user => user.cedula && user.cedula.trim() !== "");
        setUsers(filteredData);
        setFilteredUsers(filteredData);
      } catch (error) {
        notification.error({ message: "Error", description: "No se pudieron cargar los usuarios." });
      }
    };

    const loadFirma = async () => {
      if (firma) {
        try {
          const data = await fetchFirmaElectronicaById(firma.id_firma_electronica);
          form.setFieldsValue({ id_usuario: data.id_usuario });
          setFileBase64(data.firma_base64);
        } catch (error) {
          notification.error({ message: "Error", description: "No se pudo cargar la firma electrónica." });
        }
      }
    };

    if (visible) {
      loadUsuarios();
      loadFirma();
    }
  }, [visible, firma, form]);

  const handleSearch = (value) => {
    if (!value) {
      setFilteredUsers(users);
      return;
    }
    const filtered = users.filter(user => user.cedula.includes(value));
    setFilteredUsers(filtered);
  };

  const handleFileUpload = (info) => {
    const file = info.file.originFileObj || info.file;
    if (!file || file.type !== "text/plain") {
      notification.error({ message: "Error", description: "Debe subir un archivo .txt válido." });
      setFileList([]);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result.trim();
      setFileBase64(text);
      setFileList([info.file]);
    };
    reader.readAsText(file);
  };

  const uploadProps = {
    accept: ".txt",
    maxCount: 1,
    onRemove: () => {
      setFileBase64(null);
      setFileList([]);
    },
    beforeUpload: () => false,
    onChange: handleFileUpload,
    fileList,
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (!fileBase64) {
        notification.error({ message: "Debe subir un archivo antes de continuar." });
        return;
      }

      setLoading(true);
      await updateFirmaElectronica(firma.id_firma_electronica, {
        id_usuario: values.id_usuario,
        firma_base64: fileBase64,
      });

      notification.success({ message: "Firma electrónica actualizada exitosamente." });
      onFirmaUpdated();
      form.resetFields();
      setFileBase64(null);
      setFileList([]);
      onClose();
    } catch (error) {
      notification.error({ message: "Error al actualizar la firma electrónica." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Editar Firma Electrónica"
      visible={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="id_usuario"
          label="Buscar Usuario por Cédula"
          rules={[{ required: true, message: "Seleccione un usuario." }]}
        >
          <Select
            showSearch
            placeholder="Escriba la cédula para buscar"
            onSearch={handleSearch}
            filterOption={false}
          >
            {filteredUsers.map(user => (
              <Option key={user.id_usuario} value={user.id_usuario}>
                {user.cedula} - {user.nombres} {user.apellidos}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Subir Archivo de Firma">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Seleccionar Archivo (.txt)</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditFirmaForm;
