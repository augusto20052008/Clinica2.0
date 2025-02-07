const db = require('../config/db');

async function obtenerTodos() {
  const query = 'SELECT * FROM usuario_informacion_contacto';
  const [rows] = await db.query(query);
  return rows;
}

async function obtenerPorId(id) {
  const query = `
    SELECT *
    FROM usuario_informacion_contacto
    WHERE id_informacion_contacto = ?
  `;
  const [rows] = await db.query(query, [id]);
  return rows.length ? rows[0] : null;
}

async function obtenerPorUsuario(idUsuario) {
  const query = `
    SELECT *
    FROM usuario_informacion_contacto
    WHERE id_usuario = ?
  `;
  const [rows] = await db.query(query, [idUsuario]);
  return rows.length ? rows[0] : null;
}

async function crear(data) {
  const query = `
    INSERT INTO usuario_informacion_contacto
      (id_usuario, provincia, ciudad, calle_principal, calle_secundaria, celular)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const {
    id_usuario,
    provincia,
    ciudad,
    calle_principal,
    calle_secundaria,
    celular
  } = data;

  const [result] = await db.query(query, [
    id_usuario,
    provincia,
    ciudad,
    calle_principal,
    calle_secundaria,
    celular
  ]);

  return {
    id_informacion_contacto: result.insertId,
    ...data,
  };
}

async function actualizar(id, data) {
  const query = `
    UPDATE usuario_informacion_contacto
    SET
      provincia = ?,
      ciudad = ?,
      calle_principal = ?,
      calle_secundaria = ?,
      celular = ?
    WHERE id_informacion_contacto = ?
  `;

  const {
    provincia,
    ciudad,
    calle_principal,
    calle_secundaria,
    celular
  } = data;

  await db.query(query, [
    provincia,
    ciudad,
    calle_principal,
    calle_secundaria,
    celular,
    id
  ]);

  return { id_informacion_contacto: id, ...data };
}

async function eliminar(id) {
  const query = 'DELETE FROM usuario_informacion_contacto WHERE id_informacion_contacto = ?';
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
