const db = require('../config/db');

async function obtenerTodos() {
    const query =`SELECT
                        f.id_formulario,
                        ft.id_formulario_tipo,
                        ft.nombre AS nombre_tipo_formulario,
                        p.nro_identificacion AS cedula_paciente,
                        u.usuario AS nombre_creador,
                        f.fecha_creacion,
                        f.estado
                    FROM
                        clinica_san_jose.formulario f
                    INNER JOIN
                        clinica_san_jose.formulario_tipo ft ON f.id_formulario_tipo = ft.id_formulario_tipo
                    INNER JOIN
                        clinica_san_jose.archivo_clinico ac ON f.nro_archivo = ac.nro_archivo
                    INNER JOIN
                        clinica_san_jose.paciente p ON ac.nro_identificacion = p.nro_identificacion
                    INNER JOIN
                        clinica_san_jose.usuario u ON f.id_usuario_creador = u.id_usuario;`

    const [rows] = await db.query(query);
    return rows;
}

async function obtenerPorId(id) {
    const query = `
        SELECT *
        FROM formulario
        WHERE id_formulario = ?
    `;
    const [rows] = await db.query(query, [id]);
    return rows.length ? rows[0] : null;
}

async function obtenerPorNroArchivo(nroArchivoClinico) {
    const query = `
        SELECT *
        FROM formulario
        WHERE nro_archivo = ?
    `;
    const [rows] = await db.query(query, [nroArchivoClinico]);
    return rows.length ? rows[0] : null;
}

async function obtenerFormulariosCreadosPorUsuario(idUsuarioCreador) {
    const query = `
        SELECT *
        FROM formulario
        WHERE id_usuario_creador = ?
    `;
    const [rows] = await db.query(query, [idUsuarioCreador]);
    return rows.length ? rows[0] : null;
}

async function crear(data) {
    const query = `
        INSERT INTO formulario (id_formulario_tipo, nro_archivo, id_usuario_creador, fecha_creacion, estado)
        VALUES (?, ?, ?, NOW(), ?)
    `;
    const { id_formulario_tipo, nro_archivo, id_usuario_creador, estado } = data;

    const [result] = await db.query(query, [id_formulario_tipo, nro_archivo, id_usuario_creador, estado]);

    return {
        id_formulario: result.insertId,
        ...data,
    };
}

async function actualizar(id, data) {
    const query = `
        UPDATE formulario
        SET id_formulario_tipo = ?,
            nro_archivo = ?,
            id_usuario_creador = ?,
            estado = ?
        WHERE id_formulario = ?
    `;
    const { id_formulario_tipo, nro_archivo, id_usuario_creador, estado } = data;

    await db.query(query, [id_formulario_tipo, nro_archivo, id_usuario_creador, estado, id]);

    return obtenerPorId(id);
}

async function eliminar(id) {
    const query = `
        DELETE FROM formulario
        WHERE id_formulario = ?
    `;
    await db.query(query, [id]);
    return true;
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
};
