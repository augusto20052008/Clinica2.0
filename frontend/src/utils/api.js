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

// Funciones para las peticiones
// Petición para iniciar sesión
export const loginRequest = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { error: 'Error en el servidor' };
  }
};

// Usuario
export const fetchUsers = async (page = 1, limit = 10) => {
  try {
    const response = await API.get(`/user?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};


export const createUser = async (userData) => {
  try {
    const response = await API.post("/user/", userData);
    return response.data.data;
  } catch (error) {
    console.error("Error en createUser:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al crear usuario.");
  }
};


export const fetchUserDetails = async (identificacion) => {
  try {
    const response = await API.get(`/user/${identificacion}`);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error('Usuario no encontrado');
  } catch (error) {
    console.error('Error al obtener los detalles del usuario:', error);
    throw error;
  }
};


export const updateUser = async (identificacion, data) => {
  try {
    const response = await API.put(`/user/${identificacion}`, data);
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud PUT:', error.response?.data || error.message);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const removeUser = async (identificacion) => {
  try {
    // Asegúrate de que la URL esté correctamente formada como string
    const response = await API.delete(`/user/${identificacion}`);
    console.log(`Iniciando eliminación para: ${identificacion}`); // Log para depurar
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud DELETE:', error.response?.data || error.message);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};


// Firma Electronica 

export const fetchFirmas = async () => {
  try {
    const response = await API.get('/firmaelectronica');
    return response.data.data; // Asumiendo que `data` contiene las firmas.
  } catch (error) {
    console.error('Error al obtener firmas electrónicas:', error);
    throw error;
  }
};

export const createFirma = async (firmaData) => {
  try {
    const response = await API.post('/firmaelectronica', firmaData);
    return response.data;
  } catch (error) {
    console.error('Error al crear firma electrónica:', error);
    throw error;
  }
};

export const updateFirma = async (id, firmaData) => {
  try {
    const response = await API.put(`/firmaelectronica/${id}`, firmaData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar firma electrónica:', error);
    throw error;
  }
};

export const deleteFirma = async (id, usuarioId) => {
  try {
    const response = await API.delete(`/firmaelectronica/${id}/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar firma electrónica:', error);
    throw error;
  }
};


// Jornadas

export const fetchJornadas = async () => {
  try {
    const response = await API.get('/jornada');
    return response.data.data; // Asumiendo que `data` contiene las jornadas.
  } catch (error) {
    console.error('Error al obtener jornadas:', error);
    throw error;
  }
};

export const createJornada = async (jornadaData) => {
  try {
    const response = await API.post('/jornada', jornadaData);
    return response.data;
  } catch (error) {
    console.error('Error al crear jornada:', error);
    throw error;
  }
};

export const updateJornada = async (id, usuarioId, jornadaData) => {
  try {
    const response = await API.put(`/jornada/${id}/${usuarioId}`, jornadaData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar jornada:', error);
    throw error;
  }
};

export const deleteJornada = async (id, usuarioId) => {
  try {
    const response = await API.delete(`/jornada/${id}/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar jornada:', error);
    throw error;
  }
};

// Titulo
export const fetchTitulos = async () => {
  try {
    const response = await API.get('/title/'); // Endpoint correcto según el backend
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener títulos:', error);
    throw error;
  }
};


export const createTitulo = async (tituloData) => {
  try {
    const response = await API.post('/title/', tituloData);
    return response.data;
  } catch (error) {
    console.error('Error al crear título:', error);
    throw error;
  }
};

export const updateTitulo = async (idTitulo, usuarioId, tituloData) => {
  try {
    const response = await API.put(`/title/${idTitulo}/${usuarioId}`, tituloData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar título:', error);
    throw error;
  }
};


export const deleteTitulo = async (idTitulo, usuarioIdentificacion) => {
  try {
    const response = await API.delete(`/title/${idTitulo}/${usuarioIdentificacion}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar título:', error);
    throw error;
  }
};



// Paciente

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



// Obtener lista de pacientes con paginación
export const fetchPatients = async (page = 1, limit = 10) => {
  try {
    const response = await API.get(`/paciente?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

// Crear un nuevo paciente
export const createPatient = async (patientData) => {
  try {
    console.log('Datos enviados al backend (API):', patientData);
    const response = await API.post('/paciente/', patientData);
    return response.data;
  } catch (error) {
    console.error('Error al agregar paciente:', error.response?.data || error.message);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

// Obtener detalles de un paciente por su identificación
export const fetchPatientDetails = async (identificacion) => {
  try {
    const response = await API.get(`/paciente/${identificacion}`);
    return response.data.data; // Asume que el backend envía { success: true, data: paciente }
  } catch (error) {
    console.error('Error al obtener detalles del paciente:', error);
    throw error.response
      ? error.response.data
      : { error: 'Error al obtener detalles del paciente.' };
  }
};

// Actualizar datos de un paciente por identificación
export const updatePatient = async (identificacion, patientData) => {
  try {
    const config = {};
    if (patientData instanceof FormData) {
      config.headers = { 'Content-Type': 'multipart/form-data' };
    }

    console.log('Datos enviados en la solicitud PUT:', patientData);
    const response = await API.put(`/paciente/${identificacion}`, patientData, config);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar paciente:', error.response?.data || error.message);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const searchPatients = async (criteria) => {
  try {
    const response = await API.get(`/paciente/search`, { params: criteria });
    return response.data;
  } catch (error) {
    console.error('Error al buscar pacientes:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const fetchPatientSummary = async () => {
  try {
    const response = await API.get(`/paciente/summary`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el resumen de pacientes:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

// Referidos
export const fetchReferidos = async (pacienteIdentificacion = null) => {
  try {
    const params = pacienteIdentificacion ? { pacienteIdentificacion } : {};
    const response = await API.get('/referido', { params });
    return response.data.data; // Asume que la respuesta tiene un objeto `data` con los referidos
  } catch (error) {
    console.error('Error al obtener referidos:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const createReferido = async (referidoData) => {
  try {
    const response = await API.post('/referido', referidoData);
    return response.data.data; // Devuelve los datos del referido creado
  } catch (error) {
    console.error('Error al agregar referido:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const updateReferido = async (idReferido, pacienteIdentificacion, referidoData) => {
  try {
    const response = await API.put(`/referido/${idReferido}/${pacienteIdentificacion}`, referidoData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar referido:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const fetchReferidoById = async (idReferido, pacienteIdentificacion) => {
  try {
    const response = await API.get(`/referido/${idReferido}/${pacienteIdentificacion}`);
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener detalles del referido:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const deleteReferido = async (idReferido, pacienteIdentificacion) => {
  try {
    const response = await API.delete(`/referido/${idReferido}/${pacienteIdentificacion}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar referido:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};


// Plantilla
export const fetchPlantillas = async () => {
  try {
    const response = await API.get('/plantilla_formulario/');
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener plantillas:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};


export const fetchPlantilla = async (id) => {
  try {
    console.log('ID enviado a la API:', id);
    const response = await API.get(`/plantilla_formulario/${id}`);
    console.log('Datos recibidos de la API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener plantilla:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};



export const createPlantilla = async (plantillaData) => {
  try {
    const response = await API.post("/plantilla_formulario", plantillaData);
    return response.data;
  } catch (error) {
    console.error("Error al crear plantilla:", error);
    throw error.response ? error.response.data : { error: "Error en el servidor" };
  }
};


export const updatePlantilla = async (id, plantillaData) => {
  if (!id) {
      console.error("El ID es indefinido:", id);
      throw new Error("El ID de la plantilla no se ha proporcionado.");
  }
  try {
      const response = await API.put(`/plantilla_formulario/${id}`, plantillaData);
      return response.data;
  } catch (error) {
      console.error("Error al actualizar plantilla:", error);
      throw error.response ? error.response.data : { error: "Error en el servidor" };
  }
};

// Establecimientos
export const fetchEstablecimientos = async () => {
  try {
    const response = await API.get("/establecimiento");
    return response.data.data; // Ajusta según la estructura de tu respuesta
  } catch (error) {
    console.error("Error al obtener establecimientos:", error);
    throw error;
  }
};

export const createEstablecimiento = async (establecimientoData) => {
  try {
    const response = await API.post("/establecimiento", establecimientoData);
    return response.data;
  } catch (error) {
    console.error("Error al crear establecimiento:", error);
    throw error;
  }
};

export const updateEstablecimiento = async (idEstablecimiento, data) => {
  try {
    const response = await API.put(`/establecimiento/${idEstablecimiento}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar establecimiento:", error);
    throw error;
  }
};

export const deleteEstablecimiento = async (idEstablecimiento) => {
  try {
    const response = await API.delete(`/establecimiento/${idEstablecimiento}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar establecimiento:", error);
    throw error;
  }
};




export const deletePlantilla = async (id) => {
  try {
    const response = await API.delete(`/plantilla_formulario/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar plantilla:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

//Historia Clinica
export const fetchHistorias = async (pacienteIdentificacion = null) => {
  try {
    const params = pacienteIdentificacion ? { pacienteIdentificacion } : {};
    const response = await API.get("/historia", { params });
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener historias clínicas:", error);
    throw error;
  }
};

export const fetchHistoriaById = async (pacienteIdentificacion) => {
  try {
    const response = await API.get(`/historia/${pacienteIdentificacion}`);
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener la historia clínica:", error);
    throw error;
  }
};


export const createHistoria = async (historiaData) => {
  try {
    console.log("Datos enviados al backend (API):", historiaData); // Log para depuración
    const response = await API.post("/historia", historiaData);
    return response.data;
  } catch (error) {
    console.error("Error al crear historia clínica:", error.response?.data || error.message);
    throw error.response
      ? error.response.data
      : { message: "Error al crear historia clínica." };
  }
};



export const updateHistoria = async (idHistoriaClinica, pacienteIdentificacion, data) => {
  try {
    const response = await API.put(`/historia/${idHistoriaClinica}/${pacienteIdentificacion}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar historia clínica:", error);
    throw error;
  }
};

export const deleteHistoria = async (idHistoriaClinica, Paciente_identificacion) => {
  try {
    const response = await API.delete(`/historia/${idHistoriaClinica}/${Paciente_identificacion}`);
    console.log("Respuesta de eliminación:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar historia clínica:", error);
    throw error.response
      ? error.response.data
      : { message: "Error al eliminar historia clínica." };
  }
};

//formularios

// Obtener todos los formularios
export const fetchFormularios = async () => {
  try {
    const response = await API.get('/formulario'); // Ruta del endpoint
    console.log('Datos recibidos:', response.data); // Verifica qué datos llegan
    return response.data.data; // Devuelve los datos esperados
  } catch (error) {
    console.error('Error al obtener formularios:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

export const fetchFormularioById = async (idHistoriaClinica) => {
  try {
    const response = await API.get(`/formulario/${idHistoriaClinica}`);
    return response.data.data;
  } catch (error) {
    console.error("Error en fetchFormularios:", error);
    throw error;
  }
};


// Crear un nuevo formulario
export const createFormulario = async (formularioData) => {
  try {
    const response = await API.post("/formulario", formularioData);
    return response.data.data; // Ajustar según la respuesta del backend
  } catch (error) {
    console.error("Error al crear formulario:", error);
    throw error.response ? error.response.data : { error: "Error en el servidor" };
  }
};


// Actualizar un formulario existente
export const updateFormulario = async (idFormulario, formularioData) => {
  try {
    const response = await API.put(`/formulario/${idFormulario}`, formularioData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar formulario:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

// Eliminar un formulario
export const deleteFormulario = async (idFormulario) => {
  try {
    const response = await API.delete(`/formulario/${idFormulario}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar formulario:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};

//Doctor - Enfermera
// Obtener formulario
export const fetchFormularioEstructura = async (tipo) => {
  try {
    const response = await API.get(`/formularios/${tipo}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la estructura del formulario:', error);
    throw error.response ? error.response.data : { error: 'Error en el servidor' };
  }
};
//Enfermera
// asignar Formulario a Paciente 
export const asignarFormularioAPaciente = async ({ pacienteId, tipoFormulario }) => {
  const response = await fetch(`/api/pacientes/${pacienteId}/formularios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tipoFormulario }),
  });

  if (!response.ok) {
    throw new Error('Error al asignar el formulario');
  }

  return await response.json();
};





