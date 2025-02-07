const formularioCambiosModel = require('../models/formulario_cambios.model');
const formularioModel = require('../models/formulario.model');
const usuarioModel = require('../models/usuario.model');

exports.obtenerCambiosFormularios = async (req, res) => {
    try {
        const cambios = await formularioCambiosModel.obtenerTodos();
        return res.json(cambios);
    } catch (error) {
        console.error('Error al obtener cambios de formularios:', error);
        return res.status(500).json({ message: 'Error al obtener cambios de formularios' });
    }
};

exports.obtenerCambioFormularioPorId = async (req, res) => {
    const { id_cambio } = req.params;
    try {
        const cambio = await formularioCambiosModel.obtenerPorId(id_cambio);
        if (!cambio) {
            return res.status(404).json({ message: 'Cambio de formulario no encontrado' });
        }
        return res.json(cambio);
    } catch (error) {
        console.error('Error al obtener cambio de formulario por ID:', error);
        return res.status(500).json({ message: 'Error al obtener cambio de formulario' });
    }
};

exports.crearCambioFormulario = async (req, res) => {
    try {
        const { id_formulario, id_usuario, motivo } = req.body;

        if (!id_formulario || !id_usuario || !motivo) {
            return res.status(400).json({ message: 'Faltan campos obligatorios: id_formulario, id_usuario o motivo' });
        }

        const formulario = await formularioModel.obtenerPorId(id_formulario);
        if (!formulario) {
            return res.status(404).json({ message: 'Formulario no encontrado' });
        }

        const usuario = await usuarioModel.obtenerPorId(id_usuario);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const nuevoCambio = await formularioCambiosModel.crear({
            id_formulario,
            id_usuario,
            motivo,
        });

        return res.status(201).json(nuevoCambio);
    } catch (error) {
        console.error('Error al crear cambio de formulario:', error);
        return res.status(500).json({ message: 'Error al crear cambio de formulario' });
    }
};

exports.actualizarCambioFormulario = async (req, res) => {
    const { id_cambio } = req.params;
    try {
        const { id_formulario, id_usuario, motivo } = req.body;

        if (!id_formulario || !id_usuario || !motivo) {
            return res.status(400).json({ message: 'Faltan campos obligatorios: id_formulario, id_usuario o motivo' });
        }

        const cambioExistente = await formularioCambiosModel.obtenerPorId(id_cambio);
        if (!cambioExistente) {
            return res.status(404).json({ message: 'Cambio de formulario no encontrado' });
        }

        const formulario = await formularioModel.obtenerPorId(id_formulario);
        if (!formulario) {
            return res.status(404).json({ message: 'Formulario no encontrado' });
        }

        const usuario = await usuarioModel.obtenerPorId(id_usuario);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const cambioActualizado = await formularioCambiosModel.actualizar(id_cambio, {
            id_formulario,
            id_usuario,
            motivo,
        });

        return res.json(cambioActualizado);
    } catch (error) {
        console.error('Error al actualizar cambio de formulario:', error);
        return res.status(500).json({ message: 'Error al actualizar cambio de formulario' });
    }
};

exports.eliminarCambioFormulario = async (req, res) => {
    const { id_cambio } = req.params;
    try {
        const cambio = await formularioCambiosModel.obtenerPorId(id_cambio);
        if (!cambio) {
            return res.status(404).json({ message: 'Cambio de formulario no encontrado' });
        }

        await formularioCambiosModel.eliminar(id_cambio);
        return res.json({ message: 'Cambio de formulario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar cambio de formulario:', error);
        return res.status(500).json({ message: 'Error al eliminar cambio de formulario' });
    }
};

exports.obtenerCambiosPorFormulario = async (req, res) => {
    const { id_formulario } = req.params;
    try {
        const formulario = await formularioModel.obtenerPorId(id_formulario);
        if (!formulario) {
            return res.status(404).json({ message: 'Formulario no encontrado' });
        }

        const cambios = await formularioCambiosModel.obtenerPorFormulario(id_formulario);
        return res.json(cambios);
    } catch (error) {
        console.error('Error al obtener cambios por formulario:', error);
        return res.status(500).json({ message: 'Error al obtener cambios por formulario' });
    }
};
