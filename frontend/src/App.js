import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { isTokenExpired } from "./utils/authUtils";

// Componentes generales
import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";
import Login from "./modules/Login/Login";

// Layouts específicos
import AdminLayout from "./components/layouts/AdminLayout";
import DoctorLayout from "./components/layouts/DoctorLayout";
import EnfermeraLayout from "./components/layouts/EnfermeraLayout";

// Módulos del Administrador
import Dashboard from "./modules/Admin/Dashboard";
import Users from "./modules/Admin/Users/Users";
import Patients from "./modules/Admin/Patients/Patients";
import PatientProfilePage from "./modules/Admin/Patients/PatientProfilePage";
import Referido from "./modules/Admin/Patients/Referido/Referido";
import ChangeRequest from "./modules/Admin/ChangeRequest";
import HistoriaClinica from "./modules/Admin/HistoriaClinica/HistoriaClinica/HistoriaClinica";
import Establecimiento from "./modules/Admin/HistoriaClinica/SubMenuHistoriaClinica/Establecimiento/Establecimiento";
import Plantillas from "./modules/Admin/HistoriaClinica/SubMenuHistoriaClinica/Plantilla/Plantillas";
import Formularios from "./modules/Admin/HistoriaClinica/SubMenuHistoriaClinica/Formulario/Formularios";
import FirmaElectronica from "./modules/Admin/Users/SubMenu/FirmaEletronica/FirmaElectronica";
import Jornada from "./modules/Admin/Users/SubMenu/Jornada/Jornada";
import Titulo from "./modules/Admin/Users/SubMenu/Titulo/Titulo";

// Módulos del Doctor
import DashboardDoctor from "./modules/Doctor/DashboardDoctor";
import PacientesDoctor from "./modules/Doctor/Pacientes/PacientesDoctor";
import ReferidoDoctor from "./modules/Doctor/Pacientes/Referidos/ReferidoDoctor";
import HistoriasDoctor from "./modules/Doctor/HistoriaClinica/HistoriasDoctor";
import FormulariosDoctor from "./modules/Doctor/HistoriaClinica/Formulario/Formularios";

