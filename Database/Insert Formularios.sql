/* ===========================================================
   SCRIPT: CREACIÓN DEL FORMULARIO "ADMISIÓN - ALTA EGRESO"
=========================================================== */

SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

/* ---------------------------------------
   1. CREAR EL TIPO DE FORMULARIO
---------------------------------------- */
INSERT INTO `formulario_tipo` (nombre, descripcion)
VALUES 
  ('Admisión - Alta Egreso', 'Formulario para el registro de admisión y egreso de pacientes');

-- Guardar el ID generado
SET @form_admision := LAST_INSERT_ID();

/* ---------------------------------------
   2. CREAR SECCIONES Y CAMPOS
---------------------------------------- */

/* 🔹 Sección: Datos del Establecimiento */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_admision, 'Datos del Establecimiento', 'Información del establecimiento de salud');

SET @seccion_establecimiento := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_admision, @seccion_establecimiento, 'Nombre del Establecimiento', 'TEXT', 1),
  (@form_admision, @seccion_establecimiento, 'Código del Establecimiento', 'TEXT', 1),
  (@form_admision, @seccion_establecimiento, 'Dirección', 'TEXT', 1),
  (@form_admision, @seccion_establecimiento, 'Teléfono', 'TEXT', 1);

/* 🔹 Sección: Identificación del Paciente */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_admision, 'Identificación del Paciente', 'Datos personales del paciente');

SET @seccion_paciente := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_admision, @seccion_paciente, 'Apellidos y Nombres', 'TEXT', 1),
  (@form_admision, @seccion_paciente, 'Número de Historia Clínica', 'TEXT', 1),
  (@form_admision, @seccion_paciente, 'Fecha de Nacimiento', 'DATE', 1),
  (@form_admision, @seccion_paciente, 'Sexo', 'ENUM', 1),
  (@form_admision, @seccion_paciente, 'Número de Identificación', 'TEXT', 1),
  (@form_admision, @seccion_paciente, 'Domicilio', 'TEXT', 1),
  (@form_admision, @seccion_paciente, 'Teléfono de Contacto', 'TEXT', 1);

/* 🔹 Sección: Ingreso y Egreso */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_admision, 'Ingreso y Egreso', 'Datos de ingreso y egreso del paciente');

SET @seccion_ingreso_egreso := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_admision, @seccion_ingreso_egreso, 'Fecha de Ingreso', 'DATE', 1),
  (@form_admision, @seccion_ingreso_egreso, 'Hora de Ingreso', 'TIME', 1),
  (@form_admision, @seccion_ingreso_egreso, 'Fecha de Egreso', 'DATE', 1),
  (@form_admision, @seccion_ingreso_egreso, 'Hora de Egreso', 'TIME', 1),
  (@form_admision, @seccion_ingreso_egreso, 'Servicio de Ingreso', 'TEXT', 1),
  (@form_admision, @seccion_ingreso_egreso, 'Servicio de Egreso', 'TEXT', 1);

/* 🔹 Sección: Diagnósticos CIE-10 */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_admision, 'Diagnósticos CIE-10', 'Diagnósticos según la clasificación CIE-10');

SET @seccion_diagnosticos := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_admision, @seccion_diagnosticos, 'Diagnóstico Principal (Código CIE-10)', 'TEXT', 1),
  (@form_admision, @seccion_diagnosticos, 'Diagnóstico Principal (Descripción)', 'TEXT', 1),
  (@form_admision, @seccion_diagnosticos, 'Diagnósticos Secundarios (Códigos CIE-10)', 'TEXT', 0),
  (@form_admision, @seccion_diagnosticos, 'Diagnósticos Secundarios (Descripciones)', 'TEXT', 0);

/* 🔹 Sección: Procedimientos y Tratamientos */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_admision, 'Procedimientos y Tratamientos', 'Lista de procedimientos médicos y tratamientos administrados');

