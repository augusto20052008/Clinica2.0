import React from 'react';

// === 1) Datos estáticos de ejemplo ===
const pacientesRecientes = [
  {
    id: 1,
    nombre: 'María González',
    edad: 45,
    habitacion: '201-A',
    estado: 'Crítico',
    temperatura: '38.5°C ↑', 
    presion: '140/90',
    alergias: ['Alérgica a penicilina', 'Diabética'],
    proximaRevision: '15:30',
    medicacionPendiente: true
  },
  {
    id: 2,
    nombre: 'José Ramírez',
    edad: 50,
    habitacion: '105-B',
    estado: 'Estable',
    temperatura: '36.8°C',
    presion: '125/80',
    alergias: ['Hipertenso'],
    proximaRevision: '17:00',
    medicacionPendiente: false
  }
];

const interconsultas = [
  { id: 1, doctor: 'Dr. Carlos Ramírez', especialidad: 'Cardiólogo', paciente: 'Luis Morales', estado: 'Pendiente', hace: 'Hace 2 horas' },
  { id: 2, doctor: 'Dr. Carlos Ramírez', especialidad: 'Cardiólogo', paciente: 'Luis Morales', estado: 'Pendiente', hace: 'Hace 2 horas' },
  { id: 3, doctor: 'Dr. Carlos Ramírez', especialidad: 'Cardiólogo', paciente: 'Luis Morales', estado: 'Pendiente', hace: 'Hace 2 horas' }
];

const notificaciones = [
  { id: 1, emisor: 'Enf. Daniela Ordoñez', mensaje: 'Ha salido de turno', hora: '11:30 AM' },
  { id: 2, emisor: 'Enf. Manuel Vargas', mensaje: 'Nuevo reporte de laboratorio', hora: '10:15 AM' },
  { id: 3, emisor: 'Enf. Daniela Ordoñez', mensaje: 'Consulta en sala de emergencias', hora: '09:50 AM' }
];

// === 2) Estilos “inline” con colores suaves y formas redondeadas ===
const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#f5f7fa',
  padding: '30px 40px',
  fontFamily: 'Segoe UI, Tahoma, sans-serif',
  color: '#333'
};

const statsRowStyle = {
  display: 'flex',
  gap: '15px',
  marginBottom: '20px',
  flexWrap: 'wrap'
};

const statCardStyle = {
  flex: '1 1 160px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '15px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
  minWidth: '180px',
  textAlign: 'center'
};

const statTitleStyle = {
  fontSize: '14px',
  color: '#666'
};

const statNumberStyle = {
  fontSize: '26px',
  fontWeight: 'bold',
  marginTop: '8px'
};

const mainContentStyle = {
  display: 'flex',
  gap: '20px',
  flexWrap: 'wrap'
};

const leftColumnStyle = {
  flex: '1 1 600px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
};

const rightColumnStyle = {
  width: '280px',
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
};

const boxStyle = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '16px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
};

const titleStyle = {
  marginBottom: '14px',
  fontWeight: '600',
  fontSize: '16px'
};

const patientCardStyle = {
  backgroundColor: '#fbfcfc',
  borderRadius: '8px',
  padding: '12px',
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  transition: 'background 0.3s'
};

const patientCardLeftStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
};

const patientNameStyle = {
  fontSize: '15px',
  fontWeight: '600',
  color: '#333'
};

const patientRoomStyle = {
  fontSize: '13px',
  color: '#777'
};

const criticalBadgeStyle = {
  backgroundColor: '#ff6b6b',
  color: '#fff',
  padding: '3px 6px',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: 'bold',
  marginRight: '6px'
};

const stableBadgeStyle = {
  backgroundColor: '#ffd36e',
  color: '#333',
  padding: '3px 6px',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: 'bold',
  marginRight: '6px'
};

const patientCardRightStyle = {
  textAlign: 'right',
  fontSize: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
};

const subInfoStyle = {
  fontSize: '12px',
  color: '#555'
};

const tabContainerStyle = {
  display: 'flex',
  gap: '8px',
  marginBottom: '12px'
};

const tabStyle = (active) => ({
  backgroundColor: active ? '#d1ffd4' : '#f1f3f4',
  padding: '6px 12px',
  borderRadius: '20px',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: '500',
  transition: 'background 0.2s',
  color: '#333'
});

const interconsultaItemStyle = {
  backgroundColor: '#f9fafa',
  borderRadius: '6px',
  padding: '12px',
  marginBottom: '8px',
  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)'
};

const buttonStyle = {
  backgroundColor: '#4285f4',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 16px',
  cursor: 'pointer',
  fontWeight: '500',
  marginTop: '10px'
};

const bigButtonStyle = {
  backgroundColor: '#34a853',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '14px 20px',
  fontWeight: '600',
  cursor: 'pointer',
  width: '100%',
  marginBottom: '12px',
  textAlign: 'center',
  fontSize: '14px'
};

const toggleContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
  justifyContent: 'space-between'
};

const toggleLabelStyle = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#555'
};

