const pool = require('../config/db');

async function findAllReferidos(pacienteIdentificacion = null) {
  let query = 'SELECT * FROM Referido';
  const values = [];

  if (pacienteIdentificacion) {
    query += ' WHERE Paciente_identificacion = ?';
    values.push(pacienteIdentificacion);
  }

  const [rows] = await pool.query(query, values);
  return rows;
}

async function findReferidoById(idReferido, pacienteIdentificacion) {
  const query = `
    SELECT *
    FROM Referido
    WHERE idReferido = ? AND Paciente_identificacion = ?
  `;
  const [rows] = await pool.query(query, [idReferido, pacienteIdentificacion]);
  return rows[0] || null;
}

async function createReferido(referidoData) {
  const {
    nombreReferido,
    parentescoReferido,
    direccionReferido,
    telefonoReferido,
    Paciente_identificacion,
  } = referidoData;

  const query = `
    INSERT INTO Referido
      (nombreReferido, parentescoReferido, direccionReferido, telefonoReferido, Paciente_identificacion)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    nombreReferido || null,
    parentescoReferido || null,
    direccionReferido || null,
    telefonoReferido || null,
    Paciente_identificacion,
  ];

  const [result] = await pool.query(query, values);

  return {
    idReferido: result.insertId,
    Paciente_identificacion,
  };
}

async function updateReferido(idReferido, pacienteIdentificacion, referidoData) {
  const {
    nombreReferido,
    parentescoReferido,
    direccionReferido,
    telefonoReferido,
  } = referidoData;

  const query = `
    UPDATE Referido
    SET
      nombreReferido = ?,
      parentescoReferido = ?,
      direccionReferido = ?,
      telefonoReferido = ?
    WHERE idReferido = ? AND Paciente_identificacion = ?
  `;

  const values = [
    nombreReferido || null,
    parentescoReferido || null,
    direccionReferido || null,
    telefonoReferido || null,
    idReferido,
    pacienteIdentificacion,
  ];

  const [result] = await pool.query(query, values);
  return result.affectedRows; // 1 si se actualizó, 0 si no existía
}

async function deleteReferido(idReferido, pacienteIdentificacion) {
  const query = `
    DELETE FROM Referido
    WHERE idReferido = ? AND Paciente_identificacion = ?
  `;
  const [result] = await pool.query(query, [idReferido, pacienteIdentificacion]);
  return result.affectedRows; // 1 si se eliminó, 0 si no existía
}

module.exports = {
  findAllReferidos,
  findReferidoById,
  createReferido,
  updateReferido,
  deleteReferido,
};