SET @seccion_tratamientos := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_admision, @seccion_tratamientos, 'Procedimientos Realizados', 'TEXT', 1),
  (@form_admision, @seccion_tratamientos, 'Medicamentos Administrados', 'TEXT', 1);

/* 🔹 Sección: Condición del Paciente y Firmas */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_admision, 'Condición del Paciente y Firmas', 'Estado final del paciente y firmas de los responsables');

SET @seccion_condicion := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_admision, @seccion_condicion, 'Condición del Paciente al Egreso', 'ENUM', 1),
  (@form_admision, @seccion_condicion, 'Nombre del Médico Tratante', 'TEXT', 1),
  (@form_admision, @seccion_condicion, 'Firma del Médico Tratante', 'TEXT', 1),
  (@form_admision, @seccion_condicion, 'Firma del Paciente o Representante', 'TEXT', 1);

/* ---------------------------------------
   3. FINALIZAR TRANSACCIÓN Y RESTAURAR CLAVES
---------------------------------------- */
COMMIT;

SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

/* FIN DEL SCRIPT */


/* ===========================================================
   SCRIPT: CREACIÓN DEL FORMULARIO "CONSULTA EXTERNA / ANAMNESIS - EXAMEN FÍSICO"
=========================================================== */

SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

/* ---------------------------------------
   1. CREAR EL TIPO DE FORMULARIO
---------------------------------------- */
INSERT INTO `formulario_tipo` (nombre, descripcion)
VALUES 
  ('Consulta Externa / Anamnesis - Examen Físico', 'Formulario para el registro de consultas externas, anamnesis y examen físico');

-- Guardar el ID generado
SET @form_consulta := LAST_INSERT_ID();

/* ---------------------------------------
   2. CREAR SECCIONES Y CAMPOS
---------------------------------------- */

/* 🔹 Sección: Datos Generales */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_consulta, 'Datos Generales', 'Información del paciente y detalles de la consulta');

SET @seccion_datos_generales := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_consulta, @seccion_datos_generales, 'Fecha de Consulta', 'DATE', 1),
  (@form_consulta, @seccion_datos_generales, 'Hora de Consulta', 'TIME', 1),
  (@form_consulta, @seccion_datos_generales, 'Nombre del Paciente', 'TEXT', 1),
  (@form_consulta, @seccion_datos_generales, 'Número de Historia Clínica', 'TEXT', 1),
  (@form_consulta, @seccion_datos_generales, 'Edad', 'INT', 1),
  (@form_consulta, @seccion_datos_generales, 'Sexo', 'ENUM', 1),
  (@form_consulta, @seccion_datos_generales, 'Motivo de Consulta', 'TEXT', 1);

/* 🔹 Sección: Anamnesis */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_consulta, 'Anamnesis', 'Historia clínica detallada del paciente');

SET @seccion_anamnesis := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_consulta, @seccion_anamnesis, 'Antecedentes Personales', 'TEXT', 1),
  (@form_consulta, @seccion_anamnesis, 'Antecedentes Familiares', 'TEXT', 1),
  (@form_consulta, @seccion_anamnesis, 'Hábitos Tóxicos', 'TEXT', 0),
  (@form_consulta, @seccion_anamnesis, 'Alergias', 'TEXT', 0),
  (@form_consulta, @seccion_anamnesis, 'Enfermedades Previas', 'TEXT', 0),
  (@form_consulta, @seccion_anamnesis, 'Cirugías Previas', 'TEXT', 0),
  (@form_consulta, @seccion_anamnesis, 'Medicamentos en Uso', 'TEXT', 0),
  (@form_consulta, @seccion_anamnesis, 'Historia Gineco-Obstétrica', 'TEXT', 0);

/* 🔹 Sección: Examen Físico */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_consulta, 'Examen Físico', 'Evaluación clínica del paciente');

