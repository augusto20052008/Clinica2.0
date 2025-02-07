const formularioModel = require('../models/formulario.model');

async function obtenerFormularios(req, res) {
    try {
        const formularios = await formularioModel.obtenerTodos();
        res.status(200).json(formularios);
    } catch (error) {
        console.error('Error al obtener formularios:', error);
        res.status(500).json({ mensaje: 'Error al obtener formularios.' });
    }
}

async function obtenerFormularioPorId(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ mensaje: 'ID de formulario inválido.' });
        }

        const formulario = await formularioModel.obtenerPorId(id);
        if (!formulario) {
            return res.status(404).json({ mensaje: 'Formulario no encontrado.' });
        }

        res.status(200).json(formulario);
    } catch (error) {
        console.error('Error al obtener el formulario:', error);
        res.status(500).json({ mensaje: 'Error al obtener el formulario.' });
    }
}

async function crearFormulario(req, res) {
    try {
        const { id_formulario_tipo, nro_archivo, id_usuario_creador, estado } = req.body;

        if (
            id_formulario_tipo === undefined ||
            nro_archivo === undefined ||
            id_usuario_creador === undefined ||
            !estado
        ) {
            return res.status(400).json({ mensaje: 'Faltan campos requeridos.' });
        }

        const estadosPermitidos = ['BORRADOR', 'COMPLETADO', 'EDITADO'];
        if (!estadosPermitidos.includes(estado)) {
            return res.status(400).json({
                mensaje: `Estado inválido. Valores permitidos: ${estadosPermitidos.join(', ')}.`,
            });
        }

        const nuevoFormulario = await formularioModel.crear({
            id_formulario_tipo,
            nro_archivo,
            id_usuario_creador,
            estado,
        });

        res.status(201).json(nuevoFormulario);
    } catch (error) {
        console.error('Error al crear el formulario:', error);
        res.status(500).json({ mensaje: 'Error al crear el formulario.' });
    }
}

async function actualizarFormulario(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ mensaje: 'ID de formulario inválido.' });
        }

        const formularioExistente = await formularioModel.obtenerPorId(id);
        if (!formularioExistente) {
            return res.status(404).json({ mensaje: 'Formulario no encontrado.' });
        }

        const { id_formulario_tipo, nro_archivo, id_usuario_creador, estado } = req.body;

        const estadosPermitidos = ['BORRADOR', 'COMPLETADO', 'EDITADO'];
        if (estado && !estadosPermitidos.includes(estado)) {
            return res.status(400).json({
                mensaje: `Estado inválido. Valores permitidos: ${estadosPermitidos.join(', ')}.`,
            });
        }

        const dataActualizar = {
            id_formulario_tipo: id_formulario_tipo !== undefined ? id_formulario_tipo : formularioExistente.id_formulario_tipo,
            nro_archivo: nro_archivo !== undefined ? nro_archivo : formularioExistente.nro_archivo,
            id_usuario_creador: id_usuario_creador !== undefined ? id_usuario_creador : formularioExistente.id_usuario_creador,
            estado: estado !== undefined ? estado : formularioExistente.estado,
        };

        const formularioActualizado = await formularioModel.actualizar(id, dataActualizar);

        res.status(200).json(formularioActualizado);
    } catch (error) {
        console.error('Error al actualizar el formulario:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el formulario.' });
    }
}

async function eliminarFormulario(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ mensaje: 'ID de formulario inválido.' });
        }

        const formularioExistente = await formularioModel.obtenerPorId(id);
        if (!formularioExistente) {
            return res.status(404).json({ mensaje: 'Formulario no encontrado.' });
        }

        await formularioModel.eliminar(id);
        res.status(200).json({ mensaje: 'Formulario eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar el formulario:', error);
        res.status(500).json({ mensaje: 'Error al eliminar el formulario.' });
    }
}

module.exports = {
    obtenerFormularios,
    obtenerFormularioPorId,
    crearFormulario,
    actualizarFormulario,
    eliminarFormulario,
};
