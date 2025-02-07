const express = require('express');
const router = express.Router();

const formularioCambiosController = require('../controllers/formulario_cambios.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET: Obtener todos los cambios de formularios
router.get('/', authMiddleware, formularioCambiosController.obtenerCambiosFormularios);

// GET: Obtener un cambio de formulario por id_cambio
router.get('/:id_cambio',
    authMiddleware,
    formularioCambiosController.obtenerCambioFormularioPorId
);

// GET: Obtener todos los cambios de un formulario específico
router.get('/formulario/:id_formulario',
    authMiddleware,
    formularioCambiosController.obtenerCambiosPorFormulario
);

// POST: Crear un nuevo cambio de formulario
router.post('/',
    authMiddleware,
    formularioCambiosController.crearCambioFormulario
    // , validarCreacion, manejarValidaciones
);

// PUT: Actualizar un cambio de formulario existente
router.put('/:id_cambio',
    authMiddleware,
    formularioCambiosController.actualizarCambioFormulario
    // , validarActualizacion, manejarValidaciones
);

// DELETE: Eliminar un cambio de formulario por id_cambio
router.delete('/:id_cambio',
    authMiddleware,
    formularioCambiosController.eliminarCambioFormulario
);

module.exports = router;
