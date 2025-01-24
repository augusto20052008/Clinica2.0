const { findAllPacientes, findPacienteById, createPaciente, updatePaciente, deletePaciente, } = require('../models/paciente.model');

async function getPacientes(req, res) {
    try {
        const pacientes = await findAllPacientes();
        return res.json({
            success: true,
            data: pacientes,
        });
    } catch (error) {
        console.error('Error en getPacientes:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function getPaciente(req, res) {
    try {
        const { identificacion } = req.params;
        const paciente = await findPacienteById(identificacion);
        if (!paciente) {
            return res.status(404).json({
                success: false,
                message: 'Paciente no encontrado',
            });
        }
        return res.json({
            success: true,
            data: paciente,
        });
    } catch (error) {
        console.error('Error en getPaciente:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function postPaciente(req, res) {
    try {
        const newPacienteData = req.body;
        const insertedId = await createPaciente(newPacienteData);
        return res.status(201).json({
            success: true,
            message: 'Paciente creado exitosamente',
            data: { identificacion: insertedId },
        });
    } catch (error) {
        console.error('Error en postPaciente:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function putPaciente(req, res) {
    try {
        const { identificacion } = req.params;
        const updatedData = req.body;

        const rowsAffected = await updatePaciente(identificacion, updatedData);
        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: `No se pudo actualizar. El paciente con ID ${identificacion} no fue encontrado.`,
            });
        }
        return res.json({
            success: true,
            message: 'Paciente actualizado exitosamente',
        });
    } catch (error) {
        console.error('Error en putPaciente:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

async function deletePacienteById(req, res) {
    try {
        const { identificacion } = req.params;
        const rowsAffected = await deletePaciente(identificacion);
        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: `No se pudo eliminar. Paciente con ID ${identificacion} no encontrado.`,
            });
        }
        return res.json({
            success: true,
            message: 'Paciente eliminado exitosamente',
        });
    } catch (error) {
        console.error('Error en deletePacienteById:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
}

module.exports = {
    getPacientes,
    getPaciente,
    postPaciente,
    putPaciente,
    deletePacienteById,
};
