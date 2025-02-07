const express = require('express');
const router = express.Router();

const rolController = require('../controllers/rol.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET: Obtener todos los roles
router.get('/', authMiddleware,  rolController.obtenerRoles);

// GET: Obtener un rol por ID
router.get('/:id_rol', authMiddleware, rolController.obtenerRolPorId);

// POST: Crear un nuevo rol
router.post('/', authMiddleware, rolController.crearRol);

// PUT: Actualizar un rol
router.put('/:id_rol', authMiddleware, rolController.actualizarRol);

// DELETE: Eliminar un rol
router.delete('/:id_rol', authMiddleware, rolController.eliminarRol);

module.exports = router;
