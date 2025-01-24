const { Router } = require('express');
const { getReferidos, getReferido, postReferido, putReferido, deleteReferidoById, } = require('../controllers/referido.controller');

const router = Router();

// GET /referido
router.get('/', getReferidos);

// GET /referido/:idReferido/:pacienteIdentificacion
router.get('/:idReferido/:pacienteIdentificacion', getReferido);

// POST /referido
router.post('/', postReferido);

// PUT /referido/:idReferido/:pacienteIdentificacion
router.put('/:idReferido/:pacienteIdentificacion', putReferido);

// DELETE /referido/:idReferido/:pacienteIdentificacion
router.delete('/:idReferido/:pacienteIdentificacion', deleteReferidoById);

module.exports = router;
