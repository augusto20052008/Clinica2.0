const firmaModel = require('../models/firma_electronica.model');

exports.obtenerFirmas = async (req, res) => {
    try {
        const firmas = await firmaModel.obtenerTodos();
        return res.json(firmas);
    } catch (error) {
        console.error('Error al obtener firmas electrónicas:', error);
        return res.status(500).json({ message: 'Error al obtener firmas electrónicas' });
    }
};

exports.obtenerFirmaPorId = async (req, res) => {
    const { id_firma_electronica } = req.params;
    try {
        const firma = await firmaModel.obtenerPorId(id_firma_electronica);
        if (!firma) {
            return res.status(404).json({ message: 'No se encontró la firma electrónica' });
        }
        return res.json(firma);
    } catch (error) {
        console.error('Error al obtener firma electrónica por ID:', error);
        return res.status(500).json({ message: 'Error al obtener firma electrónica por ID' });
    }
};

exports.obtenerFirmaPorUsuario = async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const firma = await firmaModel.obtenerPorUsuario(id_usuario);
        if (!firma) {
            return res.status(404).json({ message: 'No se encontró firma electrónica para este usuario' });
        }
        return res.json(firma);
    } catch (error) {
        console.error('Error al obtener firma electrónica por usuario:', error);
        return res.status(500).json({ message: 'Error al obtener firma electrónica por usuario' });
    }
};

exports.crearFirma = async (req, res) => {
    try {
        const { id_usuario, firma_base64 } = req.body;

        if (!id_usuario) {
            return res.status(400).json({ message: 'Falta el campo id_usuario' });
        }

        const firmaExistente = await firmaModel.obtenerPorUsuario(id_usuario);
        if (firmaExistente) {
            return res.status(409).json({ message: 'Este usuario ya tiene una firma registrada' });
        }

        const nuevaFirma = await firmaModel.crear({
            id_usuario,
            firma_base64
        });

        return res.status(201).json(nuevaFirma);
    } catch (error) {
        console.error('Error al crear firma electrónica:', error);
        return res.status(500).json({ message: 'Error al crear firma electrónica' });
    }
};

exports.actualizarFirma = async (req, res) => {
    const { id_firma_electronica } = req.params;
    try {
        const { firma_base64 } = req.body;

        if (!firma_base64) {
            return res.status(400).json({ message: 'Falta el campo firma_base64' });
        }

        const firmaActualizada = await firmaModel.actualizar(id_firma_electronica, { firma_base64 });
        return res.json(firmaActualizada);
    } catch (error) {
        console.error('Error al actualizar firma electrónica:', error);
        return res.status(500).json({ message: 'Error al actualizar firma electrónica' });
    }
};

exports.eliminarFirma = async (req, res) => {
    const { id_firma_electronica } = req.params;
    try {
        await firmaModel.eliminar(id_firma_electronica);
        return res.json({ message: 'Firma electrónica eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar firma electrónica:', error);
        return res.status(500).json({ message: 'Error al eliminar firma electrónica' });
    }
};
