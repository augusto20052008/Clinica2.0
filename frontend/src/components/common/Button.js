import React from 'react';
import '../../styles/components/button.css';

const Button = ({ label, onClick, className = 'primary' }) => (
  <button className={`button ${className}`} onClick={onClick}>
    {label}
  </button>
);

export default Button;
