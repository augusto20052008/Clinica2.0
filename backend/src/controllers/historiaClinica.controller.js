const { findAllHistorias, findHistoriaById, findIdHistoria, createHistoria, updateHistoria, deleteHistoria, } = require('../models/historiaClinica.model');

async function getHistorias(req, res) {
    try {
        const { pacienteIdentificacion } = req.query;
        const historias = await findAllHistorias(pacienteIdentificacion);
        return res.json({
            success: true,
            data: historias,
        });
    } catch (error) {
        console.error('Error en getHistorias:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function getHistoria(req, res) {
    try {
        const { pacienteIdentificacion } = req.params;
        const historia = await findHistoriaById(pacienteIdentificacion);

        if (!historia) {
            return res.status(404).json({
                success: false,
                message: 'Historia clínica del paciente no encontrada',
            });
        }

        return res.json({
            success: true,
            data: historia,
        });
    } catch (error) {
        console.error('Error en getHistoria:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function getIdHistoria(req, res) {
    try {
        const idHistoria = await findAllHistorias();
        return res.json({
            success: true,
            data: idHistoria
        });
    } catch (error) {
        console.error('Error en getIdHistoria:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function postHistoria(req, res) {
    try {
        const historiaData = req.body;

        if (!historiaData.Paciente_identificacion) {
            return res.status(400).json({
                success: false,
                message: 'Paciente_identificacion es requerido',
            });
        }

        const historia = await createHistoria(historiaData);
        return res.status(201).json({
            success: true,
            message: 'Historia clínica creada exitosamente',
            data: historia,
        });
    } catch (error) {
        console.error('Error en postHistoria:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function putHistoria(req, res) {
    try {
        const { idHistoriaClinica, pacienteIdentificacion } = req.params;
        const updatedData = req.body;

        const rowsAffected = await updateHistoria(idHistoriaClinica, pacienteIdentificacion, updatedData);

        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: 'Historia clínica no encontrada',
            });
        }

        return res.json({
            success: true,
            message: 'Historia clínica actualizada exitosamente',
        });
    } catch (error) {
        console.error('Error en putHistoria:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function deleteHistoriaById(req, res) {
    try {
        const { idHistoriaClinica, pacienteIdentificacion } = req.params;

        const rowsAffected = await deleteHistoria(idHistoriaClinica, pacienteIdentificacion);

        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: 'Historia clínica no encontrada',
            });
        }

        return res.json({
            success: true,
            message: 'Historia clínica eliminada exitosamente',
        });
    } catch (error) {
        console.error('Error en deleteHistoriaById:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

module.exports = {
    getHistorias,
    getHistoria,
    getIdHistoria,
    postHistoria,
    putHistoria,
    deleteHistoriaById,
};
