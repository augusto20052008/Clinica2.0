import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Button,
  Form,
  Input,
  Space,
  Select,
  Typography,
  Divider,
  Popconfirm,
  notification,
  Row,
  Col,
  Pagination,
} from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;
const { Title } = Typography;

function EditPlantilla({ plantilla, onClose, onRefresh }) {
  const [formData, setFormData] = useState({
    ...plantilla,
    id: plantilla.idPlantilla_Formulario || plantilla.id || null,
    Estructura:
      typeof plantilla.Estructura === "string"
        ? JSON.parse(plantilla.Estructura || "{}")
        : plantilla.Estructura || { sections: [] },
  });

  const [activeSection, setActiveSection] = useState(0);
  const [visibleSections, setVisibleSections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setFormData({
      ...plantilla,
      id: plantilla.idPlantilla_Formulario || plantilla.id || null,
      Estructura:
        typeof plantilla.Estructura === "string"
          ? JSON.parse(plantilla.Estructura || "{}")
          : plantilla.Estructura || { sections: [] },
    });
  }, [plantilla]);

  useEffect(() => {
    if (formData.Estructura?.sections) {
      setVisibleSections(formData.Estructura.sections.map(() => true));
    }
  }, [formData.Estructura.sections]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStructureChange = (path, value) => {
    const keys = path.split(".");
    const updatedStructure = { ...formData.Estructura };

    let temp = updatedStructure;
    keys.slice(0, -1).forEach((key) => {
      if (!temp[key]) temp[key] = {};
      temp = temp[key];
    });

    temp[keys[keys.length - 1]] = value;
    setFormData((prev) => ({ ...prev, Estructura: updatedStructure }));
  };

  const handleAddSection = () => {
    const updatedSections = [
      ...formData.Estructura.sections,
      {
        title: `Sección ${formData.Estructura.sections.length + 1}`,
        fields: [],
      },
    ];
    setFormData((prev) => ({
      ...prev,
      Estructura: { ...prev.Estructura, sections: updatedSections },
    }));
    setActiveSection(updatedSections.length - 1);
    setVisibleSections((prev) => [...prev, true]);
  };

  const handleAddField = (sectionIndex) => {
    const updatedSections = [...formData.Estructura.sections];
    updatedSections[sectionIndex].fields.push({
      name: "",
      type: "text",
      label: "",
    });
    setFormData((prev) => ({
      ...prev,
      Estructura: { ...prev.Estructura, sections: updatedSections },
    }));
  };

  const handleRemoveField = (sectionIndex, fieldIndex) => {
    const updatedSections = [...formData.Estructura.sections];
    updatedSections[sectionIndex].fields.splice(fieldIndex, 1);
    setFormData((prev) => ({
      ...prev,
      Estructura: { ...prev.Estructura, sections: updatedSections },
    }));
  };

  const handleRemoveSection = (sectionIndex) => {
    const updatedSections = [...formData.Estructura.sections];
    updatedSections.splice(sectionIndex, 1);

    setFormData((prev) => ({
      ...prev,
      Estructura: { ...prev.Estructura, sections: updatedSections },
    }));

    const updatedVisibleSections = [...visibleSections];
    updatedVisibleSections.splice(sectionIndex, 1);
    setVisibleSections(updatedVisibleSections);

    if (activeSection >= updatedSections.length) {
      setActiveSection(updatedSections.length - 1);
    }
  };

  const toggleSectionVisibility = (index) => {
    setVisibleSections((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPlantilla = {
        ...formData,
        Estructura: JSON.stringify(formData.Estructura),
      };
      notification.success({
        message: "Plantilla actualizada",
        description: "Los cambios se guardaron exitosamente.",
      });
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error al actualizar plantilla:", error);
      notification.error({
        message: "Error",
        description: "Hubo un problema al guardar los cambios.",
      });
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={300} theme="light">
        <Title level={4} style={{ padding: "16px" }}>
          Secciones
        </Title>
        <Menu mode="inline" selectedKeys={[`${activeSection}`]}>
          {formData.Estructura.sections.map((section, index) => (
            <Menu.Item
              key={index}
              onClick={() => setActiveSection(index)}
              icon={
                visibleSections[index] ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {section.title || `Sección ${index + 1}`}
              <Popconfirm
                title="¿Eliminar esta sección?"
                onConfirm={() => handleRemoveSection(index)}
                okText="Sí"
                cancelText="No"
              >
                <DeleteOutlined style={{ marginLeft: "auto" }} />
              </Popconfirm>
            </Menu.Item>
          ))}
        </Menu>
        <Divider />
        <Space direction="vertical" style={{ padding: "16px" }}>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={handleAddSection}
            block
          >
            Agregar Sección
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSubmit}
            block
          >
            Guardar Cambios
          </Button>
          <Button
            icon={<CloseOutlined />}
            onClick={onClose}
            block
          >
            Cancelar
          </Button>
        </Space>
      </Sider>
      <Content style={{ padding: "24px" }}>
        <Form layout="vertical">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Número de Formulario">
                <Input
                  name="nroTipoFormulario"
                  value={formData.nroTipoFormulario || ""}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Nombre del Formulario">
                <Input
                  name="nombreTipoFormulario"
                  value={formData.nombreTipoFormulario || ""}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          {formData.Estructura.sections[activeSection] &&
            visibleSections[activeSection] && (
              <div>
                <Form.Item label="Título de la Sección">
                  <Input
                    value={
                      formData.Estructura.sections[activeSection].title || ""
                    }
                    onChange={(e) =>
                      handleStructureChange(
                        `sections.${activeSection}.title`,
                        e.target.value
                      )
                    }
                  />
                </Form.Item>
                <Row gutter={[16, 16]}>
                  {formData.Estructura.sections[activeSection].fields
                    .slice(startIndex, endIndex)
                    .map((field, fieldIndex) => (
                      <Col span={12} key={fieldIndex}>
                        <Form.Item label={`Campo ${startIndex + fieldIndex + 1} - Nombre`}>
                          <Input
                            value={field.name || ""}
                            onChange={(e) =>
                              handleStructureChange(
                                `sections.${activeSection}.fields.${startIndex + fieldIndex}.name`,
                                e.target.value
                              )
                            }
                          />
                        </Form.Item>
                        <Form.Item label="Etiqueta">
                          <Input
                            value={field.label || ""}
                            onChange={(e) =>
                              handleStructureChange(
                                `sections.${activeSection}.fields.${startIndex + fieldIndex}.label`,
                                e.target.value
                              )
                            }
                          />
                        </Form.Item>
                        <Form.Item label="Tipo de Campo">
                          <Select
                            value={field.type || "text"}
                            onChange={(value) =>
                              handleStructureChange(
                                `sections.${activeSection}.fields.${startIndex + fieldIndex}.type`,
                                value
                              )
                            }
                          >
                            <Select.Option value="text">Texto</Select.Option>
                            <Select.Option value="textarea">Área de Texto</Select.Option>
                            <Select.Option value="signature">Firma</Select.Option>
                          </Select>
                        </Form.Item>
                        <Button
                          type="link"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() =>
                            handleRemoveField(activeSection, startIndex + fieldIndex)
                          }
                        >
                          Eliminar Campo
                        </Button>
                        <Divider />
                      </Col>
                    ))}
                </Row>
                <Pagination
                  current={currentPage}
                  pageSize={itemsPerPage}
                  total={formData.Estructura.sections[activeSection].fields.length}
                  onChange={handlePageChange}
                  style={{ textAlign: "center", marginTop: "16px" }}
                />
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={() => handleAddField(activeSection)}
                  block
                >
                  Agregar Campo
                </Button>
              </div>
            )}
        </Form>
      </Content>
    </Layout>
  );
}

export default EditPlantilla;
