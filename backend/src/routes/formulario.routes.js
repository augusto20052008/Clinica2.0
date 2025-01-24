const { Router } = require('express');
const {getFormularios,getFormulario,postFormulario,putFormulario,deleteFormularioById,} = require('../controllers/formulario.controller');

const router = Router();

// GET /formulario/ -> Obtiene todos los formularios
router.get('/', getFormularios);

//GET /formulario/:idHistoriaClinica -> Obtener todos los formularios asociados a una historia clinica
router.get('/:idHistoriaClinica', getFormulario);

// POST /formulario/ -> Crea un nuevo formulario
router.post('/', postFormulario);

// PUT /formulario/:idFormulario/:idHistoriaClinica/:idPlantilla/:idEstablecimiento
router.put('/:idFormulario/:idHistoriaClinica/:idPlantilla/:idEstablecimiento', putFormulario);

// DELETE /formulario/:idFormulario/:idHistoriaClinica/:idPlantilla/:idEstablecimiento
router.delete('/:idFormulario/:idHistoriaClinica/:idPlantilla/:idEstablecimiento', deleteFormularioById);

module.exports = router;
