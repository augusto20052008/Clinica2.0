const { findAllFormularios, findFormularioById, createFormulario, updateFormulario, deleteFormulario, } = require('../models/formulario.model');

async function getFormularios(req, res) {
    try {
        const { estadoFormulario } = req.query;
        const formularios = await findAllFormularios(estadoFormulario);
        return res.json({
            success: true,
            data: formularios,
        });
    } catch (error) {
        console.error('Error en getFormularios:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function getFormulario(req, res) {    
    try {
        const { idHistoriaClinica } = req.params;
        const formularios = await findFormularioById(idHistoriaClinica);
        return res.json({
            success: true,
            data: formularios,
        });
    } catch (error) {
        console.error('Error en getFormularioByHistoriaClinica:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function postFormulario(req, res) {
    try {
        const formData = req.body;

        if (!formData.HistoriaClinica_idHistoriaClinica) {
            return res.status(400).json({
                success: false,
                message: 'HistoriaClinica_idHistoriaClinica es requerido',
            });
        }
        if (!formData.Plantilla_Formulario_idPlantilla_Formulario) {
            return res.status(400).json({
                success: false,
                message: 'Plantilla_Formulario_idPlantilla_Formulario es requerido',
            });
        }
        if (!formData.Establecimiento_idEstablecimiento) {
            return res.status(400).json({
                success: false,
                message: 'Establecimiento_idEstablecimiento es requerido',
            });
        }

        const nuevoFormulario = await createFormulario(formData);
        return res.status(201).json({
            success: true,
            message: 'Formulario creado exitosamente',
            data: nuevoFormulario,
        });
    } catch (error) {
        console.error('Error en postFormulario:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function putFormulario(req, res) {
    try {
        const {
            idFormulario,
            idHistoriaClinica,
            idPlantilla,
            idEstablecimiento,
        } = req.params;
        const updatedData = req.body;

        const rowsAffected = await updateFormulario(
            idFormulario,
            idHistoriaClinica,
            idPlantilla,
            idEstablecimiento,
            updatedData
        );

        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: 'Formulario no encontrado o no se pudo actualizar',
            });
        }

        return res.json({
            success: true,
            message: 'Formulario actualizado exitosamente',
        });
    } catch (error) {
        console.error('Error en putFormulario:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function deleteFormularioById(req, res) {
    try {
        const {
            idFormulario,
            idHistoriaClinica,
            idPlantilla,
            idEstablecimiento,
        } = req.params;

        const rowsAffected = await deleteFormulario(
            idFormulario,
            idHistoriaClinica,
            idPlantilla,
            idEstablecimiento
        );

        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: 'Formulario no encontrado o no se pudo eliminar',
            });
        }

        return res.json({
            success: true,
            message: 'Formulario eliminado exitosamente',
        });
    } catch (error) {
        console.error('Error en deleteFormularioById:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

module.exports = {
    getFormularios,
    getFormulario,
    postFormulario,
    putFormulario,
    deleteFormularioById,
};
