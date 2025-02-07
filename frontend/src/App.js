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
import HistoriaClinica from "./modules/Admin/HistoriaClinica/HistoriaClinica/HistoriaClinica";
import Plantillas from "./modules/Admin/HistoriaClinica/SubMenuHistoriaClinica/Plantilla/TipoFormulario";
import Formularios from "./modules/Admin/HistoriaClinica/SubMenuHistoriaClinica/Formulario/FormularioWizard";
import FirmaElectronica from "./modules/Admin/Users/SubMenu/FirmaEletronica/FirmaElectronica";

// Módulos del Doctor
import DashboardDoctor from "./modules/Doctor/DashboardDoctor";
import PacientesDoctor from "./modules/Doctor/Pacientes/PacientesDoctor";
import HistoriasDoctor from "./modules/Doctor/HistoriaClinica/HistoriasDoctor";
import FormulariosDoctor from "./modules/Doctor/HistoriaClinica/Formulario/FormularioWizard";

// Módulos de la Enfermera
import DashboardEnfermera from "./modules/Enfermera/DashboardEnfermera";
import PacientesEnfermera from "./modules/Enfermera/PacientesEnfermera/PacientesEnfermera";
import HistoriasEnfermera from "./modules/Enfermera/HistoriaClinica/HistoriasEnfermera";
import FormularioWizardEnfermera from "./modules/Enfermera/HistoriaClinica/Formulario/FormularioWizard";


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
                    { to: "/admin/patients", label: "Pacientes" },
                    {
                        to: "/admin/historia-clinica",
                        label: "Historia Clínica",
                        subMenu: [
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
                    },
                    { to: "/enfermera/historias", label: "Historias Clínicas" },
                    { to: "/enfermera/historias/formulario", label: "Formularios" }
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

            <Route
                path="/admin/*"
                element={
                    <Routes>
                        <Route path="dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
                        <Route path="users" element={<AdminLayout><Users /></AdminLayout>} />
                        <Route path="users/firma-electronica" element={<AdminLayout><FirmaElectronica /></AdminLayout>} />
                        <Route path="patients" element={<AdminLayout><Patients /></AdminLayout>} />
                        <Route path="historia-clinica" element={<AdminLayout><HistoriaClinica /></AdminLayout>} />
                        <Route path="historia-clinica/plantillas" element={<AdminLayout><Plantillas /></AdminLayout>} />
                        <Route path="historia-clinica/formularios" element={<AdminLayout><Formularios /></AdminLayout>} />
                    </Routes>
                }
            />

            <Route
                path="/doctor/*"
                element={
                    <Routes>
                        <Route path="dashboard" element={<DoctorLayout><DashboardDoctor /></DoctorLayout>} />
                        <Route path="pacientes" element={<DoctorLayout><PacientesDoctor /></DoctorLayout>} />
                        <Route path="historias" element={<DoctorLayout><HistoriasDoctor /></DoctorLayout>} />
                        <Route path="historias/formulariosDoctor" element={<DoctorLayout><FormulariosDoctor /></DoctorLayout>} />
                    </Routes>
                }
            />

            <Route
                path="/enfermera/*"
                element={
                    <Routes>
                        <Route path="dashboard" element={<EnfermeraLayout><DashboardEnfermera /></EnfermeraLayout>} />
                        <Route path="pacientes" element={<EnfermeraLayout><PacientesEnfermera /></EnfermeraLayout>} />
                        <Route path="historias" element={<EnfermeraLayout><HistoriasEnfermera /></EnfermeraLayout>} />
                        <Route path="historias/formulariosEnfermera" element={<EnfermeraLayout><FormularioWizardEnfermera /></EnfermeraLayout>} /></Routes>
                }
            />

            <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
    );
}

export default App;
