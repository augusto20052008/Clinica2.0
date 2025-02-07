const db = require('../config/db');

async function obtenerTodos() {
    const query = 'SELECT * FROM formulario_cambios_detalles';
    const [rows] = await db.query(query);
    return rows;
}

async function obtenerPorId(idCambioDetalle) {
    const query = 'SELECT * FROM formulario_cambios_detalles WHERE id_cambio_detalle = ?';
    const [rows] = await db.query(query, [idCambioDetalle]);
    return rows.length ? rows[0] : null;
}

async function crear(data) {
    const query = `
    INSERT INTO formulario_cambios_detalles 
      (id_cambio, id_campo, valor_anterior, valor_nuevo)
    VALUES (?, ?, ?, ?)
  `;
    const { id_cambio, id_campo, valor_anterior, valor_nuevo } = data;

    const [result] = await db.query(query, [
        id_cambio,
        id_campo,
        valor_anterior,
        valor_nuevo,
    ]);

    return {
        id_cambio_detalle: result.insertId,
        ...data,
    };
}

async function actualizar(idCambioDetalle, data) {
    const query = `
    UPDATE formulario_cambios_detalles
    SET 
      id_cambio = ?, 
      id_campo = ?, 
      valor_anterior = ?, 
      valor_nuevo = ?
    WHERE id_cambio_detalle = ?
  `;
    const { id_cambio, id_campo, valor_anterior, valor_nuevo } = data;

    await db.query(query, [
        id_cambio,
        id_campo,
        valor_anterior,
        valor_nuevo,
        idCambioDetalle,
    ]);

    return { id_cambio_detalle: idCambioDetalle, ...data };
}

async function eliminar(idCambioDetalle) {
    const query = 'DELETE FROM formulario_cambios_detalles WHERE id_cambio_detalle = ?';
    await db.query(query, [idCambioDetalle]);
    return true;
}

async function obtenerPorCambio(idCambio) {
    const query = 'SELECT * FROM formulario_cambios_detalles WHERE id_cambio = ?';
    const [rows] = await db.query(query, [idCambio]);
    return rows;
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    obtenerPorCambio,
};
