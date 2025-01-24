const { Router } = require('express');
const { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuarioById } = require('../controllers/usuario.controller');

const router = Router();

// GET /user -> Obtener todos
router.get('/', getUsuarios);

// GET /user/:identificacion -> Obtener uno
router.get('/:identificacion', getUsuario);

// POST /user/ -> Crear nuevo
router.post('/', postUsuario);

// PUT /user/:identificacion -> Actualizar
router.put('/:identificacion', putUsuario);

// DELETE /user/:identificacion -> Eliminar
router.delete('/:identificacion', deleteUsuarioById);

module.exports = router;