SET @seccion_examen_fisico := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_consulta, @seccion_examen_fisico, 'Signos Vitales', 'TEXT', 1),
  (@form_consulta, @seccion_examen_fisico, 'Cabeza y Cuello', 'TEXT', 0),
  (@form_consulta, @seccion_examen_fisico, 'Tórax', 'TEXT', 0),
  (@form_consulta, @seccion_examen_fisico, 'Abdomen', 'TEXT', 0),
  (@form_consulta, @seccion_examen_fisico, 'Extremidades', 'TEXT', 0),
  (@form_consulta, @seccion_examen_fisico, 'Neurológico', 'TEXT', 0),
  (@form_consulta, @seccion_examen_fisico, 'Piel y Faneras', 'TEXT', 0);

/* 🔹 Sección: Diagnóstico */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_consulta, 'Diagnóstico', 'Diagnóstico del paciente');

SET @seccion_diagnostico := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_consulta, @seccion_diagnostico, 'Diagnóstico Principal (Código CIE-10)', 'TEXT', 1),
  (@form_consulta, @seccion_diagnostico, 'Diagnóstico Principal (Descripción)', 'TEXT', 1),
  (@form_consulta, @seccion_diagnostico, 'Diagnósticos Secundarios (Códigos CIE-10)', 'TEXT', 0),
  (@form_consulta, @seccion_diagnostico, 'Diagnósticos Secundarios (Descripciones)', 'TEXT', 0);

/* 🔹 Sección: Plan de Tratamiento */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_consulta, 'Plan de Tratamiento', 'Plan de manejo y tratamiento del paciente');

SET @seccion_plan_tratamiento := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_consulta, @seccion_plan_tratamiento, 'Tratamiento Farmacológico', 'TEXT', 1),
  (@form_consulta, @seccion_plan_tratamiento, 'Tratamiento No Farmacológico', 'TEXT', 0),
  (@form_consulta, @seccion_plan_tratamiento, 'Recomendaciones Generales', 'TEXT', 0),
  (@form_consulta, @seccion_plan_tratamiento, 'Próxima Cita', 'DATE', 0);  -- ✅ Corrección de sintaxis

/* ---------------------------------------
   3. FINALIZAR TRANSACCIÓN Y RESTAURAR CLAVES
---------------------------------------- */
COMMIT;

SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

/* FIN DEL SCRIPT */

/* ===========================================================
   SCRIPT: CREACIÓN DEL FORMULARIO "HOSPITALIZACIÓN / ANAMNESIS - EXAMEN FÍSICO"
=========================================================== */

SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

/* ---------------------------------------
   1. CREAR EL TIPO DE FORMULARIO
---------------------------------------- */
INSERT INTO `formulario_tipo` (nombre, descripcion)
VALUES 
  ('Hospitalización / Anamnesis - Examen Físico', 'Formulario para el registro de hospitalizaciones, incluyendo anamnesis y examen físico');

-- Guardar el ID generado
SET @form_hospitalizacion := LAST_INSERT_ID();

/* ---------------------------------------
   2. CREAR SECCIONES Y CAMPOS
---------------------------------------- */

/* 🔹 Sección: Datos Generales */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_hospitalizacion, 'Datos Generales', 'Información general del paciente y de la hospitalización');

SET @seccion_datos_generales := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_hospitalizacion, @seccion_datos_generales, 'Fecha de Ingreso', 'DATE', 1),
  (@form_hospitalizacion, @seccion_datos_generales, 'Hora de Ingreso', 'TIME', 1),
  (@form_hospitalizacion, @seccion_datos_generales, 'Nombre del Paciente', 'TEXT', 1),
  (@form_hospitalizacion, @seccion_datos_generales, 'Número de Historia Clínica', 'TEXT', 1),
  (@form_hospitalizacion, @seccion_datos_generales, 'Edad', 'INT', 1),
  (@form_hospitalizacion, @seccion_datos_generales, 'Sexo', 'ENUM', 1),
  (@form_hospitalizacion, @seccion_datos_generales, 'Motivo de Hospitalización', 'TEXT', 1);

