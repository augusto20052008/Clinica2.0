import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Statistic,
  Radio,
} from "antd";
import {
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const { Content } = Layout;

const Dashboard = () => {
  // ==============================
  // DATOS DE EJEMPLO
  // ==============================

  // --- Estadísticas generales ---
  const totalHospitalizados = 340;
  const pacientesEnEspera = 58;
  const tasaOcupacion = "85%";
  const reingresos = 22;

  // --- Gráfica 1: Ingresos por Departamento (BarChart) ---
  const dataIngresosDeptos = [
    { mes: "Jan", Emergencia: 120, Cirugía: 80, Pediatría: 50 },
    { mes: "Feb", Emergencia: 150, Cirugía: 90, Pediatría: 60 },
    { mes: "Mar", Emergencia: 180, Cirugía: 100, Pediatría: 70 },
    { mes: "Apr", Emergencia: 170, Cirugía: 110, Pediatría: 75 },
    { mes: "May", Emergencia: 200, Cirugía: 120, Pediatría: 85 },
    { mes: "Jun", Emergencia: 220, Cirugía: 130, Pediatría: 90 },
  ];

  // --- Gráfica 2: Evolución de Pacientes (LineChart) ---
  const dataEvolucionPacientes = [
    { mes: "Jan", Hospitalizados: 300, UCI: 50 },
    { mes: "Feb", Hospitalizados: 320, UCI: 55 },
    { mes: "Mar", Hospitalizados: 340, UCI: 60 },
    { mes: "Apr", Hospitalizados: 350, UCI: 70 },
    { mes: "May", Hospitalizados: 370, UCI: 80 },
    { mes: "Jun", Hospitalizados: 400, UCI: 90 },
  ];

  // --- Gráfica 3: Distribución de Camas (PieChart) ---
  // Vista global
  const dataCamasGlobal = [
    { name: "Ocupadas", value: 150 },
    { name: "Disponibles", value: 50 },
  ];
  // Vista por piso
  const dataCamasPiso = [
    { name: "Piso 1 - Ocupadas", value: 80 },
    { name: "Piso 1 - Disponibles", value: 20 },
    { name: "Piso 2 - Ocupadas", value: 70 },
    { name: "Piso 2 - Disponibles", value: 30 },
  ];

  const [filtroCamas, setFiltroCamas] = useState("global");
  const handleFiltroCamasChange = (e) => {
    setFiltroCamas(e.target.value);
  };
  const camasChartData =
    filtroCamas === "global" ? dataCamasGlobal : dataCamasPiso;
  const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28"];

  // --- NUEVAS Gráficas 4 y 5 (por ejemplo) ---
  // Gráfica 4: Admisiones Mensuales (BarChart)
  const dataAdmisiones = [
    { mes: "Jan", Admisiones: 90 },
    { mes: "Feb", Admisiones: 100 },
    { mes: "Mar", Admisiones: 110 },
    { mes: "Apr", Admisiones: 95 },
    { mes: "May", Admisiones: 120 },
    { mes: "Jun", Admisiones: 130 },
  ];

  // Gráfica 5: Egresos Mensuales (BarChart)
  const dataEgresos = [
    { mes: "Jan", Egresos: 70 },
    { mes: "Feb", Egresos: 80 },
    { mes: "Mar", Egresos: 90 },
    { mes: "Apr", Egresos: 85 },
    { mes: "May", Egresos: 95 },
    { mes: "Jun", Egresos: 100 },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Content con scroll vertical */}
      <Content style={{ padding: "20px", overflowY: "auto" }}>
        {/* ============================== 
            FILA 1: ESTADÍSTICAS GENERALES
        ============================== */}
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card hoverable>
              <Statistic
                title="Pacientes Hospitalizados"
                value={totalHospitalizados}
                prefix={<BarChartOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card hoverable>
              <Statistic
                title="Pacientes en Espera"
                value={pacientesEnEspera}
                prefix={<LineChartOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card hoverable>
              <Statistic
                title="Tasa de Ocupación"
                value={tasaOcupacion}
                prefix={<PieChartOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card hoverable>
              <Statistic
                title="Reingresos"
                value={reingresos}
                prefix={<PieChartOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* ==============================
            FILA 2: TRES GRÁFICAS PRINCIPALES
        ============================== */}
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col span={8}>
            <Card title="Ingresos por Departamento" bordered hoverable>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={dataIngresosDeptos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Emergencia" fill="#ff4d4f" name="Emergencia" />
                  <Bar dataKey="Cirugía" fill="#1890ff" name="Cirugía" />
                  <Bar dataKey="Pediatría" fill="#52c41a" name="Pediatría" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col span={8}>
            <Card title="Evolución de Pacientes" bordered hoverable>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={dataEvolucionPacientes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Hospitalizados"
                    stroke="#1890ff"
                    name="Hospitalizados"
                  />
                  <Line
                    type="monotone"
                    dataKey="UCI"
                    stroke="#ff4d4f"
                    name="UCI"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col span={8}>
            <Card
              title="Distribución de Camas"
              bordered
              hoverable
              extra={
                <Radio.Group
                  onChange={handleFiltroCamasChange}
                  value={filtroCamas}
                >
                  <Radio.Button value="global">Global</Radio.Button>
                  <Radio.Button value="piso">Por Piso</Radio.Button>
                </Radio.Group>
              }
            >
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={camasChartData}
                    dataKey="value"
                    outerRadius={70}
                    label
                  >
                    {camasChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        {/* ==============================
            FILA 3: DOS GRÁFICAS ADICIONALES
        ============================== */}
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          {/* GRÁFICA 4: Admisiones Mensuales */}
          <Col span={12}>
            <Card title="Admisiones Mensuales" bordered hoverable>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dataAdmisiones}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Admisiones" fill="#1890ff" name="Admisiones" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          {/* GRÁFICA 5: Egresos Mensuales */}
          <Col span={12}>
            <Card title="Egresos Mensuales" bordered hoverable>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dataEgresos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Egresos" fill="#ff4d4f" name="Egresos" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;
