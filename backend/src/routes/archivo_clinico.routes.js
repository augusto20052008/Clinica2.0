const express = require('express');
const router = express.Router();

const archivoController = require('../controllers/archivo_clinico.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET: Obtener todos los archivos clínicos
router.get('/', authMiddleware, archivoController.obtenerArchivos);

// GET: Obtener un archivo clínico por nro_archivo
router.get('/:nro_archivo', authMiddleware, archivoController.obtenerArchivoPorId);

// POST: Crear un nuevo archivo clínico
router.post('/', authMiddleware, archivoController.crearArchivo);

// PUT: Actualizar un archivo clínico
router.put('/:nro_archivo', authMiddleware, archivoController.actualizarArchivo);

// DELETE: Eliminar un archivo clínico
router.delete('/:nro_archivo', authMiddleware, archivoController.eliminarArchivo);

router.put('/:nro_archivo/formulario', authMiddleware, archivoController.asignarFormularioAHistoria);


module.exports = router;