/* 🔹 Sección: Anamnesis */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_hospitalizacion, 'Anamnesis', 'Historia clínica detallada del paciente');

SET @seccion_anamnesis := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_hospitalizacion, @seccion_anamnesis, 'Antecedentes Personales', 'TEXT', 1),
  (@form_hospitalizacion, @seccion_anamnesis, 'Antecedentes Familiares', 'TEXT', 1),
  (@form_hospitalizacion, @seccion_anamnesis, 'Hábitos Tóxicos', 'TEXT', 0),
  (@form_hospitalizacion, @seccion_anamnesis, 'Alergias', 'TEXT', 0),
  (@form_hospitalizacion, @seccion_anamnesis, 'Enfermedades Previas', 'TEXT', 0),
  (@form_hospitalizacion, @seccion_anamnesis, 'Cirugías Previas', 'TEXT', 0),
  (@form_hospitalizacion, @seccion_anamnesis, 'Medicamentos en Uso', 'TEXT', 0),
  (@form_hospitalizacion, @seccion_anamnesis, 'Historia Gineco-Obstétrica', 'TEXT', 0);

/* 🔹 Sección: Examen Físico */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_hospitalizacion, 'Examen Físico', 'Resultados del examen físico del paciente');

SET @seccion_examen_fisico := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_hospitalizacion, @seccion_examen_fisico, 'Signos Vitales', 'TEXT', 1),
  (@form_hospitalizacion, @seccion_examen_fisico, 'Cabeza y Cuello', 'TEXT', 0),
  (@form_hospitalizacion, @seccion_examen_fisico, 'Tórax', 'TEXT', 0),
  (@form_hospitalizacion, @seccion_examen_fisico, 'Abdomen', 'TEXT', 0),
  (@form_hospitalizacion, @seccion_examen_fisico, 'Extremidades', 'TEXT', 0),
  (@form_hospitalizacion, @seccion_examen_fisico, 'Neurológico', 'TEXT', 0),
  (@form_hospitalizacion, @seccion_examen_fisico, 'Piel y Faneras', 'TEXT', 0);

/* 🔹 Sección: Plan de Tratamiento */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_hospitalizacion, 'Plan de Tratamiento', 'Plan de manejo y tratamiento del paciente');

SET @seccion_plan_tratamiento := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_hospitalizacion, @seccion_plan_tratamiento, 'Tratamiento Farmacológico', 'TEXT', 1),
  (@form_hospitalizacion, @seccion_plan_tratamiento, 'Tratamiento No Farmacológico', 'TEXT', 0),
  (@form_hospitalizacion, @seccion_plan_tratamiento, 'Recomendaciones Generales', 'TEXT', 0),
  (@form_hospitalizacion, @seccion_plan_tratamiento, 'Próxima Cita', 'DATE', 0); -- ✅ Corrección de sintaxis

/* ---------------------------------------
   3. FINALIZAR TRANSACCIÓN Y RESTAURAR CLAVES
---------------------------------------- */
COMMIT;

SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

/* FIN DEL SCRIPT */


/* ===========================================================
   SCRIPT: CREACIÓN DEL FORMULARIO "EVOLUCIÓN Y PRESCRIPCIONES"
=========================================================== */

SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

/* ---------------------------------------
   1. CREAR EL TIPO DE FORMULARIO
---------------------------------------- */
INSERT INTO `formulario_tipo` (nombre, descripcion)
VALUES 
  ('Evolución y Prescripciones', 'Registro de la evolución clínica y prescripciones médicas del paciente');

-- Guardar el ID generado
SET @form_evolucion := LAST_INSERT_ID();

/* ---------------------------------------
   2. CREAR SECCIONES Y CAMPOS
---------------------------------------- */

/* 🔹 Sección: Datos Generales */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_evolucion, 'Datos Generales', 'Información del paciente y detalles de la consulta');

