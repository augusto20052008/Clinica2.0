import React from 'react';
import '../../styles/components/comingSoon.css';

const ComingSoon = ({ message = "Próximamente", subMessage = "Estamos trabajando en esta funcionalidad." }) => {
  return (
    <div className="coming-soon-container">
      <div className="spinner"></div>
      <h1 className="coming-soon-title">{message}</h1>
      <p className="coming-soon-subtext">{subMessage}</p>
    </div>
  );
};

export default ComingSoon;
