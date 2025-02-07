const db = require('../config/db');

async function obtenerTodos() {
    const query = 'SELECT * FROM rol';
    const [rows] = await db.query(query);
    return rows;
}

async function obtenerPorId(id) {
    const query = 'SELECT * FROM rol WHERE id_rol = ?';
    const [rows] = await db.query(query, [id]);
    return rows.length ? rows[0] : null;
}

async function crear(data) {
    const query = 'INSERT INTO rol (nombre_rol) VALUES (?)';
    const { nombre_rol } = data;

    const [result] = await db.query(query, [nombre_rol]);

    return {
        id_rol: result.insertId,
        ...data,
    };
}

async function actualizar(id, data) {
    const query = 'UPDATE rol SET nombre_rol = ? WHERE id_rol = ?';
    const { nombre_rol } = data;

    await db.query(query, [nombre_rol, id]);

    return { id_rol: id, ...data };
}

async function eliminar(id) {
    const query = 'DELETE FROM rol WHERE id_rol = ?';
    await db.query(query, [id]);
    return true;
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};