SET @seccion_datos_generales := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_evolucion, @seccion_datos_generales, 'Fecha de Registro', 'DATE', 1),
  (@form_evolucion, @seccion_datos_generales, 'Hora de Registro', 'TIME', 1),
  (@form_evolucion, @seccion_datos_generales, 'Nombre del Paciente', 'TEXT', 1),
  (@form_evolucion, @seccion_datos_generales, 'Número de Historia Clínica', 'TEXT', 1),
  (@form_evolucion, @seccion_datos_generales, 'Edad', 'INT', 1),
  (@form_evolucion, @seccion_datos_generales, 'Sexo', 'ENUM', 1);

/* 🔹 Sección: Evolución Clínica */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_evolucion, 'Evolución Clínica', 'Descripción detallada de la evolución clínica del paciente');

SET @seccion_evolucion := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_evolucion, @seccion_evolucion, 'Fecha de Evolución', 'DATE', 1),
  (@form_evolucion, @seccion_evolucion, 'Hora de Evolución', 'TIME', 1),
  (@form_evolucion, @seccion_evolucion, 'Descripción de la Evolución', 'TEXT', 1),
  (@form_evolucion, @seccion_evolucion, 'Observaciones', 'TEXT', 0);

/* 🔹 Sección: Prescripciones Médicas */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_evolucion, 'Prescripciones Médicas', 'Registro de las prescripciones médicas indicadas al paciente');

SET @seccion_prescripciones := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_evolucion, @seccion_prescripciones, 'Fecha de Prescripción', 'DATE', 1),
  (@form_evolucion, @seccion_prescripciones, 'Hora de Prescripción', 'TIME', 1),
  (@form_evolucion, @seccion_prescripciones, 'Medicamento/Procedimiento', 'TEXT', 1),
  (@form_evolucion, @seccion_prescripciones, 'Dosis', 'TEXT', 1),
  (@form_evolucion, @seccion_prescripciones, 'Frecuencia', 'TEXT', 1),
  (@form_evolucion, @seccion_prescripciones, 'Duración', 'TEXT', 1),
  (@form_evolucion, @seccion_prescripciones, 'Vía de Administración', 'TEXT', 1),
  (@form_evolucion, @seccion_prescripciones, 'Observaciones', 'TEXT', 0);

/* 🔹 Sección: Firmas */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_evolucion, 'Firmas', 'Firmas de los profesionales responsables');

SET @seccion_firmas := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_evolucion, @seccion_firmas, 'Nombre del Profesional Responsable', 'TEXT', 1),
  (@form_evolucion, @seccion_firmas, 'Firma del Profesional Responsable', 'TEXT', 1),
  (@form_evolucion, @seccion_firmas, 'Número de Registro Profesional', 'TEXT', 1);

/* ---------------------------------------
   3. FINALIZAR TRANSACCIÓN Y RESTAURAR CLAVES
---------------------------------------- */
COMMIT;

SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

/* FIN DEL SCRIPT */


/* ===========================================================
   SCRIPT: CREACIÓN DEL FORMULARIO "EVOLUCIÓN Y PRESCRIPCIONES"
=========================================================== */

SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

/* ---------------------------------------
   1. CREAR EL TIPO DE FORMULARIO
---------------------------------------- */
INSERT INTO `formulario_tipo` (nombre, descripcion)
VALUES 
  ('Evolución y Prescripciones', 'Registro de la evolución clínica y prescripciones médicas del paciente');

-- Guardar el ID generado
SET @form_evolucion := LAST_INSERT_ID();

/* ---------------------------------------
   2. CREAR SECCIONES Y CAMPOS
---------------------------------------- */

/* 🔹 Sección: Datos Generales */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_evolucion, 'Datos Generales', 'Información del paciente y detalles de la consulta');

