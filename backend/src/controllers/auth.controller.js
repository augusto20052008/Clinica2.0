const jwt = require('jsonwebtoken');
require('dotenv').config();
const { findByCorreo } = require('../models/usuario.model');

async function login(req, res) {
  try {
    const { correo, contraseña } = req.body;

    // Validar entradas
    if (!correo || !contraseña) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos: correo y contraseña',
      });
    }

    // Buscar en DB
    const usuario = await findByCorreo(correo);
    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }
    // Comparacion de contraseña
    if (usuario.contraseña !== contraseña) {
      return res.status(401).json({
        success: false,
        message: 'Contraseña incorrecta',
      });
    }

    // Generar Payload
    const payload = {
      identificacion: usuario.identificacion,
      rol: usuario.rol,
    };

    //Generar JWT con su payload
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Respuesta
    return res.json({
      success: true,
      message: 'Login exitoso',
      token,
      data: {
        identificacion: usuario.identificacion,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    });
  }
}

module.exports = {
  login
};
