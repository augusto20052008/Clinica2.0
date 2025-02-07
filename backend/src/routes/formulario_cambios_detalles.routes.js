const express = require('express');
const router = express.Router();

const formularioCambiosDetallesController = require('../controllers/formulario_cambios_detalles.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET: Obtener todos los detalles de cambios de formularios
router.get('/', authMiddleware, formularioCambiosDetallesController.obtenerDetallesCambiosFormulario);

// GET: Obtener un detalle de cambio de formulario por id_cambio_detalle
router.get('/:id_cambio_detalle', authMiddleware, formularioCambiosDetallesController.obtenerDetalleCambioFormularioPorId);

// GET: Obtener todos los detalles de cambios para un cambio específico
router.get('/cambio/:id_cambio', authMiddleware, formularioCambiosDetallesController.obtenerDetallesPorCambio);

// POST: Crear un nuevo detalle de cambio de formulario
router.post('/', authMiddleware, formularioCambiosDetallesController.crearDetalleCambioFormulario);

// PUT: Actualizar un detalle de cambio de formulario existente
router.put('/:id_cambio_detalle', authMiddleware, formularioCambiosDetallesController.actualizarDetalleCambioFormulario);

// DELETE: Eliminar un detalle de cambio de formulario por id_cambio_detalle
router.delete('/:id_cambio_detalle', authMiddleware, formularioCambiosDetallesController.eliminarDetalleCambioFormulario);

module.exports = router;
