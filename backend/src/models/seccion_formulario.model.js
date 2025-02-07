const db = require('../config/db');

async function obtenerTodos() {
  const query = 'SELECT * FROM seccion_formulario';
  const [rows] = await db.query(query);
  return rows;
}

async function obtenerPorId(idSeccion) {
  const query = 'SELECT * FROM seccion_formulario WHERE id_formulario_tipo = ?';
  const [rows] = await db.query(query, [idSeccion]);
  return rows;
}

async function crear(data) {
  const query = `
    INSERT INTO seccion_formulario 
      (id_formulario_tipo, nombre_seccion, descripcion)
    VALUES (?, ?, ?)
  `;
  const { id_formulario_tipo, nombre_seccion, descripcion } = data;

  const [result] = await db.query(query, [
    id_formulario_tipo,
    nombre_seccion,
    descripcion,
  ]);

  return {
    id_seccion: result.insertId,
    ...data,
  };
}

async function actualizar(idSeccion, data) {
  const query = `
    UPDATE seccion_formulario
    SET 
      id_formulario_tipo = ?, 
      nombre_seccion = ?, 
      descripcion = ?
    WHERE id_seccion = ?
  `;
  const { id_formulario_tipo, nombre_seccion, descripcion } = data;

  await db.query(query, [
    id_formulario_tipo,
    nombre_seccion,
    descripcion,
    idSeccion,
  ]);

  return { id_seccion: idSeccion, ...data };
}

async function eliminar(idSeccion) {
  const query = 'DELETE FROM seccion_formulario WHERE id_seccion = ?';
  await db.query(query, [idSeccion]);
  return true;
}

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};
