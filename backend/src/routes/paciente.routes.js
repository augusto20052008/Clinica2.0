const { Router } = require('express');
const { getPacientes, getPaciente, postPaciente, putPaciente, deletePacienteById, } = require('../controllers/paciente.controller');

const router = Router();

// GET /paciente -> Lista todos
router.get('/', getPacientes);

// GET /paciente/:identificacion -> Obtener uno
router.get('/:identificacion', getPaciente);

// POST /paciente -> Crear nuevo
router.post('/', postPaciente);

// PUT /paciente/:identificacion -> Actualizar
router.put('/:identificacion', putPaciente);

// DELETE /paciente/:identificacion -> Eliminar
router.delete('/:identificacion', deletePacienteById);

module.exports = router;
