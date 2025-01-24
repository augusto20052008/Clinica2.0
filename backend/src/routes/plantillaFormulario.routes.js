const { Router } = require('express');
const { getPlantillas, getPlantilla, postPlantilla, putPlantilla, deletePlantillaById, } = require('../controllers/plantillaFormulario.controller');

const router = Router();

// GET /plantilla_formulario -> Lista todas
router.get('/', getPlantillas);

// GET /plantilla_formulario/:id -> obtiene una
router.get('/:id', getPlantilla);

// POST /plantilla_formulario -> crea
router.post('/', postPlantilla);

// PUT /plantilla_formulario/:id -> actualiza
router.put('/:id', putPlantilla);

// DELETE /plantilla_formulario/:id -> elimina
router.delete('/:id', deletePlantillaById);

module.exports = router;
