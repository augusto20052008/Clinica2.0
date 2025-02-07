-- --------------------------------------------
-- Script de inserción de datos para clinica_san_jose
-- --------------------------------------------

-- Seleccionar el esquema correcto
USE `clinica_san_jose`;

-- --------------------------------------------
-- 1. Insertar roles en la tabla `rol`
-- --------------------------------------------

-- Insertar roles con IDs específicos
INSERT INTO `rol` (`id_rol`, `nombre_rol`) VALUES
  (1, 'Administrador'),
  (2, 'Doctor'),
  (3, 'Enfermera')
ON DUPLICATE KEY UPDATE `nombre_rol` = VALUES(`nombre_rol`);

-- --------------------------------------------
-- 2. Insertar usuarios en la tabla `usuario`
-- --------------------------------------------

-- Nota: Reemplaza '$2b$10$abcdefg' con hashes válidos de contraseñas generados por bcrypt u otro algoritmo seguro.

-- Insertar 5 usuarios con rol 'Doctor' (id_rol = 2)
INSERT INTO `usuario` (`usuario`, `correo`, `contraseña`, `id_rol`) VALUES
  ('Dr_Ana', 'ana.doctor@clinica.com', '$2b$10$abcdefg', 2),
  ('Dr_Beatriz', 'beatriz.doctor@clinica.com', '$2b$10$abcdefg', 2),
  ('Dr_Carlos', 'carlos.doctor@clinica.com', '$2b$10$abcdefg', 2),
  ('Dr_Daniela', 'daniela.doctor@clinica.com', '$2b$10$abcdefg', 2),
  ('Dr_Eduardo', 'eduardo.doctor@clinica.com', '$2a$10$5nFbTdiOmgMUr7YVhF5EdeF1BBQUhXAgd5YhpdjRzu7a.9zeoJnXK', 2)
ON DUPLICATE KEY UPDATE `correo` = VALUES(`correo`);

-- Insertar 6 usuarios con rol 'Enfermera' (id_rol = 3)
INSERT INTO `usuario` (`usuario`, `correo`, `contraseña`, `id_rol`) VALUES
  ('Enf_Fernanda', 'fernanda.enfermera@clinica.com', '$2b$10$abcdefg', 3),
  ('Enf_Gabriela', 'gabriela.enfermera@clinica.com', '$2b$10$abcdefg', 3),
  ('Enf_Hugo', 'hugo.enfermera@clinica.com', '$2b$10$abcdefg', 3),
  ('Enf_Ivana', 'ivana.enfermera@clinica.com', '$2b$10$abcdefg', 3),
  ('Enf_Jorge', 'jorge.enfermera@clinica.com', '$2b$10$abcdefg', 3),
  ('Enf_Karen', 'karen.enfermera@clinica.com', '$2b$10$abcdefg', 3)
ON DUPLICATE KEY UPDATE `correo` = VALUES(`correo`);

-- Insertar 1 usuario con rol 'Administrador' (id_rol = 1)
INSERT INTO `usuario` (`usuario`, `correo`, `contraseña`, `id_rol`) VALUES
  ('Admin_Luis', 'luis.admin@clinica.com', '$2b$10$abcdefg', 1)
ON DUPLICATE KEY UPDATE `correo` = VALUES(`correo`);

-- --------------------------------------------
-- 3. Insertar pacientes en la tabla `paciente`
-- --------------------------------------------

INSERT INTO `paciente` (
  `nro_identificacion`,
  `tipo_identificacion`,
  `primer_nombre`,
  `segundo_nombre`,
  `primer_apellido`,
  `segundo_apellido`,
  `genero`,
  `fecha_nacimiento`
) VALUES
  ('1234567890', 'cedula', 'Maria', 'Elena', 'Gomez', 'Perez', 'F', '1985-04-12'),
  ('0987654321', 'cedula', 'Juan', 'Carlos', 'Rodriguez', 'Lopez', 'M', '1990-08-23'),
  ('1122334455', 'pasaporte', 'Lucia', 'Fernanda', 'Martinez', 'Garcia', 'F', '1978-12-05'),
  ('6677889900', 'cedula', 'Pedro', 'Luis', 'Sanchez', 'Ramirez', 'M', '1995-03-30'),
  ('5566778899', 'pasaporte', 'Ana', 'Maria', 'Diaz', 'Torres', 'F', '1982-07-19')
ON DUPLICATE KEY UPDATE
  `tipo_identificacion` = VALUES(`tipo_identificacion`);

-- --------------------------------------------
-- 4. Insertar archivo_clinico para cada paciente
-- --------------------------------------------

-- Insertar un archivo_clinico para cada paciente
INSERT INTO `archivo_clinico` (`nro_identificacion`) VALUES
  ('1234567890'),
  ('0987654321'),
  ('1122334455'),
  ('6677889900'),
  ('5566778899');

