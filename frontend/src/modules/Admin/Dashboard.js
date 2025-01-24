import React from 'react';
import {
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
  ResponsiveContainer
} from 'recharts';

const Dashboard = () => {

  // 1. Datos de ejemplo (hardcodeados)

  // Ingresos vs Alta (Barras)
  const dataIngresosAltas = [
    { mes: 'Jan', ingresos: 40, altas: 30 },
    { mes: 'Feb', ingresos: 50, altas: 35 },
    { mes: 'Mar', ingresos: 60, altas: 45 },
    { mes: 'Apr', ingresos: 55, altas: 40 },
    { mes: 'May', ingresos: 70, altas: 60 },
    { mes: 'Jun', ingresos: 80, altas: 70 },
    { mes: 'Jul', ingresos: 75, altas: 65 },
  ];

  // Ocupación Mensual (Líneas)
  const dataLineMultiple = [
    { mes: 'Jan', Emergencia: 200, Cirugía: 150, UCI: 100, 'Med. Interna': 180, Pediatría: 120 },
    { mes: 'Feb', Emergencia: 220, Cirugía: 130, UCI: 110, 'Med. Interna': 160, Pediatría: 130 },
    { mes: 'Mar', Emergencia: 250, Cirugía: 160, UCI: 120, 'Med. Interna': 170, Pediatría: 140 },
    { mes: 'Apr', Emergencia: 260, Cirugía: 170, UCI: 130, 'Med. Interna': 190, Pediatría: 130 },
    { mes: 'May', Emergencia: 240, Cirugía: 150, UCI: 140, 'Med. Interna': 200, Pediatría: 150 },
    { mes: 'Jun', Emergencia: 280, Cirugía: 180, UCI: 160, 'Med. Interna': 210, Pediatría: 155 },
    { mes: 'Jul', Emergencia: 300, Cirugía: 190, UCI: 170, 'Med. Interna': 220, Pediatría: 160 },
  ];

  // Historias Clínicas (Pie 1)
  const dataHistorias1 = [
    { name: 'Activas', value: 65 },
    { name: 'Inactivas', value: 35 },
  ];

  // Historias Clínicas (Pie 2)
  const dataHistorias2 = [
    { name: 'num doctor', value: 45 },
    { name: 'num enfermera', value: 35 },
    { name: 'num Estadística', value: 20 },
  ];

  // Camillas Disponibles (Barras)
  const dataCamillas = [
    { area: 'Emergencia', total: 100, ocupadas: 80 },
    { area: 'Cirugía', total: 70, ocupadas: 50 },
    { area: 'UCI', total: 50, ocupadas: 45 },
    { area: 'Medicina Interna', total: 90, ocupadas: 60 },
  ];

  // Reingresos (Líneas)
  const dataReingresos = [
    { mes: 'Jan', tasa: 3.2, numero: 10 },
    { mes: 'Feb', tasa: 2.8, numero: 9 },
    { mes: 'Mar', tasa: 3.5, numero: 12 },
    { mes: 'Apr', tasa: 3.0, numero: 10 },
    { mes: 'May', tasa: 4.0, numero: 15 },
    { mes: 'Jun', tasa: 3.7, numero: 13 },
    { mes: 'Jul', tasa: 4.2, numero: 16 },
  ];

  // Colores para los PieCharts
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  // 2. Render del Dashboard con Recharts + estilo básico
  return (
    <div style={{ padding: '20px' }}>

      {/* Fila 1: Ingresos vs Alta (Barras) y Ocupación Mensual (Líneas) */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        
        {/* Ingresos vs Alta */}
        <div style={{ flex: 1, background: '#fff', padding: '10px', borderRadius: '8px' }}>
          <h4>Ingresos vs Alta</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataIngresosAltas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ingresos" fill="#82ca9d" name="Ingresos" />
              <Bar dataKey="altas" fill="#8884d8" name="Altas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Ocupación Mensual (Líneas múltiples) */}
        <div style={{ flex: 1, background: '#fff', padding: '10px', borderRadius: '8px' }}>
          <h4>Ocupación Mensual</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dataLineMultiple}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Emergencia" stroke="#8884d8" />
              <Line type="monotone" dataKey="Cirugía" stroke="#82ca9d" />
              <Line type="monotone" dataKey="UCI" stroke="#ffc658" />
              <Line type="monotone" dataKey="Med. Interna" stroke="#ff7300" />
              <Line type="monotone" dataKey="Pediatría" stroke="#0088FE" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fila 2: PieCharts + Notificaciones */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        
        {/* Pie 1: Historias Clínicas (Activas/Inactivas) */}
        <div style={{ flex: 1, background: '#fff', padding: '10px', borderRadius: '8px' }}>
          <h4>Historias Clínicas</h4>
          <p>(Activas vs Inactivas)</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={dataHistorias1}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {dataHistorias1.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Pie 2: Historias Clínicas (Tipologías) */}
        <div style={{ flex: 1, background: '#fff', padding: '10px', borderRadius: '8px' }}>
          <h4>Historias Clínicas</h4>
          <p>(Tipos por rol)</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={dataHistorias2}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {dataHistorias2.map((entry, index) => (
                  <Cell key={`cell2-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Notificaciones */}
        <div style={{ width: '220px', background: '#fff', padding: '10px', borderRadius: '8px' }}>
          <h4>Notificaciones</h4>
          <div style={{ marginTop: '10px' }}>
            <p><strong>Enf. Daniela Ordoñez</strong><br />Ha solicitado un cambio a Augusto</p>
            <hr />
            <p><strong>Enf. Daniela Ordoñez</strong><br />Consulta de resultados médicos</p>
            <hr />
            <p><strong>Enf. Daniela Ordoñez</strong><br />Nueva prescripción disponible</p>
          </div>
        </div>
      </div>

      {/* Fila 3: Camillas, Pacientes nuevos, Reingresos */}
      <div style={{ display: 'flex', gap: '20px' }}>
        
        {/* Camillas Disponibles */}
        <div style={{ flex: 1, background: '#fff', padding: '10px', borderRadius: '8px' }}>
          <h4>Camillas disponibles</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataCamillas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="area" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#82ca9d" name="Camillas Totales" />
              <Bar dataKey="ocupadas" fill="#8884d8" name="Camillas Ocupadas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Nuevos Pacientes (Card simple) */}
        <div
          style={{
            width: '150px',
            background: '#fff',
            padding: '10px',
            borderRadius: '8px',
            textAlign: 'center'
          }}
        >
          <h4>Nuevos Pacientes</h4>
          <p style={{ fontSize: '12px', color: '#888' }}>27/11/2024</p>
          <h1 style={{ fontSize: '40px', margin: '20px 0' }}>68+</h1>
        </div>

        {/* Reingresos (Líneas) */}
        <div style={{ flex: 1, background: '#fff', padding: '10px', borderRadius: '8px' }}>
          <h4>Reingresos</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dataReingresos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tasa" stroke="#82ca9d" name="Tasa de Reingreso" />
              <Line type="monotone" dataKey="numero" stroke="#8884d8" name="Nº de Reingresos" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
