const Usuario = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


exports.iniciarSesion = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        if (!correo || !contraseña) {
            return res.status(400).json({ mensaje: 'Por favor, ingresa tu email y contraseña.' });
        }

        // Buscar usuario por correo
        const usuario = await Usuario.findByEmail(correo);

        if (!usuario) {
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.' });
        }

        // Verificar contraseña
        const esValido = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!esValido) {
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.' });
        }

        // Obtener rol del usuario
        const rol = usuario.rol;

        if (!rol) {
            return res.status(400).json({ mensaje: 'No se encontró un rol asignado para el usuario.' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: usuario.id_usuario, rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );

        res.status(200).json({ mensaje: 'Inicio de sesión exitoso.', token });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};





