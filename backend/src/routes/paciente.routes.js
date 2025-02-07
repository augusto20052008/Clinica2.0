const express = require('express');
const router = express.Router();

const pacienteController = require('../controllers/paciente.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET: Obtener todos los pacientes
router.get('/', authMiddleware, pacienteController.obtenerPacientes);

// GET: Obtener un paciente por nro_identificacion
router.get('/:nro_identificacion', authMiddleware, pacienteController.obtenerPacientePorId);

// POST: Crear un nuevo paciente
router.post('/', authMiddleware, pacienteController.crearPaciente);

// PUT: Actualizar un paciente existente
router.put('/:nro_identificacion', authMiddleware, pacienteController.actualizarPaciente);

// DELETE: Eliminar un paciente
router.delete('/:nro_identificacion', authMiddleware, pacienteController.eliminarPaciente);

module.exports = router;
