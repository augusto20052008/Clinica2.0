const pool = require('../config/db');

async function findAllJornadas() {
    const query = 'SELECT * FROM Jornada';
    const [rows] = await pool.query(query);
    return rows;
}

async function findJornadaById(idJornada, usuarioIdentificacion) {
    const query = `
    SELECT *
    FROM Jornada
    WHERE idJornada = ? AND Usuario_identificacion = ?
  `;
    const [rows] = await pool.query(query, [idJornada, usuarioIdentificacion]);
    return rows[0] || null;
}

async function createJornada(jornadaData) {
    const {
        supervisor,
        fechaContratacion,
        fechaFinContratacion,
        inicioJornada,
        finJornada,
        Usuario_identificacion,
    } = jornadaData;

    const query = `
    INSERT INTO Jornada
      (supervisor, fechaContratacion, fechaFinContratacion, 
       inicioJornada, finJornada, Usuario_identificacion)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

    const values = [
        supervisor || null,
        fechaContratacion || null,
        fechaFinContratacion || null,
        inicioJornada || null,
        finJornada || null,
        Usuario_identificacion,
    ];

    const [result] = await pool.query(query, values);
    return {
        idJornada: result.insertId,
        Usuario_identificacion,
    };
}

async function updateJornada(idJornada, usuarioIdentificacion, jornadaData) {
    const {
        supervisor,
        fechaContratacion,
        fechaFinContratacion,
        inicioJornada,
        finJornada,
    } = jornadaData;

    const query = `
    UPDATE Jornada
    SET 
      supervisor = ?,
      fechaContratacion = ?,
      fechaFinContratacion = ?,
      inicioJornada = ?,
      finJornada = ?
    WHERE idJornada = ? AND Usuario_identificacion = ?
  `;

    const values = [
        supervisor || null,
        fechaContratacion || null,
        fechaFinContratacion || null,
        inicioJornada || null,
        finJornada || null,
        idJornada,
        usuarioIdentificacion,
    ];

    const [result] = await pool.query(query, values);
    return result.affectedRows; // 1 si se actualizó, 0 si no existía
}

async function deleteJornada(idJornada, usuarioIdentificacion) {
    const query = `
    DELETE FROM Jornada
    WHERE idJornada = ? AND Usuario_identificacion = ?
  `;
    const [result] = await pool.query(query, [idJornada, usuarioIdentificacion]);
    return result.affectedRows; // 1 si se eliminó, 0 si no existía
}

module.exports = {
    findAllJornadas,
    findJornadaById,
    createJornada,
    updateJornada,
    deleteJornada,
};