-- --------------------------------------------
-- 5. Insertar un tipo de formulario 'Admisión' en `formulario_tipo`
-- --------------------------------------------

-- Insertar tipo de formulario 'Admisión'
INSERT INTO `formulario_tipo` (`id_formulario_tipo`, `nombre`, `descripcion`) VALUES
  (1, 'Admisión', 'Formulario de admisión para nuevos pacientes')
ON DUPLICATE KEY UPDATE
  `nombre` = VALUES(`nombre`),
  `descripcion` = VALUES(`descripcion`);

-- --------------------------------------------
-- 6. Insertar campos para el formulario 'Admisión' en `campo_formulario`
-- --------------------------------------------

-- Insertar campos para 'Admisión'
INSERT INTO `campo_formulario` (
  `id_formulario_tipo`,
  `nombre_campo`,
  `tipo_dato`,
  `requerido`,
  `opciones`
) VALUES
  (1, 'Fecha de Admisión', 'DATE', 1, NULL),
  (1, 'Motivo de Visita', 'TEXT', 1, NULL),
  (1, 'Peso (kg)', 'FLOAT', 0, NULL),
  (1, 'Presión Arterial', 'TEXT', 0, NULL),
  (1, 'Alergias', 'ENUM', 0, 'Ninguna,Polen,Alimentos,Medicamentos,Otros')
ON DUPLICATE KEY UPDATE
  `nombre_campo` = VALUES(`nombre_campo`),
  `tipo_dato` = VALUES(`tipo_dato`),
  `requerido` = VALUES(`requerido`),
  `opciones` = VALUES(`opciones`);

-- --------------------------------------------
-- 7. Insertar un formulario de tipo 'Admisión' con respuestas llenas
-- --------------------------------------------

-- Nota: Asegúrate de que el usuario 'Admin_Luis' tiene id_usuario = 1.
--       Si los IDs son diferentes, ajusta los valores de acuerdo a tu base de datos.

-- Insertar un formulario de admisión para el paciente '1234567890' creado por 'Admin_Luis'
INSERT INTO `formulario` (
  `id_formulario_tipo`,
  `nro_archivo`,
  `id_usuario_creador`,
  `estado`
) VALUES (
  1, -- id_formulario_tipo para 'Admisión'
  (SELECT `nro_archivo` FROM `archivo_clinico` WHERE `nro_identificacion` = '1234567890' LIMIT 1),
  1, -- id_usuario_creador (Admin_Luis tiene id_usuario=1)
  'COMPLETADO'
);

-- Obtener el id_formulario recién creado
SET @id_formulario_admision = LAST_INSERT_ID();

-- Obtener los id_campo para los campos del formulario 'Admisión'
SET @id_campo_fecha_admision = (SELECT `id_campo` FROM `campo_formulario` WHERE `id_formulario_tipo` = 1 AND `nombre_campo` = 'Fecha de Admisión' LIMIT 1);
SET @id_campo_motivo_visita = (SELECT `id_campo` FROM `campo_formulario` WHERE `id_formulario_tipo` = 1 AND `nombre_campo` = 'Motivo de Visita' LIMIT 1);
SET @id_campo_peso = (SELECT `id_campo` FROM `campo_formulario` WHERE `id_formulario_tipo` = 1 AND `nombre_campo` = 'Peso (kg)' LIMIT 1);
SET @id_campo_presion = (SELECT `id_campo` FROM `campo_formulario` WHERE `id_formulario_tipo` = 1 AND `nombre_campo` = 'Presión Arterial' LIMIT 1);
SET @id_campo_alergias = (SELECT `id_campo` FROM `campo_formulario` WHERE `id_formulario_tipo` = 1 AND `nombre_campo` = 'Alergias' LIMIT 1);

-- Insertar respuestas para el formulario
INSERT INTO `respuesta_formulario` (
  `id_formulario`,
  `id_campo`,
  `valor`
) VALUES
  (@id_formulario_admision, @id_campo_fecha_admision, '2025-01-25'),
  (@id_formulario_admision, @id_campo_motivo_visita, 'Chequeo general'),
  (@id_formulario_admision, @id_campo_peso, '70.5'),
  (@id_formulario_admision, @id_campo_presion, '120/80'),
  (@id_formulario_admision, @id_campo_alergias, 'Ninguna');

-- --------------------------------------------
-- 8. Fin del Script de Inserción de Datos
-- --------------------------------------------

-- Nota: 
-- 1. Asegúrate de que las contraseñas proporcionadas sean hashes válidos.
--    Los valores '$2b$10$abcdefg' son solo ejemplos y deben ser reemplazados por hashes generados por bcrypt u otro algoritmo seguro.
-- 2. Este script asume que los IDs son asignados de manera secuencial y que no hay datos previos que puedan causar conflictos.
--    Si ya existen datos en las tablas, ajusta los IDs o elimina los registros duplicados según sea necesario.
