const { findAllFirmas, findFirmaById, createFirma, updateFirma, deleteFirma, } = require('../models/firmaElectronica.model');

async function getFirmas(req, res) {
    try {
        const firmas = await findAllFirmas();
        return res.json({
            success: true,
            data: firmas,
        });
    } catch (error) {
        console.error('Error en getFirmas:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function getFirma(req, res) {
    try {
        const { idFirmaElectronica, usuarioIdentificacion } = req.params;
        const firma = await findFirmaById(idFirmaElectronica, usuarioIdentificacion);
        if (!firma) {
            return res.status(404).json({
                success: false,
                message: 'Firma electrónica no encontrada',
            });
        }
        return res.json({
            success: true,
            data: firma,
        });
    } catch (error) {
        console.error('Error en getFirma:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function postFirma(req, res) {
    try {
        const newFirma = req.body;
        const { idFirmaElectronica, Usuario_identificacion } = await createFirma(newFirma);
        return res.status(201).json({
            success: true,
            message: 'Firma electrónica creada exitosamente',
            data: { idFirmaElectronica, Usuario_identificacion },
        });
    } catch (error) {
        console.error('Error en postFirma:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function putFirma(req, res) {
    try {
        const { idFirmaElectronica, usuarioIdentificacion } = req.params;
        const updatedData = req.body;

        const rowsAffected = await updateFirma(idFirmaElectronica, usuarioIdentificacion, updatedData);
        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se pudo actualizar. La firma electrónica no fue encontrada.',
            });
        }
        return res.json({
            success: true,
            message: 'Firma electrónica actualizada exitosamente',
        });
    } catch (error) {
        console.error('Error en putFirma:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function deleteFirmaById(req, res) {
    try {
        const { idFirmaElectronica, usuarioIdentificacion } = req.params;
        const rowsAffected = await deleteFirma(idFirmaElectronica, usuarioIdentificacion);
        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se pudo eliminar. La firma electrónica no fue encontrada.',
            });
        }
        return res.json({
            success: true,
            message: 'Firma electrónica eliminada exitosamente',
        });
    } catch (error) {
        console.error('Error en deleteFirmaById:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

module.exports = {
    getFirmas,
    getFirma,
    postFirma,
    putFirma,
    deleteFirmaById,
};
