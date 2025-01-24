const pool = require("../config/db");

async function findAllFormularios(estadoFormulario = null) {
  let query = "SELECT * FROM Formulario";
  const values = [];

  if (estadoFormulario) {
    query += " WHERE estadoFormulario = ?";
    values.push(estadoFormulario);
  }

  const [rows] = await pool.query(query, values);
  return rows;
}

async function findFormularioById(idHistoriaClinica) {
  const query = `
    SELECT *
    FROM Formulario
    WHERE
      HistoriaClinica_idHistoriaClinica = ?
  `;
  const [rows] = await pool.query(query, [idHistoriaClinica]);
  return rows || null;
}

async function createFormulario(formData) {
  const {
    nroHistoriaClinica,
    contenido,
    estadoFormulario,
    notas,
    observaciones,
    HistoriaClinica_idHistoriaClinica,
    Plantilla_Formulario_idPlantilla_Formulario,
    Establecimiento_idEstablecimiento,
  } = formData;

  const query = `
    INSERT INTO Formulario (
      nroHistoriaClinica,
      contenido,
      estadoFormulario,
      notas,
      observaciones,
      HistoriaClinica_idHistoriaClinica,
      Plantilla_Formulario_idPlantilla_Formulario,
      Establecimiento_idEstablecimiento
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const contenidoStr =
    typeof contenido === "object"
      ? JSON.stringify(contenido)
      : contenido || null;

  const values = [
    nroHistoriaClinica || null,
    contenidoStr,
    estadoFormulario || null,
    notas || null,
    observaciones || null,
    HistoriaClinica_idHistoriaClinica,
    Plantilla_Formulario_idPlantilla_Formulario,
    Establecimiento_idEstablecimiento,
  ];

  const [result] = await pool.query(query, values);

  return {
    idFormulario: result.insertId,
    HistoriaClinica_idHistoriaClinica,
    Plantilla_Formulario_idPlantilla_Formulario,
    Establecimiento_idEstablecimiento,
  };
}

async function updateFormulario(
  idFormulario,
  idHistoriaClinica,
  idPlantilla,
  idEstablecimiento,
  formData
) {
  const {
    nroHistoriaClinica,
    contenido,
    estadoFormulario,
    notas,
    observaciones,
  } = formData;

  const query = `
    UPDATE Formulario
    SET
      nroHistoriaClinica = ?,
      contenido = ?,
      estadoFormulario = ?,
      notas = ?,
      observaciones = ?
    WHERE
      idFormulario = ?
      AND HistoriaClinica_idHistoriaClinica = ?
      AND Plantilla_Formulario_idPlantilla_Formulario = ?
      AND Establecimiento_idEstablecimiento = ?
  `;

  const contenidoStr =
    typeof contenido === "object"
      ? JSON.stringify(contenido)
      : contenido || null;

  const values = [
    nroHistoriaClinica || null,
    contenidoStr,
    estadoFormulario || null,
    notas || null,
    observaciones || null,
    idFormulario,
    idHistoriaClinica,
    idPlantilla,
    idEstablecimiento,
  ];

  const [result] = await pool.query(query, values);
  return result.affectedRows; // 1 si se actualizó, 0 si no existía
}

async function deleteFormulario(
  idFormulario,
  idHistoriaClinica,
  idPlantilla,
  idEstablecimiento
) {
  const query = `
    DELETE FROM Formulario
    WHERE
      idFormulario = ?
      AND HistoriaClinica_idHistoriaClinica = ?
      AND Plantilla_Formulario_idPlantilla_Formulario = ?
      AND Establecimiento_idEstablecimiento = ?
  `;
  const [result] = await pool.query(query, [
    idFormulario,
    idHistoriaClinica,
    idPlantilla,
    idEstablecimiento,
  ]);
  return result.affectedRows; // 1 si se eliminó, 0 si no
}

module.exports = {
  findAllFormularios,
  findFormularioById,
  createFormulario,
  updateFormulario,
  deleteFormulario,
};
