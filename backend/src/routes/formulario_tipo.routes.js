const express = require('express');
const router = express.Router();

const formularioTipoController = require('../controllers/formulario_tipo.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET: todos los tipos de formulario
router.get('/', authMiddleware, formularioTipoController.obtenerFormularioTipos);

// GET: un tipo de formulario por ID
router.get('/:id_formulario_tipo', authMiddleware, formularioTipoController.obtenerFormularioTipoPorId);

// POST: crear un nuevo tipo de formulario
router.post('/', authMiddleware, formularioTipoController.crearFormularioTipo);

// PUT: actualizar un tipo de formulario
router.put('/:id_formulario_tipo', authMiddleware, formularioTipoController.actualizarFormularioTipo);

// DELETE: eliminar un tipo de formulario
router.delete('/:id_formulario_tipo', authMiddleware, formularioTipoController.eliminarFormularioTipo);

module.exports = router;
