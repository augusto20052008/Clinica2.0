const usuarioModel = require('../models/usuario.model');
const bcrypt = require('bcrypt');

exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.obtenerTodos();
        return res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

exports.obtenerUsuarioPorId = async (req, res) => {
    const { id_usuario } = req.params;

    try {
        const usuario = await usuarioModel.obtenerPorId(id_usuario);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        return res.status(500).json({ message: 'Error al obtener usuario' });
    }
};

exports.crearUsuario = async (req, res) => {
    try {
        const { usuario, correo, contraseña, id_rol } = req.body;

        if (!usuario || !correo || !contraseña || !id_rol) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        const hashedPassword = await bcrypt.hash(contraseña, 10);

        const nuevoUsuario = await usuarioModel.crear({
            usuario,
            correo,
            contraseña: hashedPassword,
            id_rol,
        });

        return res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return res.status(500).json({ message: 'Error al crear usuario' });
    }
};

exports.actualizarUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const { usuario, correo, contraseña, id_rol, estado } = req.body;

        if (!usuario || !correo || !id_rol) {
            return res.status(400).json({ message: 'Faltan datos para actualizar' });
        }

        let contraseñaHasheada = contraseña;
        if (contraseña) {
            contraseñaHasheada = await bcrypt.hash(contraseña, 10);
        }

        const usuarioActualizado = await usuarioModel.actualizar(id_usuario, { usuario, correo, contraseña: contraseñaHasheada, id_rol, estado});

        return res.json(usuarioActualizado);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        return res.status(500).json({ message: 'Error al actualizar usuario' });
    }
};

exports.eliminarUsuario = async (req, res) => {
    const { id_usuario } = req.params;

    try {
        await usuarioModel.eliminar(id_usuario);
        return res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        return res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};

exports.darBajaUsuario = async (req, res) => {
    const { id_usuario } = req.params;

    try {
        await usuarioModel.darBaja(id_usuario);
        return res.json({message: 'Usuario dado de baja correctamente'});
        
    } catch (error) {
        return res.status(500).json({ message: 'Error al dar de baja usuario' });
    }
}
