const express = require('express');
const router = express.Router();

const uiaController = require('../controllers/usuario_informacion_academica.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET: todos los registros
router.get('/', authMiddleware, uiaController.obtenerInformacionAcademica);

// GET: un registro por id_informacion_academica
router.get('/:id_informacion_academica', authMiddleware, uiaController.obtenerInformacionAcademicaPorId);

// GET: un registro por id_usuario
router.get('/usuario/:id_usuario', authMiddleware, uiaController.obtenerInformacionAcademicaPorUsuario);

// POST: crear nuevo registro
router.post('/', authMiddleware, uiaController.crearInformacionAcademica);

// PUT: actualizar un registro
router.put('/:id_informacion_academica', authMiddleware, uiaController.actualizarInformacionAcademica);

// DELETE: eliminar un registro
router.delete('/:id_informacion_academica', authMiddleware, uiaController.eliminarInformacionAcademica);

module.exports = router;
