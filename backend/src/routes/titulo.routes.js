const { Router } = require('express');
const { getTitulos, getTitulo, postTitulo, putTitulo, deleteTituloById, } = require('../controllers/titulo.controller');

const router = Router();

// GET /titulo -> Obtener todos
router.get('/', getTitulos);

// GET /titulo/:idTitulo/:usuarioIdentificacion -> Obtener uno
router.get('/:idTitulo/:usuarioIdentificacion', getTitulo);

// POST /titulo -> Crear nuevo
router.post('/', postTitulo);

// PUT /titulo/:idTitulo/:usuarioIdentificacion -> Actualizar
router.put('/:idTitulo/:usuarioIdentificacion', putTitulo);

// DELETE /titulo/:idTitulo/:usuarioIdentificacion -> Eliminar
router.delete('/:idTitulo/:usuarioIdentificacion', deleteTituloById);

module.exports = router;
