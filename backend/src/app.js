const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/usuario.routes');
const titleRoutes = require('./routes/titulo.routes');
const firmaElectronicaRoutes = require('./routes/firmaElectronica.routes');
const jornadaRoutes = require('./routes/jornada.routes');
const pacienteRoutes = require('./routes/paciente.routes');
const establecimientoRoutes = require('./routes/establecimiento.routes');
const plantillaFormularioRoutes = require('./routes/plantillaFormulario.routes');
const referidoRoutes = require('./routes/referido.routes');
const historiaRoutes = require('./routes/historiaClinica.routes');
const formularioRoutes = require('./routes/formulario.routes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/title', titleRoutes);
app.use('/firmaelectronica', firmaElectronicaRoutes);
app.use('/jornada', jornadaRoutes);
app.use('/paciente', pacienteRoutes);
app.use('/establecimiento', establecimientoRoutes);
app.use('/plantilla_formulario', plantillaFormularioRoutes);
app.use('/referido', referidoRoutes);
app.use('/historia', historiaRoutes);
app.use('/formulario', formularioRoutes);


const PORT = process.env.PORT || 3301;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});