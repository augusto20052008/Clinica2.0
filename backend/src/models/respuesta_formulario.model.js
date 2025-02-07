const db = require('../config/db');

async function obtenerTodos() {
    const query = 'SELECT * FROM respuesta_formulario';
    const [rows] = await db.query(query);
    return rows;
}

async function obtenerPorId(id_formulario, id_campo) {
    const query = 'SELECT * FROM respuesta_formulario WHERE id_formulario = ? AND id_campo = ? ';
    const [rows] = await db.query(query, [id_formulario, id_campo]);
    return rows.length ? rows[0] : null;
}

async function crear(data) {
    const query = `
    INSERT INTO respuesta_formulario 
      (id_formulario, id_campo, valor)
    VALUES (?, ?, ?)
  `;
    const { id_formulario, id_campo, valor } = data;

    const [result] = await db.query(query, [
        id_formulario,
        id_campo,
        valor,
    ]);

    return {
        id_respuesta: result.insertId,
        ...data,
    };
}

async function actualizar(idRespuesta, data) {
    const query = `
    UPDATE respuesta_formulario
    SET 
      id_formulario = ?, 
      id_campo = ?, 
      valor = ?
    WHERE id_respuesta = ?
  `;
    const { id_formulario, id_campo, valor } = data;

    await db.query(query, [
        id_formulario,
        id_campo,
        valor,
        idRespuesta,
    ]);

    return { id_respuesta: idRespuesta, ...data };
}

async function eliminar(idRespuesta) {
    const query = 'DELETE FROM respuesta_formulario WHERE id_respuesta = ?';
    await db.query(query, [idRespuesta]);
    return true;
}

async function obtenerPorFormulario(idFormulario) {
    const query = 'SELECT * FROM respuesta_formulario WHERE id_formulario = ?';
    const [rows] = await db.query(query, [idFormulario]);
    return rows;
}

async function obtenerPorFormularioYCampo(idFormulario, idCampo) {
    const query = 'SELECT * FROM respuesta_formulario WHERE id_formulario = ? AND id_campo = ?';
    const [rows] = await db.query(query, [idFormulario, idCampo]);
    return rows.length ? rows[0] : null;
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    obtenerPorFormulario,
    obtenerPorFormularioYCampo,
};
