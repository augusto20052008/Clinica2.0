const db = require('../config/db');

async function obtenerTodos() {
    const query = 'SELECT * FROM paciente';
    const [rows] = await db.query(query);
    return rows;
}

async function obtenerPorId(nroIdentificacion) {
    const query = 'SELECT * FROM paciente WHERE nro_identificacion = ?';
    const [rows] = await db.query(query, [nroIdentificacion]);
    return rows.length ? rows[0] : null;
}

async function crear(data) {
    const query = `
    INSERT INTO paciente (
      nro_identificacion,
      tipo_identificacion,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      genero,
      fecha_nacimiento
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const {
        nro_identificacion,
        tipo_identificacion,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        genero,
        fecha_nacimiento
    } = data;

    await db.query(query, [
        nro_identificacion,
        tipo_identificacion,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        genero,
        fecha_nacimiento
    ]);

    return { ...data };
}

async function actualizar(nroIdentificacion, data) {
    const query = `
    UPDATE paciente
    SET
      tipo_identificacion = ?,
      primer_nombre = ?,
      segundo_nombre = ?,
      primer_apellido = ?,
      segundo_apellido = ?,
      genero = ?,
      fecha_nacimiento = ?
    WHERE nro_identificacion = ?
  `;

    const {
        tipo_identificacion,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        genero,
        fecha_nacimiento
    } = data;

    await db.query(query, [
        tipo_identificacion,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        genero,
        fecha_nacimiento,
        nroIdentificacion
    ]);

    return { nro_identificacion: nroIdentificacion, ...data };
}

async function eliminar(nroIdentificacion) {
    const query = 'DELETE FROM paciente WHERE nro_identificacion = ?';
    await db.query(query, [nroIdentificacion]);
    return true;
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};
