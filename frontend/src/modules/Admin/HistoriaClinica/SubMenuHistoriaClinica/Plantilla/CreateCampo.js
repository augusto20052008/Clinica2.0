import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Select, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createCampo } from "../../../../../utils/api";

const { Option } = Select;

const CreateCampo = ({ idSeccion, idFormulario }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [hasOptions, setHasOptions] = useState(false);

    const handleTipoDatoChange = (value) => {
        setHasOptions(value === "ENUM");
    };

    const handleSubmit = async (values) => {
        if (!idSeccion || !idFormulario) {
            notification.warning({
                message: "Advertencia",
                description: "Debe seleccionar una sección y un formulario.",
            });
            return;
        }

        setLoading(true);
        try {
            const response = await createCampo({
                id_formulario_tipo: idFormulario,
                id_seccion: idSeccion,
                nombre_campo: values.nombre_campo,
                tipo_dato: values.tipo_dato,
                requerido: values.requerido ? 1 : 0,
                opciones: hasOptions ? values.opciones : null, // Solo enviar opciones si el tipo es ENUM
            });

            if (response && response.id_campo) {
                notification.success({
                    message: "Campo creado",
                    description: "El campo se ha creado exitosamente.",
                });
                form.resetFields();
                setHasOptions(false); // Resetear hasOptions al crear un campo nuevo
            } else {
                throw new Error("No se recibió un ID válido desde el backend.");
            }
        } catch (error) {
            notification.error({ message: "Error", description: "No se pudo crear el campo." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="nombre_campo" label="Nombre del Campo" rules={[{ required: true, message: "Este campo es obligatorio" }]}>
                <Input placeholder="Ejemplo: Fecha de nacimiento" />
            </Form.Item>

            <Form.Item name="tipo_dato" label="Tipo de Dato" rules={[{ required: true, message: "Seleccione un tipo de dato" }]}>
                <Select placeholder="Seleccione un tipo de dato" onChange={handleTipoDatoChange}>
                    <Option value="TEXT">Texto</Option>
                    <Option value="NUMBER">Número</Option>
                    <Option value="DATE">Fecha</Option>
                    <Option value="BOOLEAN">Booleano</Option>
                    <Option value="ENUM">Enumerado (Lista de opciones)</Option>
                    <Option value="FLOAT">Decimal</Option>
                </Select>
            </Form.Item>

            <Form.Item name="requerido" valuePropName="checked">
                <Checkbox>¿Este campo es obligatorio?</Checkbox>
            </Form.Item>

            {hasOptions && (
                <Form.Item name="opciones" label="Opciones (separadas por comas)" rules={[{ required: true, message: "Debe ingresar al menos una opción" }]}>
                    <Input placeholder="Ejemplo: Opción 1, Opción 2, Opción 3" />
                </Form.Item>
            )}

            <Button type="primary" htmlType="submit" icon={<PlusOutlined />} loading={loading} block>
                Crear Campo
            </Button>
        </Form>
    );
};

export default CreateCampo;
