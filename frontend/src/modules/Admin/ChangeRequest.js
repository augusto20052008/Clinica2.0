import React from 'react';

// 1. Datos de ejemplo (hardcodeados)
const solicitudesData = [
  {
    id: 1,
    doctor: 'Dr. Daniel Martínez',
    paciente: 'Ángel Pérez',
    tipoHistoria: 'CONSULTA EXTERNA / ANAMNESIS',
    motivo: 'Ajuste de dosis...',
    justificacion: 'Valores de glucosa elevados...',
    hora: '11:00 PM'
  },
  {
    id: 2,
    doctor: 'Dr. Daniel Martínez',
    paciente: 'Ana López',
    tipoHistoria: 'EMERGENCIA / INGRESO',
    motivo: 'Urgencia respiratoria...',
    justificacion: 'Posible cambio de ventilación',
    hora: '10:30 PM'
  },
  {
    id: 3,
    doctor: 'Dr. Gabriel Torres',
    paciente: 'Juan Ríos',
    tipoHistoria: 'HOSPITALIZACIÓN / POST-OP',
    motivo: 'Revisión de suturas...',
    justificacion: 'Infección potencial en herida',
    hora: '09:15 PM'
  },
  {
    id: 4,
    doctor: 'Dra. María Delgado',
    paciente: 'Karina Flores',
    tipoHistoria: 'CONSULTA EXTERNA / ANAMNESIS',
    motivo: 'Dolor persistente...',
    justificacion: 'Cambiar analgésico actual',
    hora: '08:45 PM'
  }
];

// 2. Definimos cuántos cuadros queremos en total (5x5 = 25)
const TOTAL_CUADROS = 25;

// 3. Estilos “inline” para un look más profesional
const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#f0f2f5',
  padding: '40px',
  fontFamily: 'Segoe UI, Tahoma, sans-serif',
  color: '#333'
};

const titleStyle = {
  textAlign: 'center',
  fontSize: '28px',
  marginBottom: '30px',
  fontWeight: 'bold',
  color: '#40916c'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',  // 5 columnas
  gap: '20px',
  maxWidth: '1200px',
  margin: '0 auto'
};

const cardBaseStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'all 0.3s ease'
};

const cardHoverStyle = {
  transform: 'scale(1.02)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
};

const doctorStyle = {
  fontWeight: '600',
  fontSize: '15px',
  marginBottom: '8px'
};

const detailStyle = {
  fontSize: '14px',
  lineHeight: '1.4',
  marginBottom: '10px'
};

const hourStyle = {
  fontSize: '13px',
  color: '#666',
  textAlign: 'right',
  marginBottom: '8px'
};

const buttonStyle = {
  backgroundColor: '#007BFF',
  border: 'none',
  borderRadius: '5px',
  color: '#fff',
  padding: '7px 12px',
  cursor: 'pointer',
  fontWeight: '500',
  fontSize: '14px',
  alignSelf: 'flex-end',
  transition: 'background 0.2s'
};

const buttonHoverStyle = {
  backgroundColor: '#0056b3'
};

// Para cuadros “vacíos”
const emptyTextStyle = {
  fontSize: '14px',
  color: '#bbb',
  margin: 'auto',
  textAlign: 'center'
};

const SolicitudCambioGrid = () => {
  // 4. Controlamos el “hover” en tarjetas y en botón (opcional)
  const [hoveredCard, setHoveredCard] = React.useState(null);
  const [hoveredButton, setHoveredButton] = React.useState(null);

  const handleCardMouseEnter = (idx) => setHoveredCard(idx);
  const handleCardMouseLeave = () => setHoveredCard(null);

  const handleButtonMouseEnter = (idx) => setHoveredButton(idx);
  const handleButtonMouseLeave = () => setHoveredButton(null);

  // 5. Función para “pintar” el contenido de cada cuadro
  const renderCard = (idx) => {
    // Si hay una solicitud para este índice
    if (idx < solicitudesData.length) {
      const solicitud = solicitudesData[idx];

      // Combinamos estilos base y hover
      const cardStyle =
        hoveredCard === idx
          ? { ...cardBaseStyle, ...cardHoverStyle }
          : cardBaseStyle;

      return (
        <div
          key={solicitud.id}
          style={cardStyle}
          onMouseEnter={() => handleCardMouseEnter(idx)}
          onMouseLeave={handleCardMouseLeave}
        >
          {/* Parte superior: Doctor, Paciente... */}
          <div>
            <div style={doctorStyle}>{solicitud.doctor}</div>
            <div style={detailStyle}>
              <strong>Paciente:</strong> {solicitud.paciente} <br />
              <strong>Historia:</strong> {solicitud.tipoHistoria} <br />
              <strong>Motivo:</strong> {solicitud.motivo} <br />
              <strong>Justif.:</strong> {solicitud.justificacion}
            </div>
          </div>

          {/* Parte inferior: Hora + Botón */}
          <div>
            <div style={hourStyle}>{solicitud.hora}</div>
            <button
              style={
                hoveredButton === idx
                  ? { ...buttonStyle, ...buttonHoverStyle }
                  : buttonStyle
              }
              onMouseEnter={() => handleButtonMouseEnter(idx)}
              onMouseLeave={handleButtonMouseLeave}
            >
              Visualizar
            </button>
          </div>
        </div>
      );
    } else {
      // Si no hay más solicitudes (espacio vacío)
      const cardStyle =
        hoveredCard === idx
          ? { ...cardBaseStyle, ...cardHoverStyle }
          : cardBaseStyle;

      return (
        <div
          key={idx}
          style={cardStyle}
          onMouseEnter={() => handleCardMouseEnter(idx)}
          onMouseLeave={handleCardMouseLeave}
        >
          <div style={emptyTextStyle}>Sin Solicitud</div>
        </div>
      );
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Solicitud de Cambio </h2>

      <div style={gridStyle}>
        {Array(TOTAL_CUADROS)
          .fill(null)
          .map((_, index) => renderCard(index))}
      </div>
    </div>
  );
};

export default SolicitudCambioGrid;
