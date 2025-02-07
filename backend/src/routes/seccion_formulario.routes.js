const express = require('express');
const router = express.Router();

const seccionFormularioController = require('../controllers/seccion_formulario.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET: Obtener todas las secciones de formulario
router.get('/', authMiddleware, seccionFormularioController.obtenerSeccionesFormulario);

// GET: Obtener una sección de formulario por id_seccion
router.get('/:id_seccion', authMiddleware, seccionFormularioController.obtenerSeccionFormularioPorId);

// POST: Crear una nueva sección de formulario
router.post('/', authMiddleware, seccionFormularioController.crearSeccionFormulario);

// PUT: Actualizar una sección de formulario existente
router.put('/:id_seccion', authMiddleware, seccionFormularioController.actualizarSeccionFormulario);

// DELETE: Eliminar una sección de formulario por id_seccion
router.delete('/:id_seccion', authMiddleware, seccionFormularioController.eliminarSeccionFormulario);

module.exports = router;
