const { Router } = require('express');
const { getEstablecimientos, getEstablecimiento, postEstablecimiento, putEstablecimiento, deleteEstablecimientoById, } = require('../controllers/establecimiento.controller');

const router = Router();

// GET /establecimiento -> listar todos
router.get('/', getEstablecimientos);

// GET /establecimiento/:idEstablecimiento -> uno
router.get('/:idEstablecimiento', getEstablecimiento);

// POST /establecimiento -> crear
router.post('/', postEstablecimiento);

// PUT /establecimiento/:idEstablecimiento -> actualizar
router.put('/:idEstablecimiento', putEstablecimiento);

// DELETE /establecimiento/:idEstablecimiento -> eliminar
router.delete('/:idEstablecimiento', deleteEstablecimientoById);

module.exports = router;
