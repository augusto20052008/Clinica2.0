const formularioTipoModel = require('../models/formulario_tipo.model');

exports.obtenerFormularioTipos = async (req, res) => {
    try {
        const tipos = await formularioTipoModel.obtenerTodos();
        return res.json(tipos);
    } catch (error) {
        console.error('Error al obtener tipos de formulario:', error);
        return res.status(500).json({ message: 'Error al obtener tipos de formulario' });
    }
};

exports.obtenerFormularioTipoPorId = async (req, res) => {
    const { id_formulario_tipo } = req.params;
    try {
        const tipo = await formularioTipoModel.obtenerPorId(id_formulario_tipo);
        if (!tipo) {
            return res.status(404).json({ message: 'Tipo de formulario no encontrado' });
        }
        return res.json(tipo);
    } catch (error) {
        console.error('Error al obtener tipo de formulario:', error);
        return res.status(500).json({ message: 'Error al obtener tipo de formulario' });
    }
};

exports.crearFormularioTipo = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre) {
            return res.status(400).json({ message: 'El campo nombre es obligatorio' });
        }

        const nuevoTipo = await formularioTipoModel.crear({
            nombre,
            descripcion,
        });

        return res.status(201).json(nuevoTipo);
    } catch (error) {
        console.error('Error al crear tipo de formulario:', error);
        return res.status(500).json({ message: 'Error al crear tipo de formulario' });
    }
};

exports.actualizarFormularioTipo = async (req, res) => {
    const { id_formulario_tipo } = req.params;
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre) {
            return res.status(400).json({ message: 'El campo nombre es obligatorio para actualizar' });
        }

        const tipoExistente = await formularioTipoModel.obtenerPorId(id_formulario_tipo);
        if (!tipoExistente) {
            return res.status(404).json({ message: 'Tipo de formulario no encontrado' });
        }

        const tipoActualizado = await formularioTipoModel.actualizar(id_formulario_tipo, {
            nombre,
            descripcion
        });

        return res.json(tipoActualizado);
    } catch (error) {
        console.error('Error al actualizar tipo de formulario:', error);
        return res.status(500).json({ message: 'Error al actualizar tipo de formulario' });
    }
};

exports.eliminarFormularioTipo = async (req, res) => {
    const { id_formulario_tipo } = req.params;
    try {
        const tipoExistente = await formularioTipoModel.obtenerPorId(id_formulario_tipo);
        if (!tipoExistente) {
            return res.status(404).json({ message: 'Tipo de formulario no encontrado' });
        }

        await formularioTipoModel.eliminar(id_formulario_tipo);
        return res.json({ message: 'Tipo de formulario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar tipo de formulario:', error);
        return res.status(500).json({ message: 'Error al eliminar tipo de formulario' });
    }
};
