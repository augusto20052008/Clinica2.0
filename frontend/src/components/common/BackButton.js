import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../../styles/components/BackButton.css';

function BackButton({ to, onClick }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    } else {
      navigate(-1); // Regresa a la página anterior
    }
  };

  return (
    <button className="back-button" onClick={handleBack}>
      <FaArrowLeft className="back-icon" />
    </button>
  );
}

export default BackButton;
