const uipModel = require('../models/usuario_informacion_personal.model');

exports.obtenerInformacionPersonal = async (req, res) => {
    try {
        const datos = await uipModel.obtenerTodos();
        return res.json(datos);
    } catch (error) {
        console.error('Error al obtener información personal:', error);
        return res.status(500).json({ message: 'Error al obtener información personal' });
    }
};

exports.obtenerInformacionPersonalPorId = async (req, res) => {
    const { id_informacion_personal } = req.params;
    try {
        const dato = await uipModel.obtenerPorId(id_informacion_personal);
        if (!dato) {
            return res.status(404).json({ message: 'No se encontró la información personal' });
        }
        return res.json(dato);
    } catch (error) {
        console.error('Error al obtener información personal:', error);
        return res.status(500).json({ message: 'Error al obtener información personal' });
    }
};

exports.obtenerInformacionPersonalPorUsuario = async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const dato = await uipModel.obtenerPorUsuario(id_usuario);
        if (!dato) {
            return res.status(404).json({ message: 'No se encontró la información para este usuario' });
        }
        return res.json(dato);
    } catch (error) {
        console.error('Error al obtener información personal por usuario:', error);
        return res.status(500).json({ message: 'Error al obtener información personal por usuario' });
    }
};

exports.crearInformacionPersonal = async (req, res) => {
    try {
        const {
            id_usuario,
            cedula,
            nombres,
            apellidos,
            fecha_nacimiento,
            genero,
            estado_civil
        } = req.body;

        if (!id_usuario || !cedula || !nombres || !apellidos) {
            return res.status(400).json({ message: 'Faltan campos obligatorios (id_usuario, cedula, nombres, apellidos)' });
        }

        const nuevoRegistro = await uipModel.crear({
            id_usuario,
            cedula,
            nombres,
            apellidos,
            fecha_nacimiento,
            genero,
            estado_civil
        });

        return res.status(201).json(nuevoRegistro);
    } catch (error) {
        console.error('Error al crear información personal:', error);
        return res.status(500).json({ message: 'Error al crear información personal' });
    }
};

exports.actualizarInformacionPersonal = async (req, res) => {
    const { id_informacion_personal } = req.params;
    try {
        const {
            cedula,
            nombres,
            apellidos,
            fecha_nacimiento,
            genero,
            estado_civil
        } = req.body;

        if (!cedula || !nombres || !apellidos) {
            return res.status(400).json({ message: 'Faltan campos obligatorios (cedula, nombres, apellidos)' });
        }

        const registroActualizado = await uipModel.actualizar(id_informacion_personal, {
            cedula,
            nombres,
            apellidos,
            fecha_nacimiento,
            genero,
            estado_civil
        });

        return res.json(registroActualizado);
    } catch (error) {
        console.error('Error al actualizar información personal:', error);
        return res.status(500).json({ message: 'Error al actualizar información personal' });
    }
};

exports.eliminarInformacionPersonal = async (req, res) => {
    const { id_informacion_personal } = req.params;
    try {
        await uipModel.eliminar(id_informacion_personal);
        return res.json({ message: 'Información personal eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar información personal:', error);
        return res.status(500).json({ message: 'Error al eliminar información personal' });
    }
};
