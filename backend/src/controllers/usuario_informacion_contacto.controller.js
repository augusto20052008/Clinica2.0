const uicModel = require('../models/usuario_informacion_contacto.model');

exports.obtenerContactos = async (req, res) => {
    try {
        const datos = await uicModel.obtenerTodos();
        return res.json(datos);
    } catch (error) {
        console.error('Error al obtener información de contacto:', error);
        return res.status(500).json({ message: 'Error al obtener información de contacto' });
    }
};

exports.obtenerContactoPorId = async (req, res) => {
    const { id_informacion_contacto } = req.params;
    try {
        const dato = await uicModel.obtenerPorId(id_informacion_contacto);
        if (!dato) {
            return res.status(404).json({ message: 'No se encontró el registro de contacto' });
        }
        return res.json(dato);
    } catch (error) {
        console.error('Error al obtener contacto por ID:', error);
        return res.status(500).json({ message: 'Error al obtener contacto por ID' });
    }
};

exports.obtenerContactoPorUsuario = async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const dato = await uicModel.obtenerPorUsuario(id_usuario);
        if (!dato) {
            return res.status(404).json({ message: 'No se encontró información de contacto para este usuario' });
        }
        return res.json(dato);
    } catch (error) {
        console.error('Error al obtener contacto por usuario:', error);
        return res.status(500).json({ message: 'Error al obtener contacto por usuario' });
    }
};

exports.crearContacto = async (req, res) => {
    try {
        const {
            id_usuario,
            provincia,
            ciudad,
            calle_principal,
            calle_secundaria,
            celular
        } = req.body;

        if (
            !id_usuario ||
            !provincia ||
            !ciudad ||
            !calle_principal ||
            !calle_secundaria ||
            !celular
        ) {
            return res.status(400).json({
                message: 'Faltan campos requeridos (id_usuario, provincia, ciudad, calle_principal, calle_secundaria, celular)'
            });
        }

        const nuevoRegistro = await uicModel.crear({
            id_usuario,
            provincia,
            ciudad,
            calle_principal,
            calle_secundaria,
            celular
        });

        return res.status(201).json(nuevoRegistro);
    } catch (error) {
        console.error('Error al crear información de contacto:', error);
        return res.status(500).json({ message: 'Error al crear información de contacto' });
    }
};

exports.actualizarContacto = async (req, res) => {
    const { id_informacion_contacto } = req.params;
    try {
        const {
            provincia,
            ciudad,
            calle_principal,
            calle_secundaria,
            celular
        } = req.body;

        if (
            !provincia ||
            !ciudad ||
            !calle_principal ||
            !calle_secundaria ||
            !celular
        ) {
            return res.status(400).json({
                message: 'Faltan campos requeridos (provincia, ciudad, calle_principal, calle_secundaria, celular)'
            });
        }

        const registroActualizado = await uicModel.actualizar(id_informacion_contacto, {
            provincia,
            ciudad,
            calle_principal,
            calle_secundaria,
            celular
        });

        return res.json(registroActualizado);
    } catch (error) {
        console.error('Error al actualizar información de contacto:', error);
        return res.status(500).json({ message: 'Error al actualizar información de contacto' });
    }
};

exports.eliminarContacto = async (req, res) => {
    const { id_informacion_contacto } = req.params;
    try {
        await uicModel.eliminar(id_informacion_contacto);
        return res.json({ message: 'Información de contacto eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar información de contacto:', error);
        return res.status(500).json({ message: 'Error al eliminar información de contacto' });
    }
};
