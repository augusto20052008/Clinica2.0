import React from "react";
import { Modal, Typography, Row, Col } from "antd";
import { IdcardOutlined, CalendarOutlined, FileOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const HistoriaClinicaProfile = ({ visible, onClose, historia }) => {
    if (!historia) return null;

    return (
        <Modal
            title={
                <Row align="middle">
                    <FileOutlined style={{ marginRight: 8 }} />
                    <Title level={4} style={{ margin: 0 }}>
                        Detalles de la Historia Clínica
                    </Title>
                </Row>
            }
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Text strong>
                        <IdcardOutlined /> Número de Archivo:
                    </Text>
                    <p>{historia.nro_archivo}</p>
                </Col>
                <Col span={12}>
                    <Text strong>
                        <IdcardOutlined /> Identificación del Paciente:
                    </Text>
                    <p>{historia.nro_identificacion}</p>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Text strong>
                        <CalendarOutlined /> Fecha de Creación:
                    </Text>
                    <p>{new Date(historia.fecha_creacion).toLocaleString()}</p>
                </Col>
            </Row>
        </Modal>
    );
};

export default HistoriaClinicaProfile;
