const seccionFormularioModel = require('../models/seccion_formulario.model');

exports.obtenerSeccionesFormulario = async (req, res) => {
    try {
        const secciones = await seccionFormularioModel.obtenerTodos();
        return res.json(secciones);
    } catch (error) {
        console.error('Error al obtener secciones de formulario:', error);
        return res.status(500).json({ message: 'Error al obtener secciones de formulario' });
    }
};

exports.obtenerSeccionFormularioPorId = async (req, res) => {
    const { id_seccion } = req.params;
    try {
        const seccion = await seccionFormularioModel.obtenerPorId(id_seccion);
        if (!seccion) {
            return res.status(404).json({ message: 'Sección de formulario no encontrada' });
        }
        return res.json(seccion);
    } catch (error) {
        console.error('Error al obtener sección de formulario por ID:', error);
        return res.status(500).json({ message: 'Error al obtener sección de formulario' });
    }
};

exports.crearSeccionFormulario = async (req, res) => {
    try {
        const {
            id_formulario_tipo,
            nombre_seccion,
            descripcion,
        } = req.body;

        if (
            !id_formulario_tipo ||
            !nombre_seccion
        ) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

        const nuevaSeccion = await seccionFormularioModel.crear({
            id_formulario_tipo,
            nombre_seccion,
            descripcion,
        });

        return res.status(201).json(nuevaSeccion);
    } catch (error) {
        console.error('Error al crear sección de formulario:', error);
        return res.status(500).json({ message: 'Error al crear sección de formulario' });
    }
};

exports.actualizarSeccionFormulario = async (req, res) => {
    const { id_seccion } = req.params;
    try {
        const {
            id_formulario_tipo,
            nombre_seccion,
            descripcion,
        } = req.body;

        if (
            !id_formulario_tipo ||
            !nombre_seccion
        ) {
            return res.status(400).json({ message: 'Faltan campos obligatorios para actualizar' });
        }

        const seccionExistente = await seccionFormularioModel.obtenerPorId(id_seccion);
        if (!seccionExistente) {
            return res.status(404).json({ message: 'Sección de formulario no encontrada' });
        }

        const seccionActualizada = await seccionFormularioModel.actualizar(id_seccion, {
            id_formulario_tipo,
            nombre_seccion,
            descripcion,
        });

        return res.json(seccionActualizada);
    } catch (error) {
        console.error('Error al actualizar sección de formulario:', error);
        return res.status(500).json({ message: 'Error al actualizar sección de formulario' });
    }
};

exports.eliminarSeccionFormulario = async (req, res) => {
    const { id_seccion } = req.params;
    try {
        const seccion = await seccionFormularioModel.obtenerPorId(id_seccion);
        if (!seccion) {
            return res.status(404).json({ message: 'Sección de formulario no encontrada' });
        }

        await seccionFormularioModel.eliminar(id_seccion);
        return res.json({ message: 'Sección de formulario eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar sección de formulario:', error);
        return res.status(500).json({ message: 'Error al eliminar sección de formulario' });
    }
};
