const express = require('express');
const router = express.Router();

const respuestaFormularioController = require('../controllers/respuestaFormulario.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET: Obtener todas las respuestas de formularios
router.get('/', authMiddleware, respuestaFormularioController.obtenerRespuestasFormulario);

// GET: Obtener una respuesta de formulario por id_respuesta
router.get('/:id_formulario/:id_campo', authMiddleware, respuestaFormularioController.obtenerRespuestaFormularioPorId);

// GET: Obtener todas las respuestas de un formulario específico
router.get('/formulario/:id_formulario', authMiddleware, respuestaFormularioController.obtenerRespuestasPorFormulario);

// POST: Crear una nueva respuesta de formulario
router.post('/', authMiddleware, respuestaFormularioController.crearRespuestaFormulario);

// PUT: Actualizar una respuesta de formulario existente
router.put('/:id_respuesta', authMiddleware, respuestaFormularioController.actualizarRespuestaFormulario);

// DELETE: Eliminar una respuesta de formulario por id_respuesta
router.delete('/:id_respuesta', authMiddleware, respuestaFormularioController.eliminarRespuestaFormulario);

module.exports = router;
