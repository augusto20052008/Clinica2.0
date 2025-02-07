const express = require('express');
const router = express.Router();
const formularioController = require('../controllers/formulario.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Obtener todos los formularios
router.get('/', authMiddleware, formularioController.obtenerFormularios);

// Obtener un formulario por su ID
router.get('/:id', authMiddleware, formularioController.obtenerFormularioPorId);

// Crear un nuevo formulario
router.post('/', authMiddleware, formularioController.crearFormulario);

// Actualizar un formulario existente
router.put('/:id', authMiddleware, formularioController.actualizarFormulario);

// Eliminar un formulario por su ID
router.delete('/:id', authMiddleware, formularioController.eliminarFormulario);

module.exports = router;
