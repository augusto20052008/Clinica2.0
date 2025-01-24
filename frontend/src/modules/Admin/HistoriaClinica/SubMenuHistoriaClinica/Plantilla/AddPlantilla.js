import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Select,
  Checkbox,
  Typography,
  Space,
  Divider,
  notification,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

function AddFormulario({ onClose, onRefresh }) {
  const [nroTipoFormulario, setNroTipoFormulario] = useState("");
  const [title, setTitle] = useState("");
  const [sections, setSections] = useState([]);

  const handleAddSection = () => {
    setSections([...sections, { title: "", fields: [] }]);
  };

  const handleSectionChange = (index, key, value) => {
    const updatedSections = [...sections];
    updatedSections[index][key] = value;
    setSections(updatedSections);
  };

  const handleAddField = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].fields.push({
      name: "",
      type: "text",
      label: "",
      required: false,
      placeholder: "",
    });
    setSections(updatedSections);
  };

  const handleFieldChange = (sectionIndex, fieldIndex, key, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].fields[fieldIndex][key] = value;
    setSections(updatedSections);
  };

  const handleRemoveField = (sectionIndex, fieldIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].fields.splice(fieldIndex, 1);
    setSections(updatedSections);
  };

  const handleSubmit = async () => {
    const formData = {
      nroTipoFormulario,
      title,
      sections,
    };

    try {
      // Simula la creación del formulario (reemplaza con tu lógica de API)
      notification.success({
        message: "Formulario creado exitosamente",
      });
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error al crear el formulario:", error);
      notification.error({
        message: "Error al crear el formulario",
      });
    }
  };

  return (
    <Card style={{ margin: "16px" }}>
      <Title level={3}>Crear Nuevo Formulario</Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item label="Número del Formulario" required>
              <Input
                value={nroTipoFormulario}
                onChange={(e) => setNroTipoFormulario(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Título del Formulario" required>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider>Secciones</Divider>

        {sections.map((section, sectionIndex) => (
          <Card
            key={sectionIndex}
            title={`Sección ${sectionIndex + 1}`}
            extra={
              <Button
                type="text"
                icon={<DeleteOutlined />}
                danger
                onClick={() => {
                  const updatedSections = [...sections];
                  updatedSections.splice(sectionIndex, 1);
                  setSections(updatedSections);
                }}
              />
            }
            style={{ marginBottom: "16px" }}
          >
            <Form.Item label="Título de la Sección" required>
              <Input
                value={section.title}
                onChange={(e) =>
                  handleSectionChange(sectionIndex, "title", e.target.value)
                }
              />
            </Form.Item>

            <Row gutter={[16, 16]}>
              {section.fields.map((field, fieldIndex) => (
                <Col span={12} key={fieldIndex}>
                  <Card
                    size="small"
                    title={`Campo ${fieldIndex + 1}`}
                    extra={
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleRemoveField(sectionIndex, fieldIndex)}
                      />
                    }
                    style={{ marginBottom: "16px" }}
                  >
                    <Form.Item label="Nombre" required>
                      <Input
                        value={field.name}
                        onChange={(e) =>
                          handleFieldChange(
                            sectionIndex,
                            fieldIndex,
                            "name",
                            e.target.value
                          )
                        }
                      />
                    </Form.Item>
                    <Form.Item label="Etiqueta" required>
                      <Input
                        value={field.label}
                        onChange={(e) =>
                          handleFieldChange(
                            sectionIndex,
                            fieldIndex,
                            "label",
                            e.target.value
                          )
                        }
                      />
                    </Form.Item>
                    <Form.Item label="Tipo de Campo">
                      <Select
                        value={field.type}
                        onChange={(value) =>
                          handleFieldChange(
                            sectionIndex,
                            fieldIndex,
                            "type",
                            value
                          )
                        }
                      >
                        <Select.Option value="text">Texto</Select.Option>
                        <Select.Option value="textarea">Área de Texto</Select.Option>
                        <Select.Option value="signature">Firma</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Placeholder">
                      <Input
                        value={field.placeholder}
                        onChange={(e) =>
                          handleFieldChange(
                            sectionIndex,
                            fieldIndex,
                            "placeholder",
                            e.target.value
                          )
                        }
                      />
                    </Form.Item>
                    <Form.Item>
                      <Checkbox
                        checked={field.required}
                        onChange={(e) =>
                          handleFieldChange(
                            sectionIndex,
                            fieldIndex,
                            "required",
                            e.target.checked
                          )
                        }
                      >
                        Obligatorio
                      </Checkbox>
                    </Form.Item>
                  </Card>
                </Col>
              ))}
            </Row>

            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() => handleAddField(sectionIndex)}
              block
            >
              Agregar Campo
            </Button>
          </Card>
        ))}

        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={handleAddSection}
          block
          style={{ marginBottom: "16px" }}
        >
          Agregar Sección
        </Button>

        <Space>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
            Guardar
          </Button>
          <Button icon={<CloseOutlined />} onClick={onClose}>
            Cancelar
          </Button>
        </Space>
      </Form>
    </Card>
  );
}

export default AddFormulario;
