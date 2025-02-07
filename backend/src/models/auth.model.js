const pool = require('../config/db');
const bcrypt = require('bcrypt');

const Usuario = {};

// Buscar usuario por correo y obtener su rol
Usuario.findByEmail = async (email) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                u.id_usuario, 
                u.usuario, 
                u.correo, 
                u.contraseña, 
                u.activo, 
                u.estado, 
                r.nombre_rol AS rol
            FROM usuario u
            INNER JOIN rol r ON u.id_rol = r.id_rol
            WHERE u.correo = ?
        `, [email]);
        return rows[0];
    } catch (error) {
        console.error('Error al buscar usuario por correo:', error);
        throw error;
    }
};

// Crear un nuevo usuario
Usuario.create = async (usuarioData) => {
    const { usuario, correo, contraseña, id_rol } = usuarioData;

    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const [result] = await pool.query(`
            INSERT INTO usuario (usuario, correo, contraseña, id_rol)
            VALUES (?, ?, ?, ?)
        `, [usuario, correo, hashedPassword, id_rol]);

        return { id_usuario: result.insertId };
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
};

// Verificar contraseña
Usuario.verifyPassword = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};

module.exports = Usuario;
