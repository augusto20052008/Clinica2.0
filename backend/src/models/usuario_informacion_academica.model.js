const db = require('../config/db');

async function obtenerTodos() {
  const query = 'SELECT * FROM usuario_informacion_academica';
  const [rows] = await db.query(query);
  return rows;
}

async function obtenerPorId(id) {
  const query = `
    SELECT * 
    FROM usuario_informacion_academica
    WHERE id_informacion_academica = ?
  `;
  const [rows] = await db.query(query, [id]);
  return rows.length ? rows[0] : null;
}

async function obtenerPorUsuario(idUsuario) {
  const query = `
    SELECT * 
    FROM usuario_informacion_academica
    WHERE id_usuario = ?
  `;
  const [rows] = await db.query(query, [idUsuario]);
  return rows.length ? rows[0] : null;
}

async function crear(data) {
  const query = `
    INSERT INTO usuario_informacion_academica 
      (id_usuario, institucion, titulo, anio_graduacion, especialidad, registro_senescyt)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const [result] = await db.query(query, [
    data.id_usuario,
    data.institucion || "N/A",
    data.titulo || "N/A",
    data.anio_graduacion || null,
    data.especialidad || "N/A",
    data.registro_senescyt || "N/A",
  ]);

  return { id_informacion_academica: result.insertId, ...data };
}

async function actualizar(id, data) {
  const query = `
    UPDATE usuario_informacion_academica
    SET
      institucion = ?,
      titulo = ?,
      anio_graduacion = ?,
      especialidad = ?,
      registro_senescyt = ?
    WHERE id_informacion_academica = ?
  `;

  const {
    institucion,
    titulo,
    anio_graduacion,
    especialidad,
    registro_senescyt,
  } = data;

  await db.query(query, [
    institucion,
    titulo,
    anio_graduacion,
    especialidad || null,
    registro_senescyt,
    id,
  ]);

  return { id_informacion_academica: id, ...data };
}

async function eliminar(id) {
  const query = `
    DELETE FROM usuario_informacion_academica
    WHERE id_informacion_academica = ?
  `;
  await db.query(query, [id]);
  return true;
}

module.exports = {
  obtenerTodos,
  obtenerPorId,
  obtenerPorUsuario,
  crear,
  actualizar,
  eliminar,
};
