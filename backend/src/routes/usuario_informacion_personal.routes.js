const express = require('express');
const router = express.Router();

const uipController = require('../controllers/usuario_informacion_personal.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET: Información personal por id_usuario
router.get('/usuario/:id_usuario', authMiddleware, uipController.obtenerInformacionPersonalPorUsuario);

// GET: Todas las filas de información personal
router.get('/', authMiddleware, uipController.obtenerInformacionPersonal);

// GET: Una fila por id_informacion_personal
router.get('/:id_informacion_personal', authMiddleware, uipController.obtenerInformacionPersonalPorId);

// POST: Crear nuevo registro de información personal
router.post('/', authMiddleware, uipController.crearInformacionPersonal);

// PUT: Actualizar información personal por id_informacion_personal
router.put('/:id_informacion_personal', authMiddleware, uipController.actualizarInformacionPersonal);

// DELETE: Eliminar información personal
router.delete('/:id_informacion_personal', authMiddleware, uipController.eliminarInformacionPersonal);

module.exports = router;
