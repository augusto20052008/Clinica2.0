const db = require('../config/db');

async function obtenerTodos() {
    const query = 'SELECT * FROM formulario_cambios';
    const [rows] = await db.query(query);
    return rows;
}

async function obtenerPorId(idCambio) {
    const query = 'SELECT * FROM formulario_cambios WHERE id_cambio = ?';
    const [rows] = await db.query(query, [idCambio]);
    return rows.length ? rows[0] : null;
}

async function crear(data) {
    const query = `
    INSERT INTO formulario_cambios 
      (id_formulario, id_usuario, motivo)
    VALUES (?, ?, ?)
  `;
    const { id_formulario, id_usuario, motivo } = data;

    const [result] = await db.query(query, [
        id_formulario,
        id_usuario,
        motivo,
    ]);

    return {
        id_cambio: result.insertId,
        fecha_cambio: new Date(),
        ...data,
    };
}

async function actualizar(idCambio, data) {
    const query = `
    UPDATE formulario_cambios
    SET 
      id_formulario = ?, 
      id_usuario = ?, 
      motivo = ?
    WHERE id_cambio = ?
  `;
    const { id_formulario, id_usuario, motivo } = data;

    await db.query(query, [
        id_formulario,
        id_usuario,
        motivo,
        idCambio,
    ]);

    return { id_cambio: idCambio, ...data };
}

async function eliminar(idCambio) {
    const query = 'DELETE FROM formulario_cambios WHERE id_cambio = ?';
    await db.query(query, [idCambio]);
    return true;
}

async function obtenerPorFormulario(idFormulario) {
    const query = 'SELECT * FROM formulario_cambios WHERE id_formulario = ?';
    const [rows] = await db.query(query, [idFormulario]);
    return rows;
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    obtenerPorFormulario,
};
