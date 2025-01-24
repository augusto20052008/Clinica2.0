const { findAllUsuarios, findUsuarioById, createUsuario, updateUsuario, deleteUsuario, } = require('../models/usuario.model');

// Obtener todos los usuarios
async function getUsuarios(req, res) {
    try {
        const usuarios = await findAllUsuarios();
        return res.json({
            success: true,
            data: usuarios,
        });
    } catch (error) {
        console.error('Error en getUsuarios:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

// Obtener un usuario por identificacion
async function getUsuario(req, res) {
    try {
        const { identificacion } = req.params;
        const usuario = await findUsuarioById(identificacion);
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: `No se encontró el usuario con identificación: ${identificacion}`,
            });
        }
        return res.json({
            success: true,
            data: usuario,
        });
    } catch (error) {
        console.error('Error en getUsuario:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

// Crear un nuevo usuario
async function postUsuario(req, res) {
    try {
        const newUserData = req.body;
        const insertedId = await createUsuario(newUserData);
        return res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            data: { insertedId },
        });
    } catch (error) {
        console.error('Error en postUsuario:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

// Actualizar un usuario existente
async function putUsuario(req, res) {
    try {
        const { identificacion } = req.params;
        const userData = req.body;
        const rowsAffected = await updateUsuario(identificacion, userData);
        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: `No se pudo actualizar. Usuario con ID ${identificacion} no encontrado.`,
            });
        }
        return res.json({
            success: true,
            message: 'Usuario actualizado exitosamente',
        });
    } catch (error) {
        console.error('Error en putUsuario:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

// Eliminar un usuario
async function deleteUsuarioById(req, res) {
    try {
        const { identificacion } = req.params;
        const rowsAffected = await deleteUsuario(identificacion);
        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: `No se pudo eliminar. Usuario con ID ${identificacion} no encontrado.`,
            });
        }
        return res.json({
            success: true,
            message: 'Usuario eliminado exitosamente',
        });
    } catch (error) {
        console.error('Error en deleteUsuarioById:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

module.exports = {
    getUsuarios,
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuarioById,
};
