const db = require('../config/db');

async function obtenerTodos() {
    const query = 'SELECT * FROM formulario_tipo';
    const [rows] = await db.query(query);
    return rows;
}

async function obtenerPorId(id) {
    const query = `
    SELECT *
    FROM formulario_tipo
    WHERE id_formulario_tipo = ?
  `;
    const [rows] = await db.query(query, [id]);
    return rows.length ? rows[0] : null;
}

async function crear(data) {
    const query = `
    INSERT INTO formulario_tipo (nombre, descripcion)
    VALUES (?, ?)
  `;
    const { nombre, descripcion } = data;

    const [result] = await db.query(query, [nombre, descripcion || null]);

    return {
        id_formulario_tipo: result.insertId,
        ...data
    };
}

async function actualizar(id, data) {
    const query = `
    UPDATE formulario_tipo
    SET nombre = ?,
        descripcion = ?
    WHERE id_formulario_tipo = ?
  `;
    const { nombre, descripcion } = data;

    await db.query(query, [nombre, descripcion || null, id]);

    return { id_formulario_tipo: id, ...data };
}

async function eliminar(id) {
    const query = `
    DELETE FROM formulario_tipo
    WHERE id_formulario_tipo = ?
  `;
    await db.query(query, [id]);
    return true;
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
};
