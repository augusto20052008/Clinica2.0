const formularioCambiosDetallesModel = require('../models/formulario_cambios_detalles.model');
const formularioCambiosModel = require('../models/formulario_cambios.model');
const campoFormularioModel = require('../models/campo_formulario.model');

exports.obtenerDetallesCambiosFormulario = async (req, res) => {
    try {
        const detalles = await formularioCambiosDetallesModel.obtenerTodos();
        return res.json(detalles);
    } catch (error) {
        console.error('Error al obtener detalles de cambios de formularios:', error);
        return res.status(500).json({ message: 'Error al obtener detalles de cambios de formularios' });
    }
};

exports.obtenerDetalleCambioFormularioPorId = async (req, res) => {
    const { id_cambio_detalle } = req.params;
    try {
        const detalle = await formularioCambiosDetallesModel.obtenerPorId(id_cambio_detalle);
        if (!detalle) {
            return res.status(404).json({ message: 'Detalle de cambio de formulario no encontrado' });
        }
        return res.json(detalle);
    } catch (error) {
        console.error('Error al obtener detalle de cambio de formulario por ID:', error);
        return res.status(500).json({ message: 'Error al obtener detalle de cambio de formulario' });
    }
};

exports.crearDetalleCambioFormulario = async (req, res) => {
    try {
        const { id_cambio, id_campo, valor_anterior, valor_nuevo } = req.body;

        if (!id_cambio || !id_campo) {
            return res.status(400).json({ message: 'Faltan campos obligatorios: id_cambio o id_campo' });
        }

        const cambio = await formularioCambiosModel.obtenerPorId(id_cambio);
        if (!cambio) {
            return res.status(404).json({ message: 'Cambio de formulario no encontrado' });
        }

        const campo = await campoFormularioModel.obtenerPorId(id_campo);
        if (!campo) {
            return res.status(404).json({ message: 'Campo de formulario no encontrado' });
        }

        const nuevoDetalle = await formularioCambiosDetallesModel.crear({
            id_cambio,
            id_campo,
            valor_anterior,
            valor_nuevo,
        });

        return res.status(201).json(nuevoDetalle);
    } catch (error) {
        console.error('Error al crear detalle de cambio de formulario:', error);
        return res.status(500).json({ message: 'Error al crear detalle de cambio de formulario' });
    }
};

exports.actualizarDetalleCambioFormulario = async (req, res) => {
    const { id_cambio_detalle } = req.params;
    try {
        const { id_cambio, id_campo, valor_anterior, valor_nuevo } = req.body;

        if (!id_cambio || !id_campo) {
            return res.status(400).json({ message: 'Faltan campos obligatorios: id_cambio o id_campo' });
        }

        const detalleExistente = await formularioCambiosDetallesModel.obtenerPorId(id_cambio_detalle);
        if (!detalleExistente) {
            return res.status(404).json({ message: 'Detalle de cambio de formulario no encontrado' });
        }

        const cambio = await formularioCambiosModel.obtenerPorId(id_cambio);
        if (!cambio) {
            return res.status(404).json({ message: 'Cambio de formulario no encontrado' });
        }

        const campo = await campoFormularioModel.obtenerPorId(id_campo);
        if (!campo) {
            return res.status(404).json({ message: 'Campo de formulario no encontrado' });
        }

        const detalleActualizado = await formularioCambiosDetallesModel.actualizar(id_cambio_detalle, {
            id_cambio,
            id_campo,
            valor_anterior,
            valor_nuevo,
        });

        return res.json(detalleActualizado);
    } catch (error) {
        console.error('Error al actualizar detalle de cambio de formulario:', error);
        return res.status(500).json({ message: 'Error al actualizar detalle de cambio de formulario' });
    }
};

exports.eliminarDetalleCambioFormulario = async (req, res) => {
    const { id_cambio_detalle } = req.params;
    try {
        const detalle = await formularioCambiosDetallesModel.obtenerPorId(id_cambio_detalle);
        if (!detalle) {
            return res.status(404).json({ message: 'Detalle de cambio de formulario no encontrado' });
        }

        await formularioCambiosDetallesModel.eliminar(id_cambio_detalle);
        return res.json({ message: 'Detalle de cambio de formulario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar detalle de cambio de formulario:', error);
        return res.status(500).json({ message: 'Error al eliminar detalle de cambio de formulario' });
    }
};

exports.obtenerDetallesPorCambio = async (req, res) => {
    const { id_cambio } = req.params;
    try {
        const cambio = await formularioCambiosModel.obtenerPorId(id_cambio);
        if (!cambio) {
            return res.status(404).json({ message: 'Cambio de formulario no encontrado' });
        }

        const detalles = await formularioCambiosDetallesModel.obtenerPorCambio(id_cambio);
        return res.json(detalles);
    } catch (error) {
        console.error('Error al obtener detalles por cambio de formulario:', error);
        return res.status(500).json({ message: 'Error al obtener detalles por cambio de formulario' });
    }
};
