import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import '../../styles/layouts/EnfermeraLayout.css';

import { AiOutlineDashboard } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { FaBookMedical } from 'react-icons/fa';

function EnfermeraLayout({ children }) {
  return (
    <div className="enfermera-layout">
      <Sidebar
        links={[
          { label: 'Dashboard', to: '/enfermera/dashboard', icon: <AiOutlineDashboard /> },
          { 
            label: 'Pacientes', 
            to: '/enfermera/pacientes', 
            icon: <BiUserCircle />,
            subMenu: [
              { label: 'Referidos', to: '/enfermera/pacientes/referidoEnfermera' }, 
            ],
          },
          { 
            label: 'Historias Clínicas', 
            to: '/enfermera/historias', 
            icon: <FaBookMedical />,
            subMenu: [
              { label: 'Formulario', to: '/enfermera/historias/formulariosEnfermera' }, 
            ], 
          }
        ]}
      />

      <div className="enfermera-main">
        <Header username="Enfermera" profilePic="https://via.placeholder.com/40" />

        <div className="enfermera-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default EnfermeraLayout;
