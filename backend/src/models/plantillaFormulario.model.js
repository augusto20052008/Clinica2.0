const pool = require('../config/db');

async function findAllPlantillas() {
    const query = 'SELECT * FROM Plantilla_Formulario';
    const [rows] = await pool.query(query);
    return rows;
}

async function findPlantillaById(idPlantilla) {
    const query = `
    SELECT *
    FROM Plantilla_Formulario
    WHERE idPlantilla_Formulario = ?
  `;
    const [rows] = await pool.query(query, [idPlantilla]);
    return rows[0] || null;
}

async function createPlantilla(plantillaData) {
    const {
        nroTipoFormulario,
        nombreTipoFormulario,
        Estructura,
    } = plantillaData;

    const query = `
    INSERT INTO Plantilla_Formulario
      (nroTipoFormulario, nombreTipoFormulario, Estructura)
    VALUES (?, ?, ?)
  `;

    const values = [
        nroTipoFormulario || null,
        nombreTipoFormulario,
        typeof Estructura === 'object' ? JSON.stringify(Estructura) : Estructura,
    ];

    const [result] = await pool.query(query, values);
    return result.insertId;
}

async function updatePlantilla(idPlantilla, plantillaData) {
    const {
        nroTipoFormulario,
        nombreTipoFormulario,
        Estructura,
    } = plantillaData;

    const query = `
    UPDATE Plantilla_Formulario
    SET
      nroTipoFormulario = ?,
      nombreTipoFormulario = ?,
      Estructura = ?
    WHERE idPlantilla_Formulario = ?
  `;

    const values = [
        nroTipoFormulario || null,
        nombreTipoFormulario,
        typeof Estructura === 'object' ? JSON.stringify(Estructura) : Estructura,
        idPlantilla,
    ];

    const [result] = await pool.query(query, values);
    return result.affectedRows; // 1 si se actualizó, 0 si no existía
}

async function deletePlantilla(idPlantilla) {
    const query = `
    DELETE FROM Plantilla_Formulario
    WHERE idPlantilla_Formulario = ?
  `;
    const [result] = await pool.query(query, [idPlantilla]);
    return result.affectedRows; // 1 si se eliminó, 0 si no existía
}

module.exports = {
    findAllPlantillas,
    findPlantillaById,
    createPlantilla,
    updatePlantilla,
    deletePlantilla,
};
