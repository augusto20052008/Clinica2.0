const express = require('express');
const router = express.Router();

const uicController = require('../controllers/usuario_informacion_contacto.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET: Todos los registros
router.get('/', authMiddleware, uicController.obtenerContactos);

// GET: Un registro por id_informacion_contacto
router.get('/:id_informacion_contacto', authMiddleware, uicController.obtenerContactoPorId);

// GET: Un registro por id_usuario
router.get('/usuario/:id_usuario', authMiddleware, uicController.obtenerContactoPorUsuario);

// POST: Crear un nuevo registro
router.post('/', authMiddleware, uicController.crearContacto);

// PUT: Actualizar un registro por id_informacion_contacto
router.put('/:id_informacion_contacto', authMiddleware, uicController.actualizarContacto);

// DELETE: Eliminar un registro por id_informacion_contacto
router.delete('/:id_informacion_contacto', authMiddleware, uicController.eliminarContacto);

module.exports = router;
