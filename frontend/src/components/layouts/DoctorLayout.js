import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import '../../styles/layouts/DoctorLayout.css';

import { AiOutlineDashboard } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { FaBookMedical } from 'react-icons/fa';

function DoctorLayout({ children }) {
  return (
    <div className="doctor-layout">
      {/* Columna Izquierda */}
      <Sidebar
        links={[
          { label: 'Dashboard', to: '/doctor/dashboard', icon: <AiOutlineDashboard /> },
          { 
            label: 'Pacientes', 
            to: '/doctor/pacientes', 
            icon: <BiUserCircle />, 
            subMenu: [
              { label: 'Referidos', to: '/doctor/pacientes/referidoDoctor' }, 
            ],
          },
          { 
            label: 'Historias Clínicas', 
            to: '/doctor/historias', 
            icon: <FaBookMedical />,
            subMenu: [
              { label: 'Formulario', to: '/doctor/historias/formulariosDoctor' }, 
            ],
          }
        ]}
      />

      <div className="doctor-main">
        <Header username="Doctor" profilePic="https://via.placeholder.com/40" />

        <div className="doctor-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DoctorLayout;
