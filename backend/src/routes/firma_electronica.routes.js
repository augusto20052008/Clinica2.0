const express = require('express');
const router = express.Router();

const firmaController = require('../controllers/firma_electronica.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET: todas las firmas
router.get('/', authMiddleware, firmaController.obtenerFirmas);

// GET: firma por id_firma_electronica
router.get('/:id_firma_electronica', authMiddleware, firmaController.obtenerFirmaPorId);

// GET: firma por id_usuario
router.get('/usuario/:id_usuario', authMiddleware, firmaController.obtenerFirmaPorUsuario);

// POST: crear nueva firma
router.post('/', authMiddleware, firmaController.crearFirma);

// PUT: actualizar firma
router.put('/:id_firma_electronica', authMiddleware, firmaController.actualizarFirma);

// DELETE: eliminar firma
router.delete('/:id_firma_electronica', authMiddleware, firmaController.eliminarFirma);

module.exports = router;
