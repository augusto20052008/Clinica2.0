import React, { useState, useEffect } from "react";
import { Modal, Form, Select, Button, Upload, notification } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { createFirmaElectronica, fetchUsersWithInfo } from "../../../../../utils/api";

const { Option } = Select;

const AddFirmaForm = ({ visible, onClose, onFirmaAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [firmaContent, setFirmaContent] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsersWithInfo();
        if (Array.isArray(data)) {
          const filteredData = data.filter(user => user.cedula && user.cedula.trim() !== "");
          setUsers(filteredData);
          setFilteredUsers(filteredData);
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: "No se pudieron cargar los usuarios.",
        });
      }
    };

    if (visible) loadUsers();
  }, [visible]);

  const handleSearch = (value) => {
    if (!value) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(user => user.cedula?.includes(value));
    setFilteredUsers(filtered);
  };

  const handleFileChange = (info) => {
    const uploadedFile = info.file.originFileObj || info.file;
    if (!uploadedFile || uploadedFile.type !== "text/plain") {
      notification.error({
        message: "Error",
        description: "Debe subir un archivo .txt válido.",
      });
      setFileList([]);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFirmaContent(reader.result.trim());
      setFileList([info.file]);
    };
    reader.readAsText(uploadedFile);
  };

  const uploadProps = {
    accept: ".txt",
    maxCount: 1,
    onRemove: () => {
      setFirmaContent(null);
      setFileList([]);
    },
    beforeUpload: () => false,
    onChange: handleFileChange,
    fileList,
  };

  const handleSubmit = async (values) => {
    if (!firmaContent) {
      notification.error({
        message: "Error",
        description: "Debe subir un archivo .txt válido.",
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        id_usuario: values.id_usuario,
        firma_base64: btoa(firmaContent),
      };

      await createFirmaElectronica(payload);
      notification.success({
        message: "Firma agregada",
        description: "La firma electrónica se ha creado exitosamente.",
      });

      onFirmaAdded();
      form.resetFields();
      setFirmaContent(null);
      setFileList([]);
      onClose();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "No se pudo agregar la firma electrónica.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Agregar Firma Electrónica" visible={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
            notFoundContent={filteredUsers.length === 0 ? "No se encontraron usuarios" : null}
          >
            {filteredUsers.map(user => (
              <Option key={user.id_usuario} value={user.id_usuario}>
                {user.cedula} - {user.nombres} {user.apellidos}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="firma"
          label="Archivo de Firma Electrónica (.txt)"
          rules={[{ required: true, message: "Suba un archivo .txt." }]}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Subir Archivo</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />} loading={loading} block>
            Crear Firma Electrónica
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddFirmaForm;
