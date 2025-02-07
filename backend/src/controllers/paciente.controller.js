const pacienteModel = require('../models/paciente.model');

exports.obtenerPacientes = async (req, res) => {
    try {
        const pacientes = await pacienteModel.obtenerTodos();
        return res.json(pacientes);
    } catch (error) {
        console.error('Error al obtener pacientes:', error);
        return res.status(500).json({ message: 'Error al obtener pacientes' });
    }
};

exports.obtenerPacientePorId = async (req, res) => {
    const { nro_identificacion } = req.params;
    try {
        const paciente = await pacienteModel.obtenerPorId(nro_identificacion);
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        return res.json(paciente);
    } catch (error) {
        console.error('Error al obtener paciente:', error);
        return res.status(500).json({ message: 'Error al obtener paciente' });
    }
};

exports.crearPaciente = async (req, res) => {
    try {
        const {
            nro_identificacion,
            tipo_identificacion,
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            genero,
            fecha_nacimiento
        } = req.body;

        if (
            !nro_identificacion ||
            !tipo_identificacion ||
            !primer_nombre ||
            !primer_apellido ||
            !segundo_apellido ||
            !genero ||
            !fecha_nacimiento
        ) {
            return res.status(400).json({
                message: 'Faltan campos obligatorios (revisa la identificación, nombres, apellidos, género y fecha de nacimiento)'
            });
        }

        const nuevoPaciente = await pacienteModel.crear({
            nro_identificacion,
            tipo_identificacion,
            primer_nombre,
            segundo_nombre: segundo_nombre || '',
            primer_apellido,
            segundo_apellido,
            genero,
            fecha_nacimiento
        });

        return res.status(201).json(nuevoPaciente);
    } catch (error) {
        console.error('Error al crear paciente:', error);
        return res.status(500).json({ message: 'Error al crear paciente' });
    }
};

exports.actualizarPaciente = async (req, res) => {
    const { nro_identificacion } = req.params;
    try {
        const {
            tipo_identificacion,
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            genero,
            fecha_nacimiento
        } = req.body;

        if (
            !tipo_identificacion ||
            !primer_nombre ||
            !primer_apellido ||
            !segundo_apellido ||
            !genero ||
            !fecha_nacimiento
        ) {
            return res.status(400).json({
                message: 'Faltan campos obligatorios para actualizar (tipo_identificacion, nombres, apellidos, género, fecha_nacimiento)'
            });
        }

        const pacienteExistente = await pacienteModel.obtenerPorId(nro_identificacion);
        if (!pacienteExistente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }

        const pacienteActualizado = await pacienteModel.actualizar(nro_identificacion, {
            tipo_identificacion,
            primer_nombre,
            segundo_nombre: segundo_nombre || '',
            primer_apellido,
            segundo_apellido,
            genero,
            fecha_nacimiento
        });

        return res.json(pacienteActualizado);
    } catch (error) {
        console.error('Error al actualizar paciente:', error);
        return res.status(500).json({ message: 'Error al actualizar paciente' });
    }
};

exports.eliminarPaciente = async (req, res) => {
    const { nro_identificacion } = req.params;
    try {
        const paciente = await pacienteModel.obtenerPorId(nro_identificacion);
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }

        await pacienteModel.eliminar(nro_identificacion);
        return res.json({ message: 'Paciente eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar paciente:', error);
        return res.status(500).json({ message: 'Error al eliminar paciente' });
    }
};
