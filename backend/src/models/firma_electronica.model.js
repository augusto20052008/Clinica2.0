const db = require('../config/db');

async function obtenerTodos() {
    const query = 'SELECT * FROM firma_electronica';
    const [rows] = await db.query(query);
    return rows;
}

async function obtenerPorId(id) {
    const query = 'SELECT * FROM firma_electronica WHERE id_firma_electronica = ?';
    const [rows] = await db.query(query, [id]);
    return rows.length ? rows[0] : null;
}

async function obtenerPorUsuario(idUsuario) {
    const query = 'SELECT * FROM firma_electronica WHERE id_usuario = ?';
    const [rows] = await db.query(query, [idUsuario]);
    return rows.length ? rows[0] : null;
}

async function crear(data) {
    const query = `
    INSERT INTO firma_electronica (id_usuario, firma_base64)
    VALUES (?, ?)
  `;
    const { id_usuario, firma_base64 } = data;

    const [result] = await db.query(query, [id_usuario, firma_base64 || null]);

    return {
        id_firma_electronica: result.insertId,
        ...data
    };
}

async function actualizar(id, data) {
    const query = `
    UPDATE firma_electronica
    SET firma_base64 = ?
    WHERE id_firma_electronica = ?
  `;
    const { firma_base64 } = data;

    await db.query(query, [firma_base64 || null, id]);

    return { id_firma_electronica: id, ...data };
}

async function eliminar(id) {
    const query = 'DELETE FROM firma_electronica WHERE id_firma_electronica = ?';
    await db.query(query, [id]);
    return true;
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    obtenerPorUsuario,
    crear,
    actualizar,
    eliminar
};
