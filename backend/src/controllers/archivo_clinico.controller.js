const archivoModel = require('../models/archivo_clinico.model');

exports.obtenerArchivos = async (req, res) => {
    try {
        const archivos = await archivoModel.obtenerTodos();
        return res.json(archivos);
    } catch (error) {
        console.error('Error al obtener archivos clínicos:', error);
        return res.status(500).json({ message: 'Error al obtener archivos clínicos' });
    }
};

exports.obtenerArchivoPorId = async (req, res) => {
    const { nro_archivo } = req.params;
    try {
        const archivo = await archivoModel.obtenerPorId(nro_archivo);
        if (!archivo) {
            return res.status(404).json({ message: 'Archivo clínico no encontrado' });
        }
        return res.json(archivo);
    } catch (error) {
        console.error('Error al obtener archivo clínico por ID:', error);
        return res.status(500).json({ message: 'Error al obtener archivo clínico' });
    }
};

exports.crearArchivo = async (req, res) => {
    try {
        const { nro_identificacion } = req.body;
        if (!nro_identificacion) {
            return res.status(400).json({ message: 'Falta el campo nro_identificacion (paciente)' });
        }

        const nuevoArchivo = await archivoModel.crear({
            nro_identificacion,
        });

        return res.status(201).json(nuevoArchivo);
    } catch (error) {
        console.error('Error al crear archivo clínico:', error);
        return res.status(500).json({ message: 'Error al crear archivo clínico' });
    }
};

exports.actualizarArchivo = async (req, res) => {
    const { nro_archivo } = req.params;
    try {
        const { nro_identificacion } = req.body;
        if (!nro_identificacion) {
            return res.status(400).json({ message: 'Falta el campo nro_identificacion para actualizar' });
        }

        const archivoExistente = await archivoModel.obtenerPorId(nro_archivo);
        if (!archivoExistente) {
            return res.status(404).json({ message: 'Archivo clínico no encontrado' });
        }

        const archivoActualizado = await archivoModel.actualizar(nro_archivo, {
            nro_identificacion,
        });

        return res.json(archivoActualizado);
    } catch (error) {
        console.error('Error al actualizar archivo clínico:', error);
        return res.status(500).json({ message: 'Error al actualizar archivo clínico' });
    }
};

exports.eliminarArchivo = async (req, res) => {
    const { nro_archivo } = req.params;
    try {
        const archivo = await archivoModel.obtenerPorId(nro_archivo);
        if (!archivo) {
            return res.status(404).json({ message: 'Archivo clínico no encontrado' });
        }

        await archivoModel.eliminar(nro_archivo);
        return res.json({ message: 'Archivo clínico eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar archivo clínico:', error);
        return res.status(500).json({ message: 'Error al eliminar archivo clínico' });
    }
};

exports.asignarFormularioAHistoria = async (req, res) => {
    const { nro_archivo } = req.params;
    const { id_formulario } = req.body;

    if (!id_formulario) {
        return res.status(400).json({ message: "Falta el ID del formulario a asignar." });
    }

    try {
        const archivoExistente = await archivoModel.obtenerPorId(nro_archivo);
        if (!archivoExistente) {
            return res.status(404).json({ message: "Historia clínica no encontrada." });
        }

        // Guardar la asignación del formulario a la historia clínica
        await archivoModel.asignarFormulario(nro_archivo, id_formulario);

        return res.json({ message: "Formulario asignado exitosamente a la historia clínica." });
    } catch (error) {
        console.error("Error al asignar formulario a historia clínica:", error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};
