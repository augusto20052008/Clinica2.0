import React from 'react';

// 1. Datos estáticos (hardcodeados)
const pacientesAsignados = [
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
    nombre: 'María González',
    edad: 45,
    habitacion: '201-A',
    estado: 'Crítico',
    temperatura: '38.5°C ↑',
    presion: '140/90',
    alergias: ['Alérgica a penicilina', 'Diabética'],
    proximaRevision: '15:30',
    medicacionPendiente: true
  }
];

const tareasDelDia = [
  {
    id: 1,
    hora: '08:00',
    paciente: 'Luis Morales',
    habitacion: '201',
    accion: 'Administrar medicamento',
    prioridad: 'Alta'
  },
  {
    id: 2,
    hora: '08:30',
    paciente: 'Luis Morales',
    habitacion: '201',
    accion: 'Administrar medicamento',
    prioridad: 'Media'
  },
  {
    id: 3,
    hora: '09:00',
    paciente: 'Ana López',
    habitacion: '105-B',
    accion: 'Curar herida',
    prioridad: 'Alta'
  }
];

const notificaciones = [
  { id: 1, emisor: 'Enf. Daniela Ordoñez', mensaje: 'Las pastillas del paciente Augusto lo dejaron en coma', hora: '11:30 AM' },
  { id: 2, emisor: 'Enf. Daniela Ordoñez', mensaje: 'Las pastillas del paciente Augusto lo dejaron en coma', hora: '11:30 AM' },
  { id: 3, emisor: 'Enf. Daniela Ordoñez', mensaje: 'Las pastillas del paciente Augusto lo dejaron en coma', hora: '11:30 AM' },
  { id: 4, emisor: 'Enf. Daniela Ordoñez', mensaje: 'Las pastillas del paciente Augusto lo dejaron en coma', hora: '11:30 AM' }
];

// 2. Estilos “inline” para un look suave y profesional
const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#f7f9fc',
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
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  textAlign: 'center',
  minWidth: '170px'
};

const statTitleStyle = {
  fontSize: '14px',
  color: '#666'
};

const statNumberStyle = {
  fontSize: '22px',
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
  width: '260px',
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
};

const boxStyle = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '16px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
};

const titleStyle = {
  marginBottom: '12px',
  fontWeight: '600',
  fontSize: '16px'
};

// Cards de paciente asignado
const patientCardStyle = {
  backgroundColor: '#f2f9f2',
  borderRadius: '8px',
  padding: '12px',
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start'
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

const infoRightStyle = {
  textAlign: 'right',
  fontSize: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
};

const subTextStyle = {
  fontSize: '13px',
  color: '#777'
};

// Tareas del día
const tableHeaderStyle = {
  display: 'grid',
  gridTemplateColumns: '40px 80px 1fr 1fr',
  fontWeight: '600',
  marginBottom: '8px',
  fontSize: '14px'
};

const tableRowStyle = {
  display: 'grid',
  gridTemplateColumns: '40px 80px 1fr 1fr',
  alignItems: 'center',
  marginBottom: '8px',
  borderRadius: '6px',
  backgroundColor: '#fafbfc',
  padding: '8px'
};

const priorityBadgeStyle = (priority) => {
  let colorBg = '#c7ffd0';
  let colorText = '#2e7d32';
  if (priority === 'Alta') {
    colorBg = '#ffdbdb';
    colorText = '#d32f2f';
  } else if (priority === 'Media') {
    colorBg = '#fff6cf';
    colorText = '#8c6f06';
  }

  return {
    backgroundColor: colorBg,
    color: colorText,
    padding: '3px 8px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 'bold',
    justifySelf: 'flex-start'
  };
};

// Botones
const greenButtonStyle = {
  backgroundColor: '#41b619',
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

const DashboardEnfermera = () => {
  return (
    <div style={containerStyle}>

      {/* Filas de estadísticas (arriba) */}
      <div style={statsRowStyle}>
        <div style={statCardStyle}>
          <div style={statTitleStyle}>Total de Pacientes</div>
          <div style={statNumberStyle}>8/12</div>
        </div>
        <div style={statCardStyle}>
          <div style={statTitleStyle}>Tareas Completadas</div>
          <div style={statNumberStyle}>12/18</div>
        </div>
        <div style={statCardStyle}>
          <div style={statTitleStyle}>Alertas</div>
          <div style={statNumberStyle}>3</div>
        </div>
      </div>

      {/* Contenido principal (2 columnas) */}
      <div style={mainContentStyle}>

        {/* Columna Izquierda */}
        <div style={leftColumnStyle}>

          {/* Pacientes asignados */}
          <div style={boxStyle}>
            <h3 style={titleStyle}>Pacientes asignados</h3>
            {pacientesAsignados.map((pac) => (
              <div key={pac.id} style={patientCardStyle}>
                <div>
                  <strong style={{ fontSize: '15px' }}>{pac.nombre}</strong><br />
                  <span style={{ fontSize: '13px', color: '#666' }}>
                    {pac.edad} años - Hab. {pac.habitacion}
                  </span>
                </div>

                <div style={infoRightStyle}>
                  <div>
                    {pac.estado === 'Crítico' && (
                      <span style={criticalBadgeStyle}>{pac.estado}</span>
                    )}
                    <span style={{ color: '#d9534f', marginRight: '5px' }}>
                      {pac.temperatura}
                    </span>
                    <span>{pac.presion}</span>
                  </div>
                  {/* Alergias */}
                  <div>
                    {pac.alergias.map((al, idx) => (
                      <span key={idx} style={{ marginRight: '5px' }}>
                        ⚠ {al}
                      </span>
                    ))}
                  </div>
                  {/* Próxima revisión */}
                  <div style={subTextStyle}>
                    Próx. revisión: {pac.proximaRevision}
                    {pac.medicacionPendiente && ' | Medicación pendiente'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tareas del Día */}
          <div style={boxStyle}>
            <h3 style={titleStyle}>Tareas del Día</h3>
            {/* Encabezado tipo tabla */}
            <div style={tableHeaderStyle}>
              <span></span>
              <span>Hora</span>
              <span>Paciente</span>
              <span>Acción</span>
            </div>
            {tareasDelDia.map((task) => (
              <div key={task.id} style={tableRowStyle}>
                <input type="checkbox" />
                <span>{task.hora}</span>
                <div>
                  {task.paciente}<br />
                  <small style={{ color: '#777' }}>Habitación {task.habitacion}</small>
                </div>
                <div>
                  {task.accion}<br />
                  <span style={priorityBadgeStyle(task.prioridad)}>
                    Prioridad {task.prioridad}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha */}
        <div style={rightColumnStyle}>

          {/* Botones */}
          <button style={greenButtonStyle}>Buscar Paciente</button>
          <button style={greenButtonStyle}>Signos Vitales</button>

          {/* Turno */}
          <div style={boxStyle}>
            <h4 style={{ marginBottom: '12px', fontWeight: '600' }}>Turno</h4>
            <div style={{ fontSize: '14px', marginBottom: '8px' }}>
              <strong>Estado:</strong>{' '}
              <span style={{ color: '#aaa' }}>Fuera de Consulta</span>{' '}
              <input
                type="checkbox"
                style={{ marginLeft: '8px' }}
                onChange={() => {}}
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
                <strong>{n.emisor}</strong><br />
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

export default DashboardEnfermera;
