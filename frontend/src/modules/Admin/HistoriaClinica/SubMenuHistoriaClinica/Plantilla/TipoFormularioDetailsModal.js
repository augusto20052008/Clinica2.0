import React, { useEffect, useState } from "react";
import { Modal, Button, Spin, notification, List, Typography } from "antd";
import { fetchSeccionByTipoFormulario, fetchSeccionByTipoFormularioYSeccion } from "../../../../../utils/api";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const TipoFormularioDetailsModal = ({ visible, onClose, formulario }) => {
    const [secciones, setSecciones] = useState([]);
    const [campos, setCampos] = useState([]);
    const [loadingSecciones, setLoadingSecciones] = useState(false);
    const [loadingCampos, setLoadingCampos] = useState(false);
    const [selectedSeccion, setSelectedSeccion] = useState(null);

    // Cargar secciones cuando cambia el formularioId
    useEffect(() => {
        const loadSecciones = async () => {
            if (!formulario?.id_formulario_tipo) return;
            setLoadingSecciones(true);

            try {
                const data = await fetchSeccionByTipoFormulario(formulario.id_formulario_tipo);
                const seccionesArray = Array.isArray(data[0]) ? data[0] : data;
                setSecciones(seccionesArray);
            } catch (error) {
                notification.error({ message: "Error", description: "No se pudieron cargar las secciones." });
            } finally {
                setLoadingSecciones(false);
            }
        };

        loadSecciones();
    }, [formulario]);

    // Cargar campos cuando cambia la sección seleccionada
    useEffect(() => {
        const loadCampos = async () => {
            if (!selectedSeccion || !formulario?.id_formulario_tipo) return;
            setLoadingCampos(true);

            try {
                const data = await fetchSeccionByTipoFormularioYSeccion(formulario.id_formulario_tipo, selectedSeccion);
                const camposArray = Array.isArray(data) ? data : [];
                setCampos(camposArray);
            } catch (error) {
                notification.error({ message: "Error", description: "No se pudieron cargar los campos de la sección." });
            } finally {
                setLoadingCampos(false);
            }
        };

        loadCampos();
    }, [selectedSeccion, formulario]);

    // Manejar la selección de una sección
    const handleSelectSeccion = (id_seccion) => {
        setSelectedSeccion(id_seccion);
    };

    return (
        <Modal
            visible={visible}
            title="Detalles del Formulario"
            onCancel={onClose}
            footer={[
                <Button key="close" onClick={onClose}>
                    Cerrar
                </Button>
            ]}
            width={800}
        >
            {formulario ? (
                <div>
                    {/* Detalles del Formulario */}
                    <Title level={4}>Información del Formulario</Title>
                    <List bordered>
                        <List.Item>
                            <Text strong>Nombre:</Text> {formulario.nombre}
                        </List.Item>
                        <List.Item>
                            <Text strong>Descripción:</Text> {formulario.descripcion}
                        </List.Item>
                        <List.Item>
                            <Text strong>Fecha de Creación:</Text> {dayjs(formulario.fecha_creacion).format("YYYY-MM-DD")}
                        </List.Item>
                        {/* Agrega más campos según sea necesario */}
                    </List>

                    {/* Secciones */}
                    <Title level={4} style={{ marginTop: 20 }}>Secciones</Title>
                    {loadingSecciones ? (
                        <Spin tip="Cargando secciones..." style={{ display: "block", margin: "20px auto" }} />
                    ) : (
                        <List
                            bordered
                            dataSource={secciones}
                            renderItem={(seccion) => (
                                <List.Item
                                    key={seccion.id_seccion}
                                    style={{ cursor: "pointer", backgroundColor: selectedSeccion === seccion.id_seccion ? '#e6f7ff' : 'white' }}
                                    onClick={() => handleSelectSeccion(seccion.id_seccion)}
                                >
                                    {seccion.nombre_seccion}
                                </List.Item>
                            )}
                        />
                    )}

                    {/* Campos de la Sección Seleccionada */}
                    {selectedSeccion && (
                        <>
                            <Title level={4} style={{ marginTop: 20 }}>Campos de la Sección</Title>
                            {loadingCampos ? (
                                <Spin tip="Cargando campos..." style={{ display: "block", margin: "20px auto" }} />
                            ) : (
                                <List
                                    bordered
                                    dataSource={campos}
                                    renderItem={(campo) => (
                                        <List.Item key={campo.id_campo}>
                                            <Text strong>{campo.nombre_campo}:</Text> {campo.tipo_dato}
                                        </List.Item>
                                    )}
                                />
                            )}
                        </>
                    )}
                </div>
            ) : (
                <Spin tip="Cargando detalles..." />
            )}
        </Modal>
    );
};

export default TipoFormularioDetailsModal;
