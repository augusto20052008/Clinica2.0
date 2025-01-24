const pool = require('../config/db');


async function findAllUsuarios() {
  const query = 'SELECT * FROM Usuario';
  const [rows] = await pool.query(query);
  return rows;
}

async function findUsuarioById(identificacion) {
  const query = 'SELECT * FROM Usuario WHERE identificacion = ?';
  const [rows] = await pool.query(query, [identificacion]);
  return rows[0] || null;
}

async function findByCorreo(correo) {
  const query = 'SELECT * FROM Usuario WHERE correo = ?';
  const [rows] = await pool.query(query, [correo]);
  return rows[0] || null;
}

async function createUsuario(usuarioData) {
  const {
    identificacion,
    correo,
    contraseña,
    nombres,
    apellidos,
    fechaNacimiento,
    direccionDomicilio,
    telefono,
    sexo,
    estadoCivil,
    especialidad,
    fotografia,
    consultorio,
    estado,
    rol,
  } = usuarioData;

  const query = `
    INSERT INTO Usuario
    (
      identificacion,
      correo,
      contraseña,
      nombres,
      apellidos,
      fechaNacimiento,
      direccionDomicilio,
      telefono,
      sexo,
      estadoCivil,
      especialidad,
      fotografia,
      consultorio,
      estado,
      rol
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    identificacion,
    correo,
    contraseña,
    nombres,
    apellidos,
    fechaNacimiento,
    direccionDomicilio,
    telefono,
    sexo,
    estadoCivil,
    especialidad || null,
    fotografia || null,
    consultorio || null,
    estado,
    rol,
  ];

  const [result] = await pool.query(query, values);
  return result.insertId || identificacion;
}

async function updateUsuario(identificacion, usuarioData) {
  const {
    correo,
    contraseña,
    nombres,
    apellidos,
    fechaNacimiento,
    direccionDomicilio,
    telefono,
    sexo,
    estadoCivil,
    especialidad,
    fotografia,
    consultorio,
    estado,
    rol,
  } = usuarioData;

  const query = `
    UPDATE Usuario
    SET
      correo = ?,
      contraseña = ?,
      nombres = ?,
      apellidos = ?,
      fechaNacimiento = ?,
      direccionDomicilio = ?,
      telefono = ?,
      sexo = ?,
      estadoCivil = ?,
      especialidad = ?,
      fotografia = ?,
      consultorio = ?,
      estado = ?,
      rol = ?
    WHERE identificacion = ?
  `;
  const values = [
    correo,
    contraseña,
    nombres,
    apellidos,
    fechaNacimiento,
    direccionDomicilio,
    telefono,
    sexo,
    estadoCivil,
    especialidad,
    fotografia || null,
    consultorio || null,
    estado,
    rol,
    identificacion,
  ];

  const [result] = await pool.query(query, values);
  return result.affectedRows; // 1 si se actualizó, 0 si no existía
}

async function deleteUsuario(identificacion) {
  const query = 'DELETE FROM Usuario WHERE identificacion = ?';
  const [result] = await pool.query(query, [identificacion]);
  return result.affectedRows; // 1 si se eliminó, 0 si no existía
}

module.exports = {
  findAllUsuarios,
  findUsuarioById,
  findByCorreo,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
