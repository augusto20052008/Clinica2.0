const pool = require('../config/db');

async function findAllTitulos() {
    let query = 'SELECT * FROM Titulo';
    const values = [];
    const [rows] = await pool.query(query, values);
    return rows;
}

async function findTituloById(idTitulo, usuarioIdentificacion) {
    const query = `
    SELECT * 
    FROM Titulo
    WHERE idTitulo = ? AND Usuario_identificacion = ?
  `;
    const [rows] = await pool.query(query, [idTitulo, usuarioIdentificacion]);
    return rows[0] || null;
}

async function createTitulo(tituloData) {
    const {
        nombreTitulo,
        institucionEducacionSuperior,
        tipoTitulo,
        reconocidoPor,
        numeroRegistro,
        fechaRegistro,
        areaConocimiento,
        Usuario_identificacion,
    } = tituloData;

    const query = `
    INSERT INTO Titulo
      (nombreTitulo, institucionEducacionSuperior, tipoTitulo, reconocidoPor, 
       numeroRegistro, fechaRegistro, areaConocimiento, Usuario_identificacion)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [
        nombreTitulo || null,
        institucionEducacionSuperior || null,
        tipoTitulo || null,
        reconocidoPor || null,
        numeroRegistro || null,
        fechaRegistro || null,
        areaConocimiento || null,
        Usuario_identificacion,
    ];

    const [result] = await pool.query(query, values);
    return {
        idTitulo: result.insertId,
        Usuario_identificacion,
    };
}

async function updateTitulo(idTitulo, usuarioIdentificacion, tituloData) {
    const {
        nombreTitulo,
        institucionEducacionSuperior,
        tipoTitulo,
        reconocidoPor,
        numeroRegistro,
        fechaRegistro,
        areaConocimiento,
    } = tituloData;

    const query = `
    UPDATE Titulo
    SET
      nombreTitulo = ?,
      institucionEducacionSuperior = ?,
      tipoTitulo = ?,
      reconocidoPor = ?,
      numeroRegistro = ?,
      fechaRegistro = ?,
      areaConocimiento = ?
    WHERE idTitulo = ? AND Usuario_identificacion = ?
  `;
    const values = [
        nombreTitulo || null,
        institucionEducacionSuperior || null,
        tipoTitulo || null,
        reconocidoPor || null,
        numeroRegistro || null,
        fechaRegistro || null,
        areaConocimiento || null,
        idTitulo,
        usuarioIdentificacion,
    ];

    const [result] = await pool.query(query, values);
    return result.affectedRows; // 1 si se actualizó, 0 si no existía
}

async function deleteTitulo(idTitulo, usuarioIdentificacion) {
    const query = `
    DELETE FROM Titulo
    WHERE idTitulo = ? AND Usuario_identificacion = ?
  `;
    const [result] = await pool.query(query, [idTitulo, usuarioIdentificacion]);
    return result.affectedRows; // 1 si se eliminó, 0 si no existía
}

module.exports = {
    findAllTitulos,
    findTituloById,
    createTitulo,
    updateTitulo,
    deleteTitulo,
};
