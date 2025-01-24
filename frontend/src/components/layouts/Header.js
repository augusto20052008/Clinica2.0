import React from 'react';
import { AiOutlineBell } from 'react-icons/ai';
import '../../styles/layouts/header.css'; 

function Header({ username, profilePic }) {
  return (
    <div className="header">
      <h1>
        Bienvenido, <span>{username}</span>
      </h1>
      <div className="header-right">
        <AiOutlineBell className="notification-icon" />
        <div className="profile">
          <img
            src={profilePic}
            alt="Perfil"
            className="profile-pic"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
