const db = require('../config/db');

async function obtenerTodos() {
    const query = 'SELECT * FROM usuario';
    const [rows] = await db.query(query);
    return rows;
}

async function obtenerPorId(id) {
    const query = 'SELECT * FROM usuario WHERE id_usuario = ?';
    const [rows] = await db.query(query, [id]);
    if (rows.length) {
        return rows[0];
    }
    return null;
}

async function crear(data) {
    const query = `
    INSERT INTO usuario (usuario, correo, contraseña, id_rol)
    VALUES (?, ?, ?, ?)
  `;
    const { usuario, correo, contraseña, id_rol, estado } = data;

    const [result] = await db.query(query, [
        usuario,
        correo,
        contraseña,
        id_rol,
        estado
    ]);

    return {
        id_usuario: result.insertId,
        ...data,
    };
}

async function actualizar(id, data) {
    const query = `
    UPDATE usuario
    SET usuario = ?,
        correo = ?,
        contraseña = ?,
        id_rol = ?,
        estado = ?
    WHERE id_usuario = ?
  `;

    const {
        usuario,
        correo,
        contraseña,
        id_rol,
        estado
    } = data;

    await db.query(query, [
        usuario,
        correo,
        contraseña,
        id_rol,
        estado,
        id
    ]);

    return { id_usuario: id, ...data };
}

async function eliminar(id) {
    const query = 'DELETE FROM usuario WHERE id_usuario = ?';
    await db.query(query, [id]);
    return true;
}

async function darBaja(id) {
    const query = `UPDATE usuario SET estado = 'inactivo' WHERE id_usuario = ?`;
    await db.query(query, [id]);
    return true
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    darBaja
};
