import React, { useState, useEffect } from "react";
import { Modal, Tabs } from "antd";
import CreateTipoFormulario from "./CreateTipoFormulario";
import CreateSeccion from "./CreateSeccion";
import CreateCampo from "./CreateCampo";

const { TabPane } = Tabs;

const TipoFormularioModal = ({ isVisible, onClose, editingTipoFormularioId, reloadFormularios }) => {
    const [activeTab, setActiveTab] = useState("tipo");
    const [idFormulario, setIdFormulario] = useState(null);
    const [idSeccion, setIdSeccion] = useState(null);

    // Resetear estados cuando el modal se abre con un nuevo formulario
    useEffect(() => {
        if (!isVisible) {
            setIdFormulario(null);
            setIdSeccion(null);
            setActiveTab("tipo");
        }
    }, [isVisible]);

    const handleClose = () => {
        setIdFormulario(null);
        setIdSeccion(null);
        setActiveTab("tipo");
        onClose();
    };

    return (
        <Modal open={isVisible} onCancel={handleClose} footer={null} closable={true} centered width={900}>
            <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
                <TabPane tab="Tipo" key="tipo">
                    <CreateTipoFormulario
                        onTipoFormularioCreated={(id) => {
                            setIdFormulario(id);
                            setActiveTab("seccion");
                            reloadFormularios();
                        }}
                        idFormulario={idFormulario}
                        isDisabled={!!idFormulario}
                    />
                </TabPane>

                <TabPane tab="Sección" key="seccion" disabled={!idFormulario}>
                    <CreateSeccion
                        idFormulario={idFormulario}
                        onSeccionCreated={(id) => {
                            setIdSeccion(id);
                            setActiveTab("campos");
                        }}
                        onSeccionSelected={(id) => {
                            setIdSeccion(id);
                            setActiveTab("campos");
                        }}
                    />
                </TabPane>

                <TabPane tab="Campos" key="campos" disabled={!idSeccion}>
                    <CreateCampo idSeccion={idSeccion} idFormulario={idFormulario} />
                </TabPane>
            </Tabs>
        </Modal>
    );
};

export default TipoFormularioModal;
