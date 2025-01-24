const {
    findAllPlantillas,
    findPlantillaById,
    createPlantilla,
    updatePlantilla,
    deletePlantilla,
} = require('../models/plantillaFormulario.model');

async function getPlantillas(req, res) {
    try {
        const plantillas = await findAllPlantillas();
        return res.json({
            success: true,
            data: plantillas,
        });
    } catch (error) {
        console.error('Error en getPlantillas:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function getPlantilla(req, res) {
    try {
        const { id } = req.params;
        const plantilla = await findPlantillaById(id);
        if (!plantilla) {
            return res.status(404).json({
                success: false,
                message: 'Plantilla de formulario no encontrada',
            });
        }
        return res.json({
            success: true,
            data: plantilla,
        });
    } catch (error) {
        console.error('Error en getPlantilla:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function postPlantilla(req, res) {
    try {
        const newData = req.body;
        const insertId = await createPlantilla(newData);
        return res.status(201).json({
            success: true,
            message: 'Plantilla de formulario creada exitosamente',
            data: { idPlantilla_Formulario: insertId },
        });
    } catch (error) {
        console.error('Error en postPlantilla:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function putPlantilla(req, res) {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const rowsAffected = await updatePlantilla(id, updatedData);

        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se pudo actualizar. La plantilla no fue encontrada.',
            });
        }
        return res.json({
            success: true,
            message: 'Plantilla de formulario actualizada exitosamente',
        });
    } catch (error) {
        console.error('Error en putPlantilla:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function deletePlantillaById(req, res) {
    try {
        const { id } = req.params;
        const rowsAffected = await deletePlantilla(id);

        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se pudo eliminar. La plantilla no fue encontrada.',
            });
        }
        return res.json({
            success: true,
            message: 'Plantilla de formulario eliminada exitosamente',
        });
    } catch (error) {
        console.error('Error en deletePlantillaById:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

module.exports = {
    getPlantillas,
    getPlantilla,
    postPlantilla,
    putPlantilla,
    deletePlantillaById,
};
