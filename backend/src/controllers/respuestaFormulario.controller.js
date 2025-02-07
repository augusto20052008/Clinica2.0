const respuestaFormularioModel = require('../models/respuesta_formulario.model');

exports.obtenerRespuestasFormulario = async (req, res) => {
    try {
        const respuestas = await respuestaFormularioModel.obtenerTodos();
        return res.json(respuestas);
    } catch (error) {
        console.error('Error al obtener respuestas de formularios:', error);
        return res.status(500).json({ message: 'Error al obtener respuestas de formularios' });
    }
};

exports.obtenerRespuestaFormularioPorId = async (req, res) => {
    const { id_formulario, id_campo } = req.params;
    try {
        const respuesta = await respuestaFormularioModel.obtenerPorId(id_formulario, id_campo);
        if (!respuesta) {
            return res.status(404).json({ message: 'Respuesta de formulario no encontrada' });
        }
        return res.json(respuesta);
    } catch (error) {
        console.error('Error al obtener respuesta de formulario por ID:', error);
        return res.status(500).json({ message: 'Error al obtener respuesta de formulario' });
    }
};

exports.crearRespuestaFormulario = async (req, res) => {
    try {
        const { id_formulario, id_campo, valor } = req.body;

        if (!id_formulario || !id_campo) {
            return res.status(400).json({ message: 'Faltan campos obligatorios: id_formulario o id_campo' });
        }

        const respuestaExistente = await respuestaFormularioModel.obtenerPorFormularioYCampo(id_formulario, id_campo);
        if (respuestaExistente) {
            return res.status(409).json({ message: 'La respuesta para este formulario y campo ya existe' });
        }

        const nuevaRespuesta = await respuestaFormularioModel.crear({
            id_formulario,
            id_campo,
            valor,
        });

        return res.status(201).json(nuevaRespuesta);
    } catch (error) {
        console.error('Error al crear respuesta de formulario:', error);
        return res.status(500).json({ message: 'Error al crear respuesta de formulario' });
    }
};

exports.actualizarRespuestaFormulario = async (req, res) => {
    const { id_respuesta } = req.params;
    try {
        const { id_formulario, id_campo, valor } = req.body;

        if (!id_formulario || !id_campo) {
            return res.status(400).json({ message: 'Faltan campos obligatorios: id_formulario o id_campo' });
        }

        const respuestaExistente = await respuestaFormularioModel.obtenerPorId(id_respuesta);
        if (!respuestaExistente) {
            return res.status(404).json({ message: 'Respuesta de formulario no encontrada' });
        }

        if (id_formulario !== respuestaExistente.id_formulario || id_campo !== respuestaExistente.id_campo) {
            const otraRespuesta = await respuestaFormularioModel.obtenerPorFormularioYCampo(id_formulario, id_campo);
            if (otraRespuesta) {
                return res.status(409).json({ message: 'Otra respuesta ya existe para este formulario y campo' });
            }
        }

        const respuestaActualizada = await respuestaFormularioModel.actualizar(id_respuesta, {
            id_formulario,
            id_campo,
            valor,
        });

        return res.json(respuestaActualizada);
    } catch (error) {
        console.error('Error al actualizar respuesta de formulario:', error);
        return res.status(500).json({ message: 'Error al actualizar respuesta de formulario' });
    }
};

exports.eliminarRespuestaFormulario = async (req, res) => {
    const { id_respuesta } = req.params;
    try {
        const respuesta = await respuestaFormularioModel.obtenerPorId(id_respuesta);
        if (!respuesta) {
            return res.status(404).json({ message: 'Respuesta de formulario no encontrada' });
        }

        await respuestaFormularioModel.eliminar(id_respuesta);
        return res.json({ message: 'Respuesta de formulario eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar respuesta de formulario:', error);
        return res.status(500).json({ message: 'Error al eliminar respuesta de formulario' });
    }
};

exports.obtenerRespuestasPorFormulario = async (req, res) => {
    const { id_formulario } = req.params;
    try {
        const respuestas = await respuestaFormularioModel.obtenerPorFormulario(id_formulario);
        return res.json(respuestas);
    } catch (error) {
        console.error('Error al obtener respuestas por formulario:', error);
        return res.status(500).json({ message: 'Error al obtener respuestas por formulario' });
    }
};