SET @seccion_datos_generales := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_evolucion, @seccion_datos_generales, 'Fecha de Registro', 'DATE', 1),
  (@form_evolucion, @seccion_datos_generales, 'Hora de Registro', 'TIME', 1),
  (@form_evolucion, @seccion_datos_generales, 'Nombre del Paciente', 'TEXT', 1),
  (@form_evolucion, @seccion_datos_generales, 'Número de Historia Clínica', 'TEXT', 1),
  (@form_evolucion, @seccion_datos_generales, 'Edad', 'INT', 1),
  (@form_evolucion, @seccion_datos_generales, 'Sexo', 'ENUM', 1);

/* 🔹 Sección: Evolución Clínica */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_evolucion, 'Evolución Clínica', 'Descripción detallada de la evolución clínica del paciente');

SET @seccion_evolucion := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_evolucion, @seccion_evolucion, 'Fecha de Evolución', 'DATE', 1),
  (@form_evolucion, @seccion_evolucion, 'Hora de Evolución', 'TIME', 1),
  (@form_evolucion, @seccion_evolucion, 'Descripción de la Evolución', 'TEXT', 1),
  (@form_evolucion, @seccion_evolucion, 'Observaciones', 'TEXT', 0);

/* 🔹 Sección: Prescripciones Médicas */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_evolucion, 'Prescripciones Médicas', 'Registro de las prescripciones médicas indicadas al paciente');

SET @seccion_prescripciones := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_evolucion, @seccion_prescripciones, 'Fecha de Prescripción', 'DATE', 1),
  (@form_evolucion, @seccion_prescripciones, 'Hora de Prescripción', 'TIME', 1),
  (@form_evolucion, @seccion_prescripciones, 'Medicamento/Procedimiento', 'TEXT', 1),
  (@form_evolucion, @seccion_prescripciones, 'Dosis', 'TEXT', 1),
  (@form_evolucion, @seccion_prescripciones, 'Frecuencia', 'TEXT', 1),
  (@form_evolucion, @seccion_prescripciones, 'Duración', 'TEXT', 1),
  (@form_evolucion, @seccion_prescripciones, 'Vía de Administración', 'TEXT', 1),
  (@form_evolucion, @seccion_prescripciones, 'Observaciones', 'TEXT', 0);

/* 🔹 Sección: Firmas */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_evolucion, 'Firmas', 'Firmas de los profesionales responsables');

SET @seccion_firmas := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_evolucion, @seccion_firmas, 'Nombre del Profesional Responsable', 'TEXT', 1),
  (@form_evolucion, @seccion_firmas, 'Firma del Profesional Responsable', 'TEXT', 1),
  (@form_evolucion, @seccion_firmas, 'Número de Registro Profesional', 'TEXT', 1);

/* ---------------------------------------
   3. FINALIZAR TRANSACCIÓN Y RESTAURAR CLAVES
---------------------------------------- */
COMMIT;

SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

/* FIN DEL SCRIPT */



/* ===========================================================
   SCRIPT: CREACIÓN DEL FORMULARIO "EPICRISIS"
=========================================================== */

SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

/* ---------------------------------------
   1. CREAR EL TIPO DE FORMULARIO
---------------------------------------- */
INSERT INTO `formulario_tipo` (nombre, descripcion)
VALUES 
  ('Epicrisis', 'Formulario para el resumen clínico al alta del paciente');

-- Guardar el ID generado
SET @form_epicrisis := LAST_INSERT_ID();

/* ---------------------------------------
   2. CREAR SECCIONES Y CAMPOS
---------------------------------------- */

/* Sección: Datos Generales del Paciente */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_epicrisis, 'Datos Generales del Paciente', 'Información básica del paciente');

