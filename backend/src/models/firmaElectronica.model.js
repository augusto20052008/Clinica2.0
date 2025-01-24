const pool = require('../config/db');

async function findAllFirmas() {
    const query = 'SELECT * FROM FirmaElectronica';
    const [rows] = await pool.query(query);
    return rows;
}

async function findFirmaById(idFirmaElectronica, usuarioIdentificacion) {
    const query = `
    SELECT *
    FROM FirmaElectronica
    WHERE idFirmaElectronica = ? AND Usuario_identificacion = ?
  `;
    const [rows] = await pool.query(query, [idFirmaElectronica, usuarioIdentificacion]);
    return rows[0] || null;
}

async function createFirma(firmaData) {
    const {
        nombreCertificado,
        serialNumber,
        validoDesde,
        validoHasta,
        clavePublica,
        archivoCertificado,
        Usuario_identificacion,
    } = firmaData;

    const query = `
    INSERT INTO FirmaElectronica
      (nombreCertificado, serialNumber, validoDesde, validoHasta,
       clavePublica, archivoCertificado, Usuario_identificacion)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [
        nombreCertificado || null,
        serialNumber || null,
        validoDesde || null,
        validoHasta || null,
        clavePublica || null,
        archivoCertificado || null,
        Usuario_identificacion,
    ];

    const [result] = await pool.query(query, values);
    return {
        idFirmaElectronica: result.insertId,
        Usuario_identificacion,
    };
}

async function updateFirma(idFirmaElectronica, usuarioIdentificacion, firmaData) {
    const {
        nombreCertificado,
        serialNumber,
        validoDesde,
        validoHasta,
        clavePublica,
        archivoCertificado,
    } = firmaData;

    const query = `
    UPDATE FirmaElectronica
    SET
      nombreCertificado = ?,
      serialNumber = ?,
      validoDesde = ?,
      validoHasta = ?,
      clavePublica = ?,
      archivoCertificado = ?
    WHERE idFirmaElectronica = ? AND Usuario_identificacion = ?
  `;

    const values = [
        nombreCertificado || null,
        serialNumber || null,
        validoDesde || null,
        validoHasta || null,
        clavePublica || null,
        archivoCertificado || null,
        idFirmaElectronica,
        usuarioIdentificacion,
    ];

    const [result] = await pool.query(query, values);
    return result.affectedRows; // 1 si se actualizó, 0 si no existía
}

async function deleteFirma(idFirmaElectronica, usuarioIdentificacion) {
    const query = `
    DELETE FROM FirmaElectronica
    WHERE idFirmaElectronica = ? AND Usuario_identificacion = ?
  `;
    const [result] = await pool.query(query, [idFirmaElectronica, usuarioIdentificacion]);
    return result.affectedRows; // 1 si se eliminó, 0 si no existía
}

module.exports = {
    findAllFirmas,
    findFirmaById,
    createFirma,
    updateFirma,
    deleteFirma,
};
