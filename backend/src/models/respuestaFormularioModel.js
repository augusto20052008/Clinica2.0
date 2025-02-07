const db = require('../config/db');

const getAllRespuestas = async () => {
    const [rows] = await db.query(`
    SELECT rf.*, f.estado, cf.nombre_campo
    FROM respuesta_formulario rf
    JOIN formulario f ON rf.id_formulario = f.id_formulario
    JOIN campo_formulario cf ON rf.id_campo = cf.id_campo
  `);
    return rows;
};

const getRespuestaById = async (id) => {
    const [rows] = await db.query(`
    SELECT rf.*, f.estado, cf.nombre_campo
    FROM respuesta_formulario rf
    JOIN formulario f ON rf.id_formulario = f.id_formulario
    JOIN campo_formulario cf ON rf.id_campo = cf.id_campo
    WHERE rf.id_respuesta = ?
  `, [id]);

    if (rows.length === 0) {
        return null;
    }
    return rows[0];
};

const createRespuesta = async (respuesta) => {
  const { id_formulario, id_campo, valor } = respuesta;

  const [existing] = await db.query(
      `SELECT * FROM respuesta_formulario WHERE id_formulario = ? AND id_campo = ?`,
      [id_formulario, id_campo]
  );

  if (existing.length > 0) {
      await db.query(
          `UPDATE respuesta_formulario SET valor = ? WHERE id_formulario = ? AND id_campo = ?`,
          [valor, id_formulario, id_campo]
      );
      return { id_formulario, id_campo, valor, updated: true };
  }

  // Si no existe, insertar una nueva respuesta
  const [result] = await db.query(
      `INSERT INTO respuesta_formulario (id_formulario, id_campo, valor) VALUES (?, ?, ?)`,
      [id_formulario, id_campo, valor]
  );

  return getRespuestaById(result.insertId);
};


const updateRespuesta = async (id, valor) => {
    const [result] = await db.query(`
    UPDATE respuesta_formulario
    SET valor = ?
    WHERE id_respuesta = ?
  `, [valor, id]);

    if (result.affectedRows === 0) {
        return null;
    }

    return getRespuestaById(id);
};

const deleteRespuesta = async (id) => {
    const [result] = await db.query(`
    DELETE FROM respuesta_formulario
    WHERE id_respuesta = ?
  `, [id]);

    return result.affectedRows > 0;
};

module.exports = {
    getAllRespuestas,
    getRespuestaById,
    createRespuesta,
    updateRespuesta,
    deleteRespuesta
};
