const pool = require('../config/db');

async function findAllEstablecimientos() {
  const query = 'SELECT * FROM Establecimiento';
  const [rows] = await pool.query(query);
  return rows;
}

async function findEstablecimientoById(idEstablecimiento) {
  const query = `
    SELECT *
    FROM Establecimiento
    WHERE idEstablecimiento = ?
  `;
  const [rows] = await pool.query(query, [idEstablecimiento]);
  return rows[0] || null;
}

async function createEstablecimiento(data) {
  const {
    nombreEstablecimiento,
    codigoEstablecimiento,
    institucionSistema,
    codigoParroquiaUO,
    codigoCantonUO,
    codigoProvinciaUO,
  } = data;

  const query = `
    INSERT INTO Establecimiento
      (nombreEstablecimiento, codigoEstablecimiento, institucionSistema,
       codigoParroquiaUO, codigoCantonUO, codigoProvinciaUO)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    nombreEstablecimiento || null,
    codigoEstablecimiento || null,
    institucionSistema || null,
    codigoParroquiaUO || null,
    codigoCantonUO || null,
    codigoProvinciaUO || null,
  ];

  const [result] = await pool.query(query, values);
  return result.insertId;
}

async function updateEstablecimiento(idEstablecimiento, data) {
  const {
    nombreEstablecimiento,
    codigoEstablecimiento,
    institucionSistema,
    codigoParroquiaUO,
    codigoCantonUO,
    codigoProvinciaUO,
  } = data;

  const query = `
    UPDATE Establecimiento
    SET
      nombreEstablecimiento = ?,
      codigoEstablecimiento = ?,
      institucionSistema = ?,
      codigoParroquiaUO = ?,
      codigoCantonUO = ?,
      codigoProvinciaUO = ?
    WHERE idEstablecimiento = ?
  `;
  const values = [
    nombreEstablecimiento || null,
    codigoEstablecimiento || null,
    institucionSistema || null,
    codigoParroquiaUO || null,
    codigoCantonUO || null,
    codigoProvinciaUO || null,
    idEstablecimiento,
  ];

  const [result] = await pool.query(query, values);
  return result.affectedRows; // 1 si se actualizó, 0 si no
}

async function deleteEstablecimiento(idEstablecimiento) {
  const query = `
    DELETE FROM Establecimiento
    WHERE idEstablecimiento = ?
  `;
  const [result] = await pool.query(query, [idEstablecimiento]);
  return result.affectedRows; // 1 si se eliminó, 0 si no existía
}

module.exports = {
  findAllEstablecimientos,
  findEstablecimientoById,
  createEstablecimiento,
  updateEstablecimiento,
  deleteEstablecimiento,
};
