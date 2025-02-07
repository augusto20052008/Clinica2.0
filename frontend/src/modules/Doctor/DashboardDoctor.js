import React from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Statistic,
  Button,
  Switch,
  List,
  Typography,
  Tag,
  Space,
} from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  ScheduleOutlined,
  WarningOutlined,
  BellOutlined,
  ClockCircleOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";

// === 1) Datos estáticos de ejemplo ===
const pacientesRecientes = [
  {
    id: 1,
    nombre: "María González",
    edad: 45,
    habitacion: "201-A",
    estado: "Crítico",
    temperatura: "38.5°C ↑",
    presion: "140/90",
    alergias: ["Alérgica a penicilina", "Diabética"],
    proximaRevision: "15:30",
    medicacionPendiente: true,
  },
  {
    id: 2,
    nombre: "José Ramírez",
    edad: 50,
    habitacion: "105-B",
    estado: "Estable",
    temperatura: "36.8°C",
    presion: "125/80",
    alergias: ["Hipertenso"],
    proximaRevision: "17:00",
    medicacionPendiente: false,
  },
];

const interconsultas = [
  {
    id: 1,
    doctor: "Dr. Carlos Ramírez",
    especialidad: "Cardiólogo",
    paciente: "Luis Morales",
    estado: "Pendiente",
    hace: "Hace 2 horas",
  },
  {
    id: 2,
    doctor: "Dr. Alberto Díaz",
    especialidad: "Neurólogo",
    paciente: "Lucía Pérez",
    estado: "Pendiente",
    hace: "Hace 1 hora",
  },
  {
    id: 3,
    doctor: "Dra. Ana Torres",
    especialidad: "Traumatóloga",
    paciente: "Jorge Castillo",
    estado: "Pendiente",
    hace: "Hace 30 minutos",
  },
];

const notificaciones = [
  {
    id: 1,
    emisor: "Enf. Daniela Ordoñez",
    mensaje: "Ha salido de turno",
    hora: "11:30 AM",
  },
  {
    id: 2,
    emisor: "Enf. Manuel Vargas",
    mensaje: "Nuevo reporte de laboratorio",
    hora: "10:15 AM",
  },
  {
    id: 3,
    emisor: "Enf. Daniela Ordoñez",
    mensaje: "Consulta en sala de emergencias",
    hora: "09:50 AM",
  },
];

const { Content } = Layout;
const { Title, Text } = Typography;