// Módulos de la Enfermera
import DashboardEnfermera from "./modules/Enfermera/DashboardEnfermera";
import PacientesEnfermera from "./modules/Enfermera/PacientesEnfermera/PacientesEnfermera";
import ReferidoEnfermera from "./modules/Enfermera/PacientesEnfermera/Referido/ReferidoEnfermera";
import HistoriasEnfermera from "./modules/Enfermera/HistoriaClinica/HistoriasEnfermera";
import FormulariosEnfermera from "./modules/Enfermera/HistoriaClinica/Formulario/FormularioEnfermera";

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    const role = localStorage.getItem("userRole");

    if (!token || isTokenExpired(token)) {
      localStorage.clear();
      setIsAuthenticated(false);
      navigate("/");
    } else {
      setIsAuthenticated(true);

      const roleLinks = {
        Admin: [
          { to: "/admin/dashboard", label: "Dashboard" },
          {
            to: "/admin/users",
            label: "Usuarios",
            subMenu: [
              { to: "/admin/users/firma-electronica", label: "Firma Electrónica" },
              { to: "/admin/users/jornada", label: "Jornada" },
              { to: "/admin/users/titulo", label: "Título" },
            ],
          },
          {
            to: "/admin/patients",
            label: "Pacientes",
            subMenu: [
              { to: "/admin/patients/referido", label: "Referidos" },
            ],
          },
          { to: "/admin/change", label: "Solicitudes de Cambio" },
          {
            to: "/admin/historia-clinica",
            label: "Historia Clínica",
            subMenu: [
              { to: "/admin/historia-clinica/establecimiento", label: "Establecimiento" },
              { to: "/admin/historia-clinica/plantillas", label: "Plantillas" },
              { to: "/admin/historia-clinica/formularios", label: "Formularios" },
            ],
          },
        ],
        Doctor: [
          { to: "/doctor/dashboard", label: "Dashboard" },
          {
            to: "/doctor/pacientes",
            label: "Pacientes",
            subMenu: [
              { to: "/doctor/pacientes/referidoDoctor", label: "Referidos" },
            ],
          },
          {
            to: "/doctor/historias",
            label: "Historias Clínicas",
            subMenu: [
              { to: "/doctor/historias/formulariosDoctor", label: "Formularios" },
            ],
          },
        ],
        Enfermera: [
          { to: "/enfermera/dashboard", label: "Dashboard" },
          {
            to: "/enfermera/paciente",
            label: "Pacientes",
            subMenu: [
              { to: "/enfermera/paciente/referidoEnfermera", label: "Referidos" },
            ],
          },
          {
            to: "/enfermera/historias",
            label: "Historias Clínicas",
            subMenu: [
              { to: "/enfermera/historias/formularioEnfermera", label: "Formularios" },
            ],
          },
        ],
      };

      setLinks(roleLinks[role] || []);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {isAuthenticated && (
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Sidebar links={links} onLogout={handleLogout} />
            </>
          }
        />
      )}

      <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
      <Route path="/admin/users" element={<AdminLayout><Users /></AdminLayout>} />
      <Route path="/admin/users/firma-electronica" element={<AdminLayout><FirmaElectronica /></AdminLayout>} />
      <Route path="/admin/users/jornada" element={<AdminLayout><Jornada /></AdminLayout>} />
      <Route path="/admin/users/titulo" element={<AdminLayout><Titulo /></AdminLayout>} />
      <Route path="/admin/patients" element={<AdminLayout><Patients /></AdminLayout>} />
      <Route path="/admin/patients/referido" element={<AdminLayout><Referido /></AdminLayout>} />
      <Route path="/admin/change" element={<AdminLayout><ChangeRequest /></AdminLayout>} />
      <Route path="/admin/historia-clinica" element={<AdminLayout><HistoriaClinica /></AdminLayout>} />
      <Route path="/admin/historia-clinica/establecimiento" element={<AdminLayout><Establecimiento /></AdminLayout>} />
      <Route path="/admin/historia-clinica/plantillas" element={<AdminLayout><Plantillas /></AdminLayout>} />
      <Route path="/admin/historia-clinica/formularios" element={<AdminLayout><Formularios /></AdminLayout>} />

      <Route path="/admin/patients/:identificacion" element={<PatientProfilePage />} />

      <Route path="/doctor/dashboard" element={<DoctorLayout><DashboardDoctor /></DoctorLayout>} />
      <Route path="/doctor/pacientes" element={<DoctorLayout><PacientesDoctor /></DoctorLayout>} />
      <Route path="/doctor/pacientes/referidoDoctor" element={<DoctorLayout><ReferidoDoctor /></DoctorLayout>} />
      <Route path="/doctor/historias" element={<DoctorLayout><HistoriasDoctor /></DoctorLayout>} />
      <Route path="/doctor/historias/formulariosDoctor" element={<DoctorLayout><FormulariosDoctor /></DoctorLayout>} />

      <Route path="/enfermera/dashboard" element={<EnfermeraLayout><DashboardEnfermera /></EnfermeraLayout>} />
      <Route path="/enfermera/pacientes" element={<EnfermeraLayout><PacientesEnfermera /></EnfermeraLayout>} />
      <Route path="/enfermera/pacientes/referidoEnfermera" element={<EnfermeraLayout><ReferidoEnfermera /></EnfermeraLayout>} />
      <Route path="/enfermera/historias" element={<EnfermeraLayout><HistoriasEnfermera /></EnfermeraLayout>} />
      <Route path="/enfermera/historias/formularioEnfermera" element={<EnfermeraLayout><FormulariosEnfermera /></EnfermeraLayout>} />

      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
}

export default App;
