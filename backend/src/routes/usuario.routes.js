const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET: Obtener todos los usuarios
router.get('/', authMiddleware, usuarioController.obtenerUsuarios);

// GET: Obtener un usuario por ID
router.get('/:id_usuario', authMiddleware, usuarioController.obtenerUsuarioPorId);

// POST: Crear un nuevo usuario
router.post('/', authMiddleware, usuarioController.crearUsuario);

// PUT: Actualizar un usuario
router.put('/:id_usuario', authMiddleware, usuarioController.actualizarUsuario);

// DELETE: Eliminar un usuario
router.delete('/:id_usuario', authMiddleware, usuarioController.eliminarUsuario);

// BAJA: Dar de baja un usuario
router.delete('/baja/:id_usuario', authMiddleware, usuarioController.darBajaUsuario);

module.exports = router;
