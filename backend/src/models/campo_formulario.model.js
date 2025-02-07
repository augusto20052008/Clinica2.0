const db = require('../config/db');

async function obtenerTodos() {
    const query = 'SELECT * FROM campo_formulario';
    const [rows] = await db.query(query);
    return rows;
}

async function obtenerPorId(idCampo) {
    const query = 'SELECT * FROM campo_formulario WHERE id_campo = ?';
    const [rows] = await db.query(query, [idCampo]);
    return rows.length ? rows[0] : null;
}

async function obtenerPorFormulario(idFormularioTipo) {
    const query = 'SELECT * FROM campo_formulario WHERE id_formulario_tipo = ?';
    const [rows] = await db.query(query, [idFormularioTipo]);
    return rows.length ? rows[0] : null;
}

async function obtenerCamposPorFormularioYSeccion(idFormulario, idSeccion) {
    try {
        const query = `
            SELECT * FROM campo_formulario 
            WHERE id_formulario_tipo = ? AND id_seccion = ?
        `;
        const [rows] = await db.query(query, [idFormulario, idSeccion]);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function crear(data) {
    const query = `
    INSERT INTO campo_formulario 
      (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido, opciones)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
    const { id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido, opciones } = data;

    const [result] = await db.query(query, [
        id_formulario_tipo,
        id_seccion,
        nombre_campo,
        tipo_dato,
        requerido,
        opciones,
    ]);

    return {
        id_campo: result.insertId,
        ...data,
    };
}

async function actualizar(idCampo, data) {
    const query = `
    UPDATE campo_formulario
    SET 
      id_formulario_tipo = ?, 
      id_seccion = ?, 
      nombre_campo = ?, 
      tipo_dato = ?, 
      requerido = ?, 
      opciones = ?
    WHERE id_campo = ?
  `;
    const { id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido, opciones } = data;

    await db.query(query, [
        id_formulario_tipo,
        id_seccion,
        nombre_campo,
        tipo_dato,
        requerido,
        opciones,
        idCampo,
    ]);

    return { id_campo: idCampo, ...data };
}

async function eliminar(idCampo) {
    const query = 'DELETE FROM campo_formulario WHERE id_campo = ?';
    await db.query(query, [idCampo]);
    return true;
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    obtenerPorFormulario,
    obtenerCamposPorFormularioYSeccion,
    crear,
    actualizar,
    eliminar,
};
