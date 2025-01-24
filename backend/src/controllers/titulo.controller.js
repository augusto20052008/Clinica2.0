const { findAllTitulos, findTituloById, createTitulo, updateTitulo, deleteTitulo, } = require('../models/titulo.model');

async function getTitulos(req, res) {
    try {
        const titulos = await findAllTitulos();
        res.json({
            success: true,
            data: titulos,
        });
    } catch (error) {
        console.error('Error en getTitulos:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}

async function getTitulo(req, res) {
    try {
        const { idTitulo, usuarioIdentificacion } = req.params;
        const titulo = await findTituloById(idTitulo, usuarioIdentificacion);
        if (!titulo) {
            return res.status(404).json({ success: false, message: 'Título no encontrado' });
        }
        res.json({ success: true, data: titulo });
    } catch (error) {
        console.error('Error en getTitulo:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}

async function postTitulo(req, res) {
    try {
        const newTitulo = req.body;
        const { idTitulo, Usuario_identificacion } = await createTitulo(newTitulo);
        res.status(201).json({
            success: true,
            message: 'Título creado exitosamente',
            data: { idTitulo, Usuario_identificacion },
        });
    } catch (error) {
        console.error('Error en postTitulo:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}

async function putTitulo(req, res) {
    try {
        const { idTitulo, usuarioIdentificacion } = req.params;
        const updatedData = req.body;
        const rowsAffected = await updateTitulo(idTitulo, usuarioIdentificacion, updatedData);
        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se pudo actualizar. El título no fue encontrado.',
            });
        }
        res.json({ success: true, message: 'Título actualizado exitosamente' });
    } catch (error) {
        console.error('Error en putTitulo:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}

async function deleteTituloById(req, res) {
    try {
        const { idTitulo, usuarioIdentificacion } = req.params;
        const rowsAffected = await deleteTitulo(idTitulo, usuarioIdentificacion);
        if (rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se pudo eliminar. El título no fue encontrado.',
            });
        }
        res.json({ success: true, message: 'Título eliminado exitosamente' });
    } catch (error) {
        console.error('Error en deleteTituloById:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
}

module.exports = {
    getTitulos,
    getTitulo,
    postTitulo,
    putTitulo,
    deleteTituloById,
};
