const pool = require('../config/db');

async function findAllPacientes() {
    const query = 'SELECT * FROM Paciente';
    const [rows] = await pool.query(query);
    return rows;
}

async function findPacienteById(identificacion) {
    const query = `
    SELECT *
    FROM Paciente
    WHERE identificacion = ?
  `;
    const [rows] = await pool.query(query, [identificacion]);
    return rows[0] || null;
}

async function createPaciente(pacienteData) {
    const {
        identificacion,
        apellidoParteno,
        apellidoMaterno,
        primerNombre,
        segundoNombre,
        barrio,
        parroquia,
        canton,
        provincia,
        zona,
        telefonoPaciente,
        fechaNacimiento,
        lugarNacimiento,
        nacionalidad,
        grupoCultural,
        sexo,
        estadoCivil,
        instruccionUltimoAnioAprov,
        direccionPaciente,
        correo,
        fechaCreacion,
        ocupacion,
        empresaTrabajo,
        tipoSeguroSalud,
        alergias,
        grupoSanguineo,
        observaciones,
    } = pacienteData;

    const query = `
    INSERT INTO Paciente (
      identificacion,
      apellidoParteno,
      apellidoMaterno,
      primerNombre,
      segundoNombre,
      barrio,
      parroquia,
      canton,
      provincia,
      zona,
      telefonoPaciente,
      fechaNacimiento,
      lugarNacimiento,
      nacionalidad,
      grupoCultural,
      sexo,
      estadoCivil,
      instruccionUltimoAnioAprov,
      direccionPaciente,
      correo,
      fechaCreacion,
      ocupacion,
      empresaTrabajo,
      tipoSeguroSalud,
      alergias,
      grupoSanguineo,
      observaciones
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [
        identificacion,
        apellidoParteno || null,
        apellidoMaterno || null,
        primerNombre || null,
        segundoNombre || null,
        barrio || null,
        parroquia || null,
        canton || null,
        provincia || null,
        zona || null,
        telefonoPaciente || null,
        fechaNacimiento || null,
        lugarNacimiento || null,
        nacionalidad || null,
        grupoCultural || null,
        sexo || null,
        estadoCivil || null,
        instruccionUltimoAnioAprov || null,
        direccionPaciente || null,
        correo || null,
        fechaCreacion || null,
        ocupacion || null,
        empresaTrabajo || null,
        tipoSeguroSalud || null,
        alergias || null,
        grupoSanguineo || null,
        observaciones || null,
    ];

    const [result] = await pool.query(query, values);
    return identificacion;
}

async function updatePaciente(identificacion, pacienteData) {
    const {
        apellidoParteno,
        apellidoMaterno,
        primerNombre,
        segundoNombre,
        barrio,
        parroquia,
        canton,
        provincia,
        zona,
        telefonoPaciente,
        fechaNacimiento,
        lugarNacimiento,
        nacionalidad,
        grupoCultural,
        sexo,
        estadoCivil,
        instruccionUltimoAnioAprov,
        direccionPaciente,
        correo,
        ocupacion,
        empresaTrabajo,
        tipoSeguroSalud,
        alergias,
        grupoSanguineo,
        observaciones,
    } = pacienteData;

    const query = `
    UPDATE Paciente
    SET
      apellidoParteno = ?,
      apellidoMaterno = ?,
      primerNombre = ?,
      segundoNombre = ?,
      barrio = ?,
      parroquia = ?,
      canton = ?,
      provincia = ?,
      zona = ?,
      telefonoPaciente = ?,
      fechaNacimiento = ?,
      lugarNacimiento = ?,
      nacionalidad = ?,
      grupoCultural = ?,
      sexo = ?,
      estadoCivil = ?,
      instruccionUltimoAnioAprov = ?,
      direccionPaciente = ?,
      correo = ?,
      ocupacion = ?,
      empresaTrabajo = ?,
      tipoSeguroSalud = ?,
      alergias = ?,
      grupoSanguineo = ?,
      observaciones = ?
    WHERE identificacion = ?
  `;

    const values = [
        apellidoParteno || null,
        apellidoMaterno || null,
        primerNombre || null,
        segundoNombre || null,
        barrio || null,
        parroquia || null,
        canton || null,
        provincia || null,
        zona || null,
        telefonoPaciente || null,
        fechaNacimiento || null,
        lugarNacimiento || null,
        nacionalidad || null,
        grupoCultural || null,
        sexo || null,
        estadoCivil || null,
        instruccionUltimoAnioAprov || null,
        direccionPaciente || null,
        correo || null,
        ocupacion || null,
        empresaTrabajo || null,
        tipoSeguroSalud || null,
        alergias || null,
        grupoSanguineo || null,
        observaciones || null,
        identificacion,
    ];

    const [result] = await pool.query(query, values);
    return result.affectedRows; // 1 si se actualizó, 0 si no existía
}

async function deletePaciente(identificacion) {
    const query = `
    DELETE FROM Paciente
    WHERE identificacion = ?
  `;
    const [result] = await pool.query(query, [identificacion]);
    return result.affectedRows; // 1 si se eliminó, 0 si no existía
}

module.exports = {
    findAllPacientes,
    findPacienteById,
    createPaciente,
    updatePaciente,
    deletePaciente,
};
