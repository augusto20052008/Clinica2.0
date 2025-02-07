import axios from 'axios';
import { isTokenExpired } from './authUtils';

const API = axios.create({
    baseURL: 'http://localhost:3301',
    timeout: 10000,
});

API.interceptors.request.use(
    (config) => {
        if (!config.url.includes('/auth/login')) {
            const token = localStorage.getItem('jwt_token');
            if (token && !isTokenExpired(token)) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const loginRequest = async (credentials) => {
    try {
        const response = await API.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error("Error en loginRequest:", error);
        throw error.response
            ? error.response.data
            : { error: 'Error en el servidor' };
    }
};

// Roles
export const fetchRoles = async () => {
    try {
        const response = await API.get('/rol/');
        return response.data;
    } catch (error) {
        console.error("Error al obtener roles:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error al obtener los roles.");
    }
};

// Usuario
export const fetchUsers = async () => {
    try {
        const response = await API.get('/usuario/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error.response
            ? error.response.data
            : { error: 'Error en el servidor' };
    }
};

export const fetchUsersWithInfo = async () => {
    try {
        const response = await API.get('/usuario/');
        const users = response.data;

        // Obtiene la información personal de cada usuario
        const usersWithInfo = await Promise.all(users.map(async (user) => {
            try {
                const personalInfo = await API.get(`/uip/usuario/${user.id_usuario}`);
                return { ...user, ...personalInfo.data }; // Une los datos
            } catch (error) {
                console.warn(`No se encontró información personal para el usuario ${user.id_usuario}`);
                return { ...user, cedula: null, nombres: "Desconocido", apellidos: "Desconocido" };
            }
        }));

        return usersWithInfo;
    } catch (error) {
        console.error("Error al obtener usuarios con información personal:", error);
        throw error;
    }
};


export const fetchUserDetails = async (idUsuario) => {
    try {
        const usuario = await API.get(`/usuario/${idUsuario}`);
        const informacionPersonal = await API.get(`/uip/usuario/${idUsuario}`).catch(() => null);
        const informacionAcademica = await API.get(`/uia/usuario/${idUsuario}`).catch(() => null);
        const informacionContacto = await API.get(`/uic/usuario/${idUsuario}`).catch(() => null);

        return {
            ...usuario.data,
            informacion_personal: informacionPersonal?.data || null,
            informacion_academica: informacionAcademica?.data || null,
            informacion_contacto: informacionContacto?.data || null,
        };
    } catch (error) {
        console.error("Error en fetchUserDetails:", error);
        return null;
    }
};

export const fetchUserPersonalInfo = async (idUsuario) => {
    try {
        const response = await API.get(`/uip/usuario/${idUsuario}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener información personal:", error);
        throw error;
    }
};

export const fetchUserAcademicInfo = async (idUsuario) => {
    try {
        const response = await API.get(`/uia/${idUsuario}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener información académica:", error);
        throw error;
    }
};

export const fetchUserContactInfo = async (idUsuario) => {
    try {
        const response = await API.get(`/uic/${idUsuario}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener información de contacto:", error);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const response = await API.post('/usuario/', userData);
        return response.data;
    } catch (error) {
        console.error('Error en createUser:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al crear el usuario.');
    }
};

export const createUserPersonalInfo = async (personalInfo) => {
    try {
        const response = await API.post('/uip/', personalInfo);
        return response.data;
    } catch (error) {
        console.error('Error en createUserPersonalInfo:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al crear información personal.');
    }
};

export const createUserAcademicInfo = async (academicInfo) => {
    try {
        const response = await API.post('/uia/', academicInfo);
        return response.data;
    } catch (error) {
        console.error('Error en createUserAcademicInfo:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al crear información académica.');
    }
};

export const createUserContactInfo = async (contactInfo) => {
    try {
        const response = await API.post('/uic/', contactInfo);
        return response.data;
    } catch (error) {
        console.error('Error en createUserContactInfo:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al crear información de contacto.');
    }
};

export const updateUser = async (idUsuario, userData) => {
    try {
        const response = await API.put(`/usuario/${idUsuario}`, userData);
        return response.data;
    } catch (error) {
        console.error("Error en updateUser:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error al actualizar el usuario.");
    }
};

export const updateUserPersonalInfo = async (id, dataInformacionPersonal) => {
    try {
        const response = await API.put(`/uip/${id}`, dataInformacionPersonal);
        return response.data;
    } catch (error) {
        console.error("Error en updateUserPersonalInfo:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error al actualizar información personal.");
    }
};

export const updateUserAcademicInfo = async (idInformacionAcademica, academicData) => {
    try {
        const response = await API.put(`/uia/${idInformacionAcademica}`, academicData);
        return response.data;
    } catch (error) {
        console.error("Error en updateUserAcademicInfo:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error al actualizar información académica.");
    }
};

export const updateUserContactInfo = async (idInformacionContacto, contactData) => {
    try {
        const response = await API.put(`/uic/${idInformacionContacto}`, contactData);
        return response.data;
    } catch (error) {
        console.error("Error en updateUserContactInfo:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error al actualizar información de contacto.");
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await API.delete(`/usuario/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar usuario:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error al eliminar el usuario.");
    }
};

export const downUser = async (id) => {
    try {
        const response = await API.delete(`/usuario/baja/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al dar de baja usuario:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error al dar de baja el usuario.");
    }
};

// Paciente
export const fetchPatients = async () => {
    try {
        const response = await API.get('/pacientes/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener pacientes:', error);
        throw error.response
            ? error.response.data
            : { error: 'Error en el servidor' };
    }
};

export const findPacienteById = async (identificacion) => {
    try {
        const response = await API.get(`/paciente/${identificacion}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        throw error;
    }
};

export const createPatient = async (patientData) => {
    try {
        const response = await API.post('/pacientes/', patientData);
        return response.data;
    } catch (error) {
        console.error('Error al agregar paciente:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al crear el paciente.');
    }
};

export const fetchPatientDetails = async (id) => {
    try {
        const response = await API.get(`/pacientes/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener detalles del paciente:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error al obtener los datos del paciente.");
    }
};

export const updatePatient = async (identificacion, patientData) => {
    try {
        const response = await API.put(`/pacientes/${identificacion}`, patientData); // Verifica que la ruta sea correcta
        return response.data;
    } catch (error) {
        console.error('Error al actualizar paciente:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error al actualizar el paciente.');
    }
};

export const deletePatient = async (id) => {
    try {
        const response = await API.delete(`/pacientes/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar paciente:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error al eliminar el paciente.");
    }
};

// Historia Clinica 
export const fetchHistoriaClinica = async () => {
    try {
        const response = await API.get("/archivos/");
        return response.data;
    } catch (error) {
        console.error("Error al obtener las historias clínicas:", error);
        throw error.response ? error.response.data : { error: "Error en el servidor" };
    }
};

export const createHistoriaClinica = async (data) => {
    try {
        const response = await API.post("/archivos/", data);
        return response.data;
    } catch (error) {
        console.error("Error al crear historia clínica:", error);
        throw error.response ? error.response.data : { error: "Error en el servidor" };
    }
};

export const updateHistoriaClinica = async (nroArchivo, data) => {
    try {
        const response = await API.put(`/archivos/${nroArchivo}`, data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar historia clínica:", error);
        throw error.response ? error.response.data : { error: "Error en el servidor" };
    }
};

export const deleteHistoriaClinica = async (nroArchivo) => {
    try {
        const response = await API.delete(`/archivos/${nroArchivo}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar historia clínica:", error);
        throw error.response ? error.response.data : { error: "Error en el servidor" };
    }
};

//Firma Electronica

export const fetchFirmaElectronica = async () => {
    try {
        const response = await API.get("/firma/");
        return response.data;
    } catch (error) {
        console.error("Error al obtener las firmas electrónicas:", error.response?.data || error.message);
        throw error.response ? error.response.data : { error: "Error en el servidor" };
    }
};

export const fetchFirmaElectronicaById = async (id) => {
    try {
        const response = await API.get(`/firma/${id}`);
        return response.data; // Devuelve los datos de la firma electrónica
    } catch (error) {
        console.error("Error al obtener la firma electrónica:", error.response?.data || error.message);
        throw error.response ? error.response.data : { error: "Error en el servidor" };
    }
};

export const createFirmaElectronica = async (firmaData) => {
    try {
        const response = await API.post("/firma/", firmaData);
        return response.data; // Devuelve los datos de la nueva firma creada
    } catch (error) {
        console.error("Error al crear la firma electrónica:", error.response?.data || error.message);
        throw error.response ? error.response.data : { error: "Error en el servidor" };
    }
};

export const updateFirmaElectronica = async (idFirma, payload) => {
    try {
        const response = await API.put(`/firma/${idFirma}`, payload);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la firma electrónica:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error al actualizar la firma electrónica.");
    }
};

export const deleteFirmaElectronica = async (id) => {
    try {
        const response = await API.delete(`/firma/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar la firma electrónica:", error.response?.data || error.message);
        throw error.response ? error.response.data : { error: "Error en el servidor" };
    }
};

//Tipos de Formulario

export const fetchTiposFormulario = async () => {
    try {
        const response = await API.get('/formularios/tipos');
        return response.data;
    } catch (error) {
        console.error('Error al obtener tipos de formulario:', error);
        throw error;
    }
};

export const fetchTipoFormularioById = async (id) => {
    try {
        const response = await API.get(`/formularios/tipos/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el tipo de formulario por ID:', error);
        throw error;
    }
};

export const createTipoFormulario = async (data) => {
    try {
        const response = await API.post('/formularios/tipos', data);
        return response.data;
    } catch (error) {
        console.error('Error al crear tipo de formulario:', error);
        throw error;
    }
};

export const updateTipoFormulario = async (id, data) => {
    try {
        const response = await API.put(`/formularios/tipos/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar tipo de formulario:', error);
        throw error;
    }
};

export const deleteTipoFormulario = async (id) => {
    try {
        const response = await API.delete(`/formularios/tipos/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar tipo de formulario:', error);
        throw error;
    }
};

// Campos

export const fetchCampoFormularioById = async (idCampo) => {
    try {
        const response = await API.get(`/campos/${idCampo}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el campo de formulario por ID:", error);
        throw error.response
            ? error.response.data
            : { error: "Error en el servidor" };
    }
};

export const fetchCamposFormulario = async (idFormularioTipo) => {
    try {
        const response = await API.get(`/campos/formulario_tipo/${idFormularioTipo}`);
        const data = response.data;
        if (Array.isArray(data)) {
            return data;
        } else if (typeof data === 'object' && data !== null) {
            return [data];
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error al obtener campos de formulario:', error);
        return [];
    }
};

export const fetchCamposByFormularioYSeccion = async (idFormulario, idSeccion) => {
    try {
        const response = await API.get(`/campos/${idFormulario}/${idSeccion}`);
        return response.data;
    } catch (error) {
        console.error('Error al crear campo de formulario:', error);
        throw error;
    }
};

export const createCampoFormulario = async (data) => {
    try {
        const response = await API.post('/campos/', data);
        return response.data;
    } catch (error) {
        console.error('Error al crear campo de formulario:', error);
        throw error;
    }
};

export const createCampo = async (data) => {
    try {
        const response = await API.post('/campos/', data);
        return response.data;
    } catch (error) {
        console.error('Error al crear campo de formulario:', error);
        throw error;
    }
};

export const updateCampoFormulario = async (id, data) => {
    try {
        const response = await API.put(`/campos/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar campo de formulario:", error);
        throw error;
    }
};

export const deleteCampoFormulario = async (id) => {
    try {
        const response = await API.delete(`/campos/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar campo de formulario:', error);
        throw error;
    }
};

//Seccion
export const fetchSeccionByTipoFormulario = async (idFormulario) => {
    try {
        const response = await API.get(`/seccion/${idFormulario}`);
        return response.data;
    } catch (error) {
        console.error('Error al crear campo de formulario:', error);
        throw error;
    }
};

export const fetchSeccionByTipoFormularioYSeccion = async (idFormulario,idSeccion) => {
    try {
        const response = await API.get(`/campos/${idFormulario}/${idSeccion}`);
        return response.data;
    } catch (error) {
        console.error('Error al crear campo de formulario:', error);
        throw error;
    }
};

export const createSeccion = async (data) => {
    try {
        const response = await API.post('/seccion/', data);
        return response.data;
    } catch (error) {
        console.error('Error al crear campo de formulario:', error);
        throw error;
    }
};

export const deleteSeccion = async (idSeccion) => {
    try {
        const response = await API.delete(`/seccion/${idSeccion}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar tipo de formulario:', error);
        throw error;
    }
};

// Formulario

export const fetchFormularios = async () => {
    try {
        const response = await API.get('/formularios/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener formularios:', error);
        throw error;
    }
};

export const createFormulario = async (data) => {
    try {
        const response = await API.post('/formularios/', data);
        return response.data;
    } catch (error) {
        console.error('Error al crear campo de formulario:', error);
        throw error;
    }
};

// Eliminar formulario
export const deleteFormulario = async (id) => {
    try {
        await API.delete(`/formularios/${id}`);
    } catch (error) {
        console.error('Error al eliminar formulario:', error);
        throw error;
    }
};

export const asignarFormularioAHistoria = async (nroArchivo, idFormulario) => {
    try {
        const response = await API.put(`/archivos/${nroArchivo}/formulario`, { id_formulario: idFormulario });
        return response.data;
    } catch (error) {
        console.error("Error al asignar formulario a la historia clínica:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error al asignar formulario.");
    }
};

export const fetchFormularioById = async (id) => {
    try {
        const response = await API.get(`/formularios/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el formulario por ID:", error);
        throw error.response ? error.response.data : { error: "Error en el servidor" };
    }
};


// Guardar respuestas de un formulario
export const fetchFormularioRespuesta= async () => {
    try {
        const response = await API.get(`/respuestas/`);
        console.log(`fetchFormularioRespuestabyId: ${response}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el formulario por ID:", error);
        throw error.response ? error.response.data : { error: "Error en el servidor" };
    }
};

export const fetchFormularioRespuestabyId= async (idFormulario, idCampo) => {
    try {
        const response = await API.get(`/respuestas/${idFormulario}/${idCampo}`);
        console.log(`fetchFormularioRespuestabyId: ${response}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el formulario por ID:", error);
        throw error.response ? error.response.data : { error: "Error en el servidor" };
    }
};

export const guardarRespuestasFormulario = async (respuestas) => {
    try {
        const response = await API.post('/respuestas/', respuestas);

        return response.data;
    } catch (error) {
        console.error('Error al guardar respuestas del formulario:', error);
        throw new Error(error.response?.data?.message || "Error al guardar respuestas.");
    }
};

export const editarRespuestaCampo = async (data) => {
    try {
        const response = await API.put('/respuestas/', data);

        return response.data;
    } catch (error) {
        console.error('Error al guardar respuestas del formulario:', error);
        throw new Error(error.response?.data?.message || "Error al guardar respuestas.");
    }
};
