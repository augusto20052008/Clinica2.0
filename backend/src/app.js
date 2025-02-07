const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const rolRoutes = require('./routes/rol.routes');
const usuarioInformacionPersonalRoutes = require('./routes/usuario_informacion_personal.routes');
const usuarioInformacionAcademicaRoutes = require('./routes/usuario_informacion_academica.routes');
const usuarioInformacionContactoRoutes = require('./routes/usuario_informacion_contacto.routes');
const firmaElectronicaRoutes = require('./routes/firma_electronica.routes');
const pacienteRoutes = require('./routes/paciente.routes');
const archivoClinicoRoutes = require('./routes/archivo_clinico.routes');
const formularioTipoRoutes = require('./routes/formulario_tipo.routes');
const campoFormularioRoutes = require('./routes/campo_formulario.routes');
const respuestaFormularioRoutes = require('./routes/respuesta_formulario.routes');
const formularioRoutes = require('./routes/formulario.routes');
const seccionFormularioRoutes = require('./routes/seccion_formulario.routes');
const formularioCambiosDetallesRoutes = require('./routes/formulario_cambios_detalles.routes');
const formularioCambiosRoutes = require('./routes/formulario_cambios.routes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/rol', rolRoutes);
app.use('/uip', usuarioInformacionPersonalRoutes);
app.use('/uia', usuarioInformacionAcademicaRoutes);
app.use('/uic', usuarioInformacionContactoRoutes);
app.use('/firma', firmaElectronicaRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/archivos', archivoClinicoRoutes);
app.use('/formularios/tipos', formularioTipoRoutes);
app.use('/campos', campoFormularioRoutes);
app.use('/respuestas', respuestaFormularioRoutes);
app.use('/formularios', formularioRoutes);
app.use('/seccion', seccionFormularioRoutes);
app.use('/formulario_cambios_detalles', formularioCambiosDetallesRoutes);
app.use('/formulario_cambios', formularioCambiosRoutes);

// Middleware para manejar errores 404
app.use((req, res) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3301;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