SET @seccion_datos_generales := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_epicrisis, @seccion_datos_generales, 'Nombre Completo', 'TEXT', 1),
  (@form_epicrisis, @seccion_datos_generales, 'Número de Historia Clínica', 'TEXT', 1),
  (@form_epicrisis, @seccion_datos_generales, 'Edad', 'INT', 1),
  (@form_epicrisis, @seccion_datos_generales, 'Sexo', 'ENUM', 1),
  (@form_epicrisis, @seccion_datos_generales, 'Número de Identificación', 'TEXT', 1),
  (@form_epicrisis, @seccion_datos_generales, 'Fecha de Ingreso', 'DATE', 1),
  (@form_epicrisis, @seccion_datos_generales, 'Hora de Ingreso', 'TIME', 1),
  (@form_epicrisis, @seccion_datos_generales, 'Fecha de Egreso', 'DATE', 1),
  (@form_epicrisis, @seccion_datos_generales, 'Hora de Egreso', 'TIME', 1),
  (@form_epicrisis, @seccion_datos_generales, 'Servicio de Egreso', 'TEXT', 1);

/* Sección: Diagnósticos */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_epicrisis, 'Diagnósticos', 'Diagnósticos al ingreso y al egreso');

SET @seccion_diagnosticos := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_epicrisis, @seccion_diagnosticos, 'Diagnóstico de Ingreso (CIE-10)', 'TEXT', 1),
  (@form_epicrisis, @seccion_diagnosticos, 'Diagnóstico de Egreso (CIE-10)', 'TEXT', 1),
  (@form_epicrisis, @seccion_diagnosticos, 'Diagnósticos Secundarios (CIE-10)', 'TEXT', 0);

/* Sección: Resumen de la Historia Clínica */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_epicrisis, 'Resumen de la Historia Clínica', 'Resumen de la evolución y tratamiento del paciente');

SET @seccion_resumen_historia := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_epicrisis, @seccion_resumen_historia, 'Motivo de Ingreso', 'TEXT', 1),
  (@form_epicrisis, @seccion_resumen_historia, 'Resumen de Evolución', 'TEXT', 1),
  (@form_epicrisis, @seccion_resumen_historia, 'Procedimientos Diagnósticos y Terapéuticos Realizados', 'TEXT', 1),
  (@form_epicrisis, @seccion_resumen_historia, 'Complicaciones', 'TEXT', 0),
  (@form_epicrisis, @seccion_resumen_historia, 'Condición al Egreso', 'TEXT', 1);

/* Sección: Indicaciones al Egreso */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_epicrisis, 'Indicaciones al Egreso', 'Recomendaciones y tratamiento post alta');

SET @seccion_indicaciones_egreso := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_epicrisis, @seccion_indicaciones_egreso, 'Tratamiento Farmacológico', 'TEXT', 1),
  (@form_epicrisis, @seccion_indicaciones_egreso, 'Tratamiento No Farmacológico', 'TEXT', 0),
  (@form_epicrisis, @seccion_indicaciones_egreso, 'Recomendaciones Generales', 'TEXT', 1),
  (@form_epicrisis, @seccion_indicaciones_egreso, 'Citas de Control', 'TEXT', 0);

/* Sección: Firmas */
INSERT INTO `seccion_formulario` (id_formulario_tipo, nombre_seccion, descripcion)
VALUES (@form_epicrisis, 'Firmas', 'Firmas de los profesionales responsables y del paciente');

SET @seccion_firmas := LAST_INSERT_ID();

INSERT INTO `campo_formulario` (id_formulario_tipo, id_seccion, nombre_campo, tipo_dato, requerido)
VALUES
  (@form_epicrisis, @seccion_firmas, 'Nombre del Profesional Responsable', 'TEXT', 1),
  (@form_epicrisis, @seccion_firmas, 'Firma del Profesional Responsable', 'TEXT', 1),
  (@form_epicrisis, @seccion_firmas, 'Número de Registro Profesional', 'TEXT', 1),
  (@form_epicrisis, @seccion_firmas, 'Firma del Paciente o Representante', 'TEXT', 1);

/* ---------------------------------------
   3. FINALIZAR TRANSACCIÓN Y RESTAURAR CLAVES
---------------------------------------- */
COMMIT;

SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

/* FIN DEL SCRIPT */