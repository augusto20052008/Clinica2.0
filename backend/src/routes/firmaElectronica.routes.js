const { Router } = require('express');
const { getFirmas, getFirma, postFirma, putFirma, deleteFirmaById, } = require('../controllers/firmaElectronica.controller');

const router = Router();

// GET /firmaelectronica/ -> Obtener todas
router.get('/', getFirmas);

// GET /firmaelectronica/:idFirmaElectronica/:usuarioIdentificacion -> Una firma
router.get('/:idFirmaElectronica/:usuarioIdentificacion', getFirma);

// POST /firmaelectronica -> Crear nueva
router.post('/', postFirma);

// PUT /firmaelectronica/:idFirmaElectronica/:usuarioIdentificacion -> Actualizar
router.put('/:idFirmaElectronica/:usuarioIdentificacion', putFirma);

// DELETE /firmaelectronica/:idFirmaElectronica/:usuarioIdentificacion -> Eliminar
router.delete('/:idFirmaElectronica/:usuarioIdentificacion', deleteFirmaById);

module.exports = router;
