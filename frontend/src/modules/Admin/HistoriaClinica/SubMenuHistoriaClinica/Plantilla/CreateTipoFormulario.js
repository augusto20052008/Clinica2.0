import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createTipoFormulario } from "../../../../../utils/api";

const CreateTipoFormulario = ({ onTipoFormularioCreated, idFormulario, isDisabled }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await createTipoFormulario(values);
            if (response && response.id_formulario_tipo) {
                onTipoFormularioCreated(response.id_formulario_tipo);
                notification.success({
                    message: "Formulario creado",
                    description: "Formulario creado exitosamente.",
                });
                form.resetFields();
            } else {
                throw new Error("No se recibió un ID válido desde el backend");
            }
        } catch (error) {
            notification.error({ message: "Error", description: "No se pudo crear el formulario." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit} disabled={isDisabled}>
            <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
                <Input placeholder="Ejemplo: Admisión, Alta, Evolución" disabled={isDisabled} />
            </Form.Item>
            <Form.Item name="descripcion" label="Descripción" rules={[{ required: true }]}>
                <Input.TextArea placeholder="Breve descripción del tipo de formulario" rows={3} disabled={isDisabled} />
            </Form.Item>
            {!isDisabled && (
                <Button type="primary" htmlType="submit" icon={<PlusOutlined />} loading={loading} block>
                    Crear
                </Button>
            )}
        </Form>
    );
};

export default CreateTipoFormulario;
