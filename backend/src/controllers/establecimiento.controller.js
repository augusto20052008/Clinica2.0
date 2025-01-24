const { findAllEstablecimientos, findEstablecimientoById, createEstablecimiento, updateEstablecimiento, deleteEstablecimiento, } = require('../models/establecimiento.model');

async function getEstablecimientos(req, res) {
    try {
        const establecimientos = await findAllEstablecimientos();
        return res.json({
            success: true,
            data: establecimientos,
        });
    } catch (error) {
        console.error('Error en getEstablecimientos:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function getEstablecimiento(req, res) {
    try {
        const { idEstablecimiento } = req.params;
        const establecimiento = await findEstablecimientoById(idEstablecimiento);
        if (!establecimiento) {
            return res.status(404).json({
                success: false,
                message: 'Establecimiento no encontrado',
            });
        }
        return res.json({
            success: true,
            data: establecimiento,
        });
    } catch (error) {
        console.error('Error en getEstablecimiento:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function postEstablecimiento(req, res) {
    try {
        const newData = req.body;
        const insertId = await createEstablecimiento(newData);
        return res.status(201).json({
            success: true,
            message: 'Establecimiento creado exitosamente',
            data: { idEstablecimiento: insertId },
        });
    } catch (error) {
        console.error('Error en postEstablecimiento:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function putEstablecimiento(req, res) {
    try {
        const { idEstablecimiento } = req.params;
        const updatedData = req.body;
        const rowsAffected = await updateEstablecimiento(idEstablecimiento, updatedData);

        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se pudo actualizar. El establecimiento no fue encontrado.',
            });
        }
        return res.json({
            success: true,
            message: 'Establecimiento actualizado exitosamente',
        });
    } catch (error) {
        console.error('Error en putEstablecimiento:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function deleteEstablecimientoById(req, res) {
    try {
        const { idEstablecimiento } = req.params;
        const rowsAffected = await deleteEstablecimiento(idEstablecimiento);
        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se pudo eliminar. El establecimiento no fue encontrado.',
            });
        }
        return res.json({
            success: true,
            message: 'Establecimiento eliminado exitosamente',
        });
    } catch (error) {
        console.error('Error en deleteEstablecimientoById:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

module.exports = {
    getEstablecimientos,
    getEstablecimiento,
    postEstablecimiento,
    putEstablecimiento,
    deleteEstablecimientoById,
};
