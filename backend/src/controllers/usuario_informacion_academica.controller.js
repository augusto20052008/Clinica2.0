const uiaModel = require('../models/usuario_informacion_academica.model');

exports.obtenerInformacionAcademica = async (req, res) => {
  try {
    const datos = await uiaModel.obtenerTodos();
    return res.json(datos);
  } catch (error) {
    console.error('Error al obtener información académica:', error);
    return res.status(500).json({ message: 'Error al obtener información académica' });
  }
};

exports.obtenerInformacionAcademicaPorId = async (req, res) => {
  const { id_informacion_academica } = req.params;
  try {
    const dato = await uiaModel.obtenerPorId(id_informacion_academica);
    if (!dato) {
      return res.status(404).json({ message: 'No se encontró la información académica' });
    }
    return res.json(dato);
  } catch (error) {
    console.error('Error al obtener información académica por ID:', error);
    return res.status(500).json({ message: 'Error al obtener información académica por ID' });
  }
};

exports.obtenerInformacionAcademicaPorUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const dato = await uiaModel.obtenerPorUsuario(id_usuario);
    if (!dato) {
      return res.status(404).json({ message: 'No se encontró información académica para este usuario' });
    }
    return res.json(dato);
  } catch (error) {
    console.error('Error al obtener información académica por usuario:', error);
    return res.status(500).json({ message: 'Error al obtener información académica por usuario' });
  }
};

exports.crearInformacionAcademica = async (req, res) => {
  try {
    const {
      id_usuario,
      institucion,
      titulo,
      anio_graduacion,
      especialidad,
      registro_senescyt,
    } = req.body;

    // Validar que los campos requeridos están presentes
    if (!id_usuario || !institucion || !titulo || !anio_graduacion || !registro_senescyt) {
      return res.status(400).json({
        message: "Faltan campos requeridos (id_usuario, institucion, titulo, anio_graduacion, registro_senescyt).",
      });
    }

    const nuevoRegistro = await uiaModel.crear({
      id_usuario,
      institucion,
      titulo,
      anio_graduacion,
      especialidad: especialidad || "N/A",
      registro_senescyt,
    });

    return res.status(201).json(nuevoRegistro);
  } catch (error) {
    console.error("Error al crear información académica:", error);
    return res.status(500).json({ message: "Error al crear información académica." });
  }
};

exports.actualizarInformacionAcademica = async (req, res) => {
  const { id_informacion_academica } = req.params;
  try {
    const {
      institucion,
      titulo,
      anio_graduacion,
      especialidad,
      registro_senescyt,
    } = req.body;

    if (!institucion || !titulo || !anio_graduacion || !registro_senescyt) {
      return res.status(400).json({ 
        message: 'Faltan campos requeridos (institucion, titulo, anio_graduacion, registro_senescyt)' 
      });
    }

    const registroActualizado = await uiaModel.actualizar(id_informacion_academica, {
      institucion,
      titulo,
      anio_graduacion,
      especialidad,
      registro_senescyt,
    });

    return res.json(registroActualizado);
  } catch (error) {
    console.error('Error al actualizar información académica:', error);
    return res.status(500).json({ message: 'Error al actualizar información académica' });
  }
};

exports.eliminarInformacionAcademica = async (req, res) => {
  const { id_informacion_academica } = req.params;
  try {
    await uiaModel.eliminar(id_informacion_academica);
    return res.json({ message: 'Información académica eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar información académica:', error);
    return res.status(500).json({ message: 'Error al eliminar información académica' });
  }
};
