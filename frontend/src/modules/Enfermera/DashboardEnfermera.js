import React from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Statistic,
  List,
  Typography,
  Tag,
  Switch,
  Button,
  Table,
} from "antd";
import {
  UserOutlined,
  FileDoneOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";

// ======= DATOS =======
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
];

const tareasDelDia = [
  {
    id: 1,
    hora: "08:00",
    paciente: "Luis Morales",
    habitacion: "201",
    accion: "Administrar medicamento",
    prioridad: "Alta",
  },
  {
    id: 2,
    hora: "08:30",
    paciente: "Luis Morales",
    habitacion: "201",
    accion: "Administrar medicamento",
    prioridad: "Media",
  },
  {
    id: 3,
    hora: "09:00",
    paciente: "Ana López",
    habitacion: "105-B",
    accion: "Curar herida",
    prioridad: "Alta",
  },
];

// ======= COMPONENTES & ESTILOS =======
const { Content } = Layout;
const { Title, Text } = Typography;

const DashboardEnfermera = () => {
  // Columnas para mostrar “tareasDelDia” en una tabla de Ant Design
  const tareasColumns = [
    {
      title: "",
      dataIndex: "completada",
      key: "completada",
      render: (_, record) => <input type="checkbox" />,
      width: 50,
    },
    {
      title: "Hora",
      dataIndex: "hora",
      key: "hora",
      width: 80,
    },
    {
      title: "Paciente",
      dataIndex: "paciente",
      key: "paciente",
      render: (text, record) => (
        <>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary">Habitación {record.habitacion}</Text>
        </>
      ),
    },
    {
      title: "Acción",
      dataIndex: "accion",
      key: "accion",
      render: (text, record) => {
        // Etiquetas de prioridad
        let colorBg = "green";
        let colorText = "#fff";
        if (record.prioridad === "Alta") {
          colorBg = "red";
          colorText = "#fff";
        } else if (record.prioridad === "Media") {
          colorBg = "orange";
          colorText = "#fff";
        }
        return (
          <>
            <Text>{text}</Text>
            <br />
            <Tag color={colorBg} style={{ color: colorText }}>
              Prioridad {record.prioridad}
            </Tag>
          </>
        );
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      {/* SIN HEADER, DIRECTO AL CONTENT */}
      <Content style={{ padding: 20 }}>
        {/* FILA SUPERIOR: ESTADÍSTICAS (3 o 4) */}
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Pacientes Totales"
                value={32}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Pacientes Recientes"
                value={8}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Tareas de Hoy"
                value={15}
                prefix={<FileDoneOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic title="Alertas" value={2} prefix={<AlertOutlined />} />
            </Card>
          </Col>
        </Row>

        {/* FILA PRINCIPAL: 2 COLUMNAS */}
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          {/* COLUMNA IZQUIERDA: PACIENTES RECIENTES + TAREAS */}
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
                renderItem={(pac) => (
                  <List.Item style={{ padding: "16px" }}>
                    <Row justify="space-between" align="middle">
                      <Col>
                        <Title level={5} style={{ marginBottom: 4 }}>
                          {pac.nombre}{" "}
                          <Text type="secondary" style={{ fontSize: 14 }}>
                            ({pac.edad} años)
                          </Text>
                        </Title>
                        <Text type="secondary">
                          Hab. {pac.habitacion}
                        </Text>
                      </Col>
                      <Col style={{ textAlign: "right" }}>
                        {pac.estado === "Crítico" && (
                          <Tag color="error">{pac.estado}</Tag>
                        )}
                        {pac.estado === "Estable" && (
                          <Tag color="warning">{pac.estado}</Tag>
                        )}
                        <br />
                        <Text>
                          {pac.temperatura} | {pac.presion}
                        </Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Próx. revisión: {pac.proximaRevision}
                        </Text>
                        {pac.medicacionPendiente && (
                          <div style={{ color: "red", fontSize: 12 }}>
                            Medicación pendiente
                          </div>
                        )}
                        <div style={{ marginTop: 4 }}>
                          {pac.alergias.map((al, idx) => (
                            <Tag color="volcano" key={idx} style={{ marginTop: 4 }}>
                              ⚠ {al}
                            </Tag>
                          ))}
                        </div>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            </Card>

            {/* TAREAS DEL DÍA */}
            <Card title="Tareas del Día">
              <Table
                dataSource={tareasDelDia}
                columns={tareasColumns}
                rowKey="id"
                pagination={false}
              />
            </Card>
          </Col>

          {/* COLUMNA DERECHA: TURNO + BOTONES */}
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
              <Button icon={<EditOutlined />} block style={{ marginBottom: 8 }}>
                Signos Vitales
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
            >
              <div style={{ marginBottom: 12 }}>
                <Text strong>Estado: </Text>
                <Text type="secondary" style={{ marginRight: 8 }}>
                  Fuera de Consulta
                </Text>
                <Switch defaultChecked={false} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <Text strong>Información:</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Mañana: 8:00 AM - 2:00 PM | Tarde: 8:00 AM - 2:00 PM
                </Text>
              </div>
              <div>
                <Text strong>Detalles del Turno:</Text>
                <div style={{ marginTop: 4 }}>
                  <Text>Horario: 8:00 AM - 2:00 PM</Text>
                </div>
                <div>
                  <Text>Citas Programadas: 12</Text>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default DashboardEnfermera;
