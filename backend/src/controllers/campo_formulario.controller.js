const campoFormularioModel = require('../models/campo_formulario.model');

exports.obtenerCamposFormulario = async (req, res) => {
    try {
        const campos = await campoFormularioModel.obtenerTodos();
        return res.json(campos);
    } catch (error) {
        console.error('Error al obtener campos de formulario:', error);
        return res.status(500).json({ message: 'Error al obtener campos de formulario' });
    }
};

exports.obtenerCampoFormularioPorId = async (req, res) => {
    const { id_campo } = req.params;
    try {
        const campo = await campoFormularioModel.obtenerPorId(id_campo);
        if (!campo) {
            return res.status(404).json({ message: 'Campo de formulario no encontrado' });
        }
        return res.json(campo);
    } catch (error) {
        console.error('Error al obtener campo de formulario por ID:', error);
        return res.status(500).json({ message: 'Error al obtener campo de formulario' });
    }
};

exports.obtenerCampoFormularioPorFormulario = async (req, res) => {
    const { idFormularioTipo } = req.params;
    try {
        const campo = await campoFormularioModel.obtenerPorFormulario(idFormularioTipo);
        if (!campo) {
            return res.status(404).json({ message: 'Error al obtener campos del tipo formulario especificado' });
        }
        return res.json(campo);
    } catch (error) {
        console.error('Error al obtener campos de formulario por ID:', error);
        return res.status(500).json({ message: 'Error al obtener campos de tipo formulario' });
    }
};

exports.getCamposByFormularioYSeccion = async (req, res) => {
    try {
        const { idFormulario, idSeccion } = req.params;

        if (!idFormulario || !idSeccion) {
            return res.status(400).json({ error: 'Faltan parámetros requeridos' });
        }

        const results = await campoFormularioModel.obtenerCamposPorFormularioYSeccion(idFormulario, idSeccion);
        res.json(results);

    } catch (error) {
        res.status(500).json({ error: 'Error en la consulta a la base de datos', detalles: error.message });
    }
}

exports.crearCampoFormulario = async (req, res) => {
    try {
        const {
            id_formulario_tipo,
            id_seccion,
            nombre_campo,
            tipo_dato,
            requerido,
            opciones,
        } = req.body;

        if (
            !id_formulario_tipo ||
            !id_seccion ||
            !nombre_campo ||
            !tipo_dato ||
            typeof requerido === 'undefined'
        ) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

        const nuevoCampo = await campoFormularioModel.crear({
            id_formulario_tipo,
            id_seccion,
            nombre_campo,
            tipo_dato,
            requerido,
            opciones,
        });

        return res.status(201).json(nuevoCampo);
    } catch (error) {
        console.error('Error al crear campo de formulario:', error);
        return res.status(500).json({ message: 'Error al crear campo de formulario' });
    }
};

exports.actualizarCampoFormulario = async (req, res) => {
    const { id_campo } = req.params;
    try {
        const {
            id_formulario_tipo,
            id_seccion,
            nombre_campo,
            tipo_dato,
            requerido,
            opciones,
        } = req.body;

        if (
            !id_formulario_tipo ||
            !id_seccion ||
            !nombre_campo ||
            !tipo_dato ||
            typeof requerido === 'undefined'
        ) {
            return res.status(400).json({ message: 'Faltan campos obligatorios para actualizar' });
        }

        const campoExistente = await campoFormularioModel.obtenerPorId(id_campo);
        if (!campoExistente) {
            return res.status(404).json({ message: 'Campo de formulario no encontrado' });
        }

        const campoActualizado = await campoFormularioModel.actualizar(id_campo, {
            id_formulario_tipo,
            id_seccion,
            nombre_campo,
            tipo_dato,
            requerido,
            opciones,
        });

        return res.json(campoActualizado);
    } catch (error) {
        console.error('Error al actualizar campo de formulario:', error);
        return res.status(500).json({ message: 'Error al actualizar campo de formulario' });
    }
};

exports.eliminarCampoFormulario = async (req, res) => {
    const { id_campo } = req.params;
    try {
        const campo = await campoFormularioModel.obtenerPorId(id_campo);
        if (!campo) {
            return res.status(404).json({ message: 'Campo de formulario no encontrado' });
        }

        await campoFormularioModel.eliminar(id_campo);
        return res.json({ message: 'Campo de formulario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar campo de formulario:', error);
        return res.status(500).json({ message: 'Error al eliminar campo de formulario' });
    }
};
