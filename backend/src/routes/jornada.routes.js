const { Router } = require('express');
const { getJornadas, getJornada, postJornada, putJornada, deleteJornadaById, } = require('../controllers/jornada.controller');

const router = Router();

// GET /jornada -> Lista todas
router.get('/', getJornadas);

// GET /jornada/:idJornada/:usuarioIdentificacion -> Una jornada
router.get('/:idJornada/:usuarioIdentificacion', getJornada);

// POST /jornada -> Crear jornada
router.post('/', postJornada);

// PUT /jornada/:idJornada/:usuarioIdentificacion -> Actualizar
router.put('/:idJornada/:usuarioIdentificacion', putJornada);

// DELETE /jornada/:idJornada/:usuarioIdentificacion -> Eliminar
router.delete('/:idJornada/:usuarioIdentificacion', deleteJornadaById);

module.exports = router;
