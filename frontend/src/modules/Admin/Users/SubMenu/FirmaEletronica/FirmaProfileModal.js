import React from "react";
import { Modal, Descriptions, Button, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { Text } = Typography;

const FirmaProfileModal = ({ visible, onClose, firma }) => {
  if (!firma) return null;

  const handleDownload = () => {
    if (!firma.firma_base64) return;
    const element = document.createElement("a");
    element.setAttribute("href", `data:text/plain;base64,${firma.firma_base64}`);
    element.setAttribute("download", "firma_electronica.txt");
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Modal title="Detalle de Firma Electrónica" visible={visible} onCancel={onClose} footer={null}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID Firma">
          <Text>{firma.id_firma_electronica}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="ID Usuario">
          <Text>{firma.id_usuario}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Fecha de Creación">
          <Text>{new Date(firma.fecha_creacion).toLocaleString()}</Text>
        </Descriptions.Item>
      </Descriptions>

      <Button
        type="primary"
        icon={<DownloadOutlined />}
        onClick={handleDownload}
        style={{ marginTop: 16 }}
        disabled={!firma.firma_base64}
      >
        Descargar Firma
      </Button>
    </Modal>
  );
};

export default FirmaProfileModal;
