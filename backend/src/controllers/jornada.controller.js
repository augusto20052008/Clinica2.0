const { findAllJornadas, findJornadaById, createJornada, updateJornada, deleteJornada, } = require('../models/jornada.model');

async function getJornadas(req, res) {
    try {
        const jornadas = await findAllJornadas();
        return res.json({
            success: true,
            data: jornadas,
        });
    } catch (error) {
        console.error('Error en getJornadas:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function getJornada(req, res) {
    try {
        const { idJornada, usuarioIdentificacion } = req.params;
        const jornada = await findJornadaById(idJornada, usuarioIdentificacion);
        if (!jornada) {
            return res.status(404).json({
                success: false,
                message: 'Jornada no encontrada',
            });
        }
        return res.json({
            success: true,
            data: jornada,
        });
    } catch (error) {
        console.error('Error en getJornada:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function postJornada(req, res) {
    try {
        const newJornadaData = req.body;
        const { idJornada, Usuario_identificacion } = await createJornada(newJornadaData);
        return res.status(201).json({
            success: true,
            message: 'Jornada creada exitosamente',
            data: { idJornada, Usuario_identificacion },
        });
    } catch (error) {
        console.error('Error en postJornada:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function putJornada(req, res) {
    try {
        const { idJornada, usuarioIdentificacion } = req.params;
        const updatedData = req.body;
        const rowsAffected = await updateJornada(idJornada, usuarioIdentificacion, updatedData);

        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se pudo actualizar. La jornada no fue encontrada.',
            });
        }
        return res.json({
            success: true,
            message: 'Jornada actualizada exitosamente',
        });
    } catch (error) {
        console.error('Error en putJornada:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function deleteJornadaById(req, res) {
    try {
        const { idJornada, usuarioIdentificacion } = req.params;
        const rowsAffected = await deleteJornada(idJornada, usuarioIdentificacion);

        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se pudo eliminar. La jornada no fue encontrada.',
            });
        }
        return res.json({
            success: true,
            message: 'Jornada eliminada exitosamente',
        });
    } catch (error) {
        console.error('Error en deleteJornadaById:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

module.exports = {
    getJornadas,
    getJornada,
    postJornada,
    putJornada,
    deleteJornadaById,
};
