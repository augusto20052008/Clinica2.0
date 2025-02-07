const rolModel = require('../models/rol.model');

exports.obtenerRoles = async (req, res) => {
    try {
        const roles = await rolModel.obtenerTodos();
        return res.json(roles);
    } catch (error) {
        console.error('Error al obtener roles:', error);
        return res.status(500).json({ message: 'Error al obtener roles' });
    }
};

exports.obtenerRolPorId = async (req, res) => {
    const { id_rol } = req.params;
    try {
        const rol = await rolModel.obtenerPorId(id_rol);
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        return res.json(rol);
    } catch (error) {
        console.error('Error al obtener rol:', error);
        return res.status(500).json({ message: 'Error al obtener rol' });
    }
};

exports.crearRol = async (req, res) => {
    try {
        const { nombre_rol } = req.body;
        // Validación simple:
        if (!nombre_rol) {
            return res.status(400).json({ message: 'El campo nombre_rol es obligatorio' });
        }

        const nuevoRol = await rolModel.crear({ nombre_rol });
        return res.status(201).json(nuevoRol);
    } catch (error) {
        console.error('Error al crear rol:', error);
        return res.status(500).json({ message: 'Error al crear rol' });
    }
};

exports.actualizarRol = async (req, res) => {
    const { id_rol } = req.params;
    try {
        const { nombre_rol } = req.body;
        if (!nombre_rol) {
            return res.status(400).json({ message: 'El campo nombre_rol es obligatorio' });
        }

        const rolActualizado = await rolModel.actualizar(id_rol, { nombre_rol });
        return res.json(rolActualizado);
    } catch (error) {
        console.error('Error al actualizar rol:', error);
        return res.status(500).json({ message: 'Error al actualizar rol' });
    }
};

exports.eliminarRol = async (req, res) => {
    const { id_rol } = req.params;
    try {
        await rolModel.eliminar(id_rol);
        return res.json({ message: 'Rol eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar rol:', error);
        return res.status(500).json({ message: 'Error al eliminar rol' });
    }
};