const DashboardDoctor = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      {/* Se ha eliminado el Header por completo */}
      
      {/* CONTENIDO */}
      <Content style={{ padding: "20px" }}>
        {/* FILA SUPERIOR: ESTADÍSTICAS RÁPIDAS */}
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Pacientes Recientes"
                value={16}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Total de Pacientes"
                value={218}
                prefix={<FileTextOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Interconsultas Pend."
                value={8}
                prefix={<ScheduleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Alertas"
                value={4}
                prefix={<WarningOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* FILA PRINCIPAL: DOS COLUMNAS */}
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          {/* COLUMNA IZQUIERDA (Pacientes + Interconsultas) */}
          <Col xs={24} md={16}>
            {/* PACIENTES RECIENTES */}
            <Card
              title="Pacientes Recientes"
              style={{ marginBottom: 16 }}
              bodyStyle={{ padding: 0 }}
            >
              <List
                itemLayout="vertical"
                dataSource={pacientesRecientes}
                renderItem={(paciente) => (
                  <List.Item style={{ padding: "16px" }}>
                    <Row justify="space-between" align="middle">
                      <Col>
                        <Title level={5} style={{ marginBottom: 0 }}>
                          {paciente.nombre}{" "}
                          <Text type="secondary" style={{ fontSize: "14px" }}>
                            ({paciente.edad} años)
                          </Text>
                        </Title>
                        <Text type="secondary">
                          Hab: {paciente.habitacion}
                        </Text>
                        <br />
                        {paciente.alergias.map((alergia, index) => (
                          <Tag
                            color="volcano"
                            key={index}
                            style={{ marginTop: 4 }}
                          >
                            ⚠ {alergia}
                          </Tag>
                        ))}
                      </Col>
                      <Col style={{ textAlign: "right" }}>
                        <Space direction="vertical" size={0}>
                          {paciente.estado === "Crítico" && (
                            <Tag color="error">{paciente.estado}</Tag>
                          )}
                          {paciente.estado === "Estable" && (
                            <Tag color="warning">{paciente.estado}</Tag>
                          )}
                          <Text>
                            {paciente.temperatura} | {paciente.presion}
                          </Text>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            Próx. revisión: {paciente.proximaRevision}
                          </Text>
                          {paciente.medicacionPendiente && (
                            <Text type="danger" style={{ fontSize: 12 }}>
                              Medicación Pendiente
                            </Text>
                          )}
                        </Space>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            </Card>

            {/* INTERCONSULTAS */}
            <Card
              title="Interconsultas"
              tabList={[
                { key: "interconsultas", tab: "Interconsultas" },
                { key: "pendientes", tab: "Pendiente" },
                { key: "historial", tab: "Historial" },
              ]}
              // Por simplicidad, no hacemos el cambio de pestañas real
            >
              <List
                itemLayout="horizontal"
                dataSource={interconsultas}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <>
                          <Text strong>{item.doctor}</Text>
                          <Text type="secondary" style={{ marginLeft: 8 }}>
                            ({item.especialidad})
                          </Text>
                        </>
                      }
                      description={
                        <>
                          Paciente: {item.paciente}
                          <br />
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {item.estado} - {item.hace}
                          </Text>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                style={{ marginTop: 8 }}
                block
              >
                Nueva Interconsulta
              </Button>
            </Card>
          </Col>

          {/* COLUMNA DERECHA (Turno + Notificaciones + Botones) */}
          <Col xs={24} md={8}>
            {/* BOTONES GRANDES */}
            <Card style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                block
                style={{ marginBottom: 8 }}
              >
                Buscar Paciente
              </Button>
              <Button
                type="default"
                icon={<EditOutlined />}
                block
                style={{ marginBottom: 8 }}
              >
                Crear Historia Clínica
              </Button>
            </Card>

            {/* TURNO */}
            <Card
              title={
                <>
                  <ClockCircleOutlined style={{ marginRight: 8 }} />
                  Turno
                </>
              }
              style={{ marginBottom: 16 }}
            >
              <Row justify="space-between" align="middle" style={{ marginBottom: 8 }}>
                <Col>
                  <Text strong>Estado:</Text>
                </Col>
                <Col>
                  <Space>
                    <Text type="secondary">Fuera de Consulta</Text>
                    <Switch defaultChecked={false} />
                  </Space>
                </Col>
              </Row>
              <Row style={{ marginBottom: 8 }}>
                <Col>
                  <Text strong>Información:</Text>
                  <div style={{ marginTop: 4 }}>
                    <Text type="secondary">
                      Mañana: 8:00 AM - 2:00 PM
                    </Text>{" "}
                    |{" "}
                    <Text type="secondary">
                      Tarde: 8:00 AM - 2:00 PM
                    </Text>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Text strong>Detalles del Turno:</Text>
                  <div style={{ marginTop: 4 }}>
                    <Text>Horario: 8:00 AM - 2:00 PM</Text>
                  </div>
                  <div>
                    <Text>Citas Programadas: 12</Text>
                  </div>
                </Col>
              </Row>
            </Card>

            {/* NOTIFICACIONES */}
            <Card
              title={
                <>
                  <BellOutlined style={{ marginRight: 8 }} />
                  Notificaciones
                </>
              }
            >
              <List
                itemLayout="vertical"
                dataSource={notificaciones}
                renderItem={(item) => (
                  <List.Item style={{ padding: "12px 0" }}>
                    <Text strong>{item.emisor}</Text>
                    <br />
                    {item.mensaje}{" "}
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      ({item.hora})
                    </Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default DashboardDoctor;
