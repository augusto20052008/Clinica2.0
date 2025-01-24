// src/controllers/referido.controller.js
const { findAllReferidos, findReferidoById, createReferido, updateReferido, deleteReferido, } = require('../models/referido.model');

async function getReferidos(req, res) {
    try {
        const { pacienteIdentificacion } = req.query;
        const referidos = await findAllReferidos(pacienteIdentificacion);
        return res.json({
            success: true,
            data: referidos,
        });
    } catch (error) {
        console.error('Error en getReferidos:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function getReferido(req, res) {
    try {
        const { idReferido, pacienteIdentificacion } = req.params;
        const referido = await findReferidoById(idReferido, pacienteIdentificacion);
        if (!referido) {
            return res.status(404).json({
                success: false,
                message: 'Referido no encontrado',
            });
        }
        return res.json({
            success: true,
            data: referido,
        });
    } catch (error) {
        console.error('Error en getReferido:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function postReferido(req, res) {
    try {
        const newReferidoData = req.body;
        if (!newReferidoData.Paciente_identificacion) {
            return res.status(400).json({
                success: false,
                message: 'Paciente_identificacion es requerido',
            });
        }

        const { idReferido, Paciente_identificacion } = await createReferido(newReferidoData);
        return res.status(201).json({
            success: true,
            message: 'Referido creado exitosamente',
            data: { idReferido, Paciente_identificacion },
        });
    } catch (error) {
        console.error('Error en postReferido:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function putReferido(req, res) {
    try {
        const { idReferido, pacienteIdentificacion } = req.params;
        const updatedData = req.body;
        const rowsAffected = await updateReferido(idReferido, pacienteIdentificacion, updatedData);

        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se pudo actualizar. El referido no fue encontrado.',
            });
        }

        return res.json({
            success: true,
            message: 'Referido actualizado exitosamente',
        });
    } catch (error) {
        console.error('Error en putReferido:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function deleteReferidoById(req, res) {
    try {
        const { idReferido, pacienteIdentificacion } = req.params;
        const rowsAffected = await deleteReferido(idReferido, pacienteIdentificacion);

        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se pudo eliminar. El referido no fue encontrado.',
            });
        }

        return res.json({
            success: true,
            message: 'Referido eliminado exitosamente',
        });
    } catch (error) {
        console.error('Error en deleteReferidoById:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

module.exports = {
    getReferidos,
    getReferido,
    postReferido,
    putReferido,
    deleteReferidoById,
};