const DashboardDoctor = () => {
  return (
    <div style={containerStyle}>

      {/* Estadísticas (arriba) */}
      <div style={statsRowStyle}>
        <div style={statCardStyle}>
          <div style={statTitleStyle}>Pacientes Recientes</div>
          <div style={statNumberStyle}>16</div>
        </div>
        <div style={statCardStyle}>
          <div style={statTitleStyle}>Total de Pacientes</div>
          <div style={statNumberStyle}>218</div>
        </div>
        <div style={statCardStyle}>
          <div style={statTitleStyle}>Interconsultas Pendientes</div>
          <div style={statNumberStyle}>8</div>
        </div>
      </div>

      {/* Contenido principal (2 columnas) */}
      <div style={mainContentStyle}>

        {/* Columna Izquierda */}
        <div style={leftColumnStyle}>

          {/* Pacientes Recientes */}
          <div style={boxStyle}>
            <h3 style={titleStyle}>Pacientes Recientes</h3>
            {pacientesRecientes.map((pac) => (
              <div
                key={pac.id}
                style={patientCardStyle}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#eef7ee'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#fbfcfc'; }}
              >
                <div style={patientCardLeftStyle}>
                  <div style={patientNameStyle}>{pac.nombre}</div>
                  <div style={patientRoomStyle}>
                    {pac.edad} años &middot; Hab. {pac.habitacion}
                  </div>
                </div>

                {/* Sección derecha (estado, vitales) */}
                <div style={patientCardRightStyle}>
                  <div>
                    {pac.estado === 'Crítico' && <span style={criticalBadgeStyle}>{pac.estado}</span>}
                    {pac.estado === 'Estable' && <span style={stableBadgeStyle}>{pac.estado}</span>}
                    <span style={{ color: pac.estado === 'Crítico' ? '#e56767' : '#444' }}>
                      {pac.temperatura}
                    </span>
                    &nbsp;| {pac.presion}
                  </div>
                  {/* Alergias */}
                  <div>
                    {pac.alergias.map((al, i) => (
                      <span key={i} style={{ marginRight: '6px', color: '#777' }}>
                        ⚠ {al}
                      </span>
                    ))}
                  </div>
                  {/* Próxima revisión / medicación */}
                  <div style={subInfoStyle}>
                    Próx. revisión: {pac.proximaRevision} <br />
                    {pac.medicacionPendiente && 'Medicación pendiente'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interconsultas (Tabs) */}
          <div style={boxStyle}>
            <div style={tabContainerStyle}>
              <div style={tabStyle(true)}>Interconsultas</div>
              <div style={tabStyle(false)}>Pendiente</div>
              <div style={tabStyle(false)}>Historial</div>
            </div>
            
            {interconsultas.map((intc) => (
              <div key={intc.id} style={interconsultaItemStyle}>
                <strong>{intc.doctor}</strong>{' '}
                <span style={{ fontSize: '12px', color: '#777' }}>
                  ({intc.especialidad})
                </span>
                <br />
                <span style={{ fontSize: '13px' }}>Paciente: {intc.paciente}</span>
                <br />
                <small>
                  {intc.estado} - {intc.hace}
                </small>
              </div>
            ))}

            <button style={buttonStyle}>Nueva Interconsulta</button>
          </div>
        </div>

        {/* Columna Derecha */}
        <div style={rightColumnStyle}>

          {/* Botones grandes */}
          <button style={bigButtonStyle}>Buscar Paciente</button>
          <button style={bigButtonStyle}>Crear Historia Clínica</button>

          {/* Turno */}
          <div style={boxStyle}>
            <h4 style={{ marginBottom: '12px', fontWeight: '600' }}>Turno</h4>
            <div style={toggleContainerStyle}>
              <span style={toggleLabelStyle}>Estado:</span>
              <span style={{ color: '#bbb', marginRight: '8px' }}>Fuera de Consulta</span>
              <input
                type="checkbox"
                onChange={() => {}}
                style={{ transform: 'scale(1.2)' }}
              />
            </div>
            <div style={{ fontSize: '14px', marginBottom: '8px' }}>
              <strong>Información</strong>
              <div style={{ marginTop: '4px' }}>
                <span>Mañana: 8:00 AM - 2:00 PM</span> &nbsp;|&nbsp;
                <span>Tarde: 8:00 AM - 2:00 PM</span>
              </div>
            </div>
            <div style={{ fontSize: '14px' }}>
              <strong>Detalles del Turno</strong>
              <div style={{ marginTop: '4px' }}>Horario: 8:00 AM - 2:00 PM</div>
              <div>Citas Programadas: 12</div>
            </div>
          </div>

          {/* Notificaciones */}
          <div style={boxStyle}>
            <h4 style={{ marginBottom: '12px', fontWeight: '600' }}>Notificaciones</h4>
            {notificaciones.map((n) => (
              <div key={n.id} style={{ marginBottom: '10px', fontSize: '13px', lineHeight: '1.4' }}>
                <strong>{n.emisor}</strong>
                <br />
                {n.mensaje}{' '}
                <span style={{ color: '#999', fontSize: '12px' }}>
                  ({n.hora})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDoctor;
