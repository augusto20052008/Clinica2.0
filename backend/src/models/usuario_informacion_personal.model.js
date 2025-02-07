const db = require('../config/db');

async function obtenerTodos() {
  const query = 'SELECT * FROM usuario_informacion_personal';
  const [rows] = await db.query(query);
  return rows;
}

async function obtenerPorId(id) {
  const query = `
    SELECT * 
    FROM usuario_informacion_personal
    WHERE id_informacion_personal = ?
  `;
  const [rows] = await db.query(query, [id]);
  return rows.length ? rows[0] : null;
}

async function obtenerPorUsuario(idUsuario) {
  const query = `
    SELECT * 
    FROM usuario_informacion_personal
    WHERE id_usuario = ?
  `;
  const [rows] = await db.query(query, [idUsuario]);
  return rows.length ? rows[0] : null;
}

async function crear(data) {
  const query = `
    INSERT INTO usuario_informacion_personal 
      (id_usuario, cedula, nombres, apellidos, fecha_nacimiento, genero, estado_civil)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  
  const {
    id_usuario,
    cedula,
    nombres,
    apellidos,
    fecha_nacimiento,
    genero,
    estado_civil
  } = data;

  const [result] = await db.query(query, [
    id_usuario,
    cedula,
    nombres,
    apellidos,
    fecha_nacimiento || null,
    genero || null,
    estado_civil || null
  ]);

  return {
    id_informacion_personal: result.insertId,
    ...data,
  };
}

async function actualizar(id, data) {
  const query = `
    UPDATE usuario_informacion_personal
    SET 
      cedula = ?,
      nombres = ?,
      apellidos = ?,
      fecha_nacimiento = ?,
      genero = ?,
      estado_civil = ?
    WHERE id_informacion_personal = ?
  `;

  const {
    cedula,
    nombres,
    apellidos,
    fecha_nacimiento,
    genero,
    estado_civil
  } = data;

  await db.query(query, [
    cedula,
    nombres,
    apellidos,
    fecha_nacimiento || null,
    genero || null,
    estado_civil || null,
    id
  ]);

  return { id_informacion_personal: id, ...data };
}

async function eliminar(id) {
  const query = 'DELETE FROM usuario_informacion_personal WHERE id_informacion_personal = ?';
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
