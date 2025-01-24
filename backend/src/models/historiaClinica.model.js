const pool = require('../config/db');

async function findAllHistorias(pacienteIdentificacion = null) {
    let query = 'SELECT * FROM HistoriaClinica';
    const values = [];

    if (pacienteIdentificacion) {
        query += ' WHERE Paciente_identificacion = ?';
        values.push(pacienteIdentificacion);
    }

    const [rows] = await pool.query(query, values);
    return rows;
}

async function findHistoriaById(pacienteIdentificacion) {
    const query = `
    SELECT *
    FROM HistoriaClinica
    WHERE Paciente_identificacion = ?
  `;
    const [rows] = await pool.query(query, [pacienteIdentificacion]);
    return rows || null;
}

async function findIdHistoria() {
    const query = `
    SELECT *
    FROM historiaclinica
    ORDER BY idHistoriaClinica DESC
    LIMIT 1
    `
    const [rows] = await pool.query(query);
    return rows || null;
}

async function createHistoria(historiaData) {
    const { nroHistoriaClinica, Paciente_identificacion } = historiaData;

    const query = `
    INSERT INTO HistoriaClinica
      (nroHistoriaClinica, Paciente_identificacion)
    VALUES (?, ?)
  `;

    const [result] = await pool.query(query, [nroHistoriaClinica || null, Paciente_identificacion]);

    return {
        idHistoriaClinica: result.insertId,
        Paciente_identificacion,
    };
}

async function updateHistoria(idHistoriaClinica, pacienteIdentificacion, historiaData) {
    const { nroHistoriaClinica } = historiaData;

    const query = `
    UPDATE HistoriaClinica
    SET nroHistoriaClinica = ?
    WHERE idHistoriaClinica = ? AND Paciente_identificacion = ?
  `;

    const [result] = await pool.query(query, [nroHistoriaClinica || null, idHistoriaClinica, pacienteIdentificacion]);
    return result.affectedRows; // 1 si se actualizó, 0 si no existía
}

async function deleteHistoria(idHistoriaClinica, pacienteIdentificacion) {
    const query = `
    DELETE FROM HistoriaClinica
    WHERE idHistoriaClinica = ? AND Paciente_identificacion = ?
  `;
    const [result] = await pool.query(query, [idHistoriaClinica, pacienteIdentificacion]);
    return result.affectedRows; // 1 si se eliminó, 0 si no existía
}

module.exports = {
    findAllHistorias,
    findHistoriaById,
    findIdHistoria,
    createHistoria,
    updateHistoria,
    deleteHistoria,
};
