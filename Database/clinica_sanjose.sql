-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema clinica_san_jose
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema clinica_san_jose
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `clinica_san_jose` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci ;
USE `clinica_san_jose` ;

-- -----------------------------------------------------
-- Table `clinica_san_jose`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_san_jose`.`rol` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `nombre_rol` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_rol`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_san_jose`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_san_jose`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(50) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `contraseña` VARCHAR(255) NOT NULL,
  `fecha_registro` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ultimo_login` DATETIME NULL,
  `activo` TINYINT(1) NOT NULL DEFAULT 1,
  `estado` ENUM('activo', 'inactivo') NOT NULL DEFAULT 'activo',
  `id_rol` INT NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `uk_usuario_email` (`correo` ASC) VISIBLE,
  INDEX `fk_usuario_rol_idx` (`id_rol` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_rol`
    FOREIGN KEY (`id_rol`)
    REFERENCES `clinica_san_jose`.`rol` (`id_rol`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_san_jose`.`usuario_informacion_personal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_san_jose`.`usuario_informacion_personal` (
  `id_informacion_personal` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `cedula` VARCHAR(10) NOT NULL,
  `nombres` VARCHAR(100) NOT NULL,
  `apellidos` VARCHAR(100) NOT NULL,
  `fecha_nacimiento` DATE NULL,
  `genero` ENUM('M', 'F', 'O') NULL,
  `estado_civil` ENUM('SOLTERO', 'CASADO', 'DIVORCIADO', 'VIUDO', 'OTRO') NULL,
  PRIMARY KEY (`id_informacion_personal`),
  INDEX `fk_informacion_personal_usuario_idx` (`id_usuario` ASC) VISIBLE,
  UNIQUE INDEX `id_usuario_UNIQUE` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_informacion_personal_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `clinica_san_jose`.`usuario` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_san_jose`.`usuario_informacion_academica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_san_jose`.`usuario_informacion_academica` (
  `id_informacion_academica` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `institucion` VARCHAR(100) NOT NULL,
  `titulo` VARCHAR(100) NOT NULL,
  `anio_graduacion` YEAR NOT NULL,
  `especialidad` VARCHAR(100) NULL,
  `registro_senescyt` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_informacion_academica`),
  INDEX `fk_informacion_academica_usuario_idx` (`id_usuario` ASC) VISIBLE,
  UNIQUE INDEX `id_usuario_UNIQUE` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_informacion_academica_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `clinica_san_jose`.`usuario` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_san_jose`.`usuario_informacion_contacto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_san_jose`.`usuario_informacion_contacto` (
  `id_informacion_contacto` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `provincia` VARCHAR(45) NOT NULL,
  `ciudad` VARCHAR(45) NOT NULL,
  `calle_principal` VARCHAR(45) NOT NULL,
  `calle_secundaria` VARCHAR(45) NOT NULL,
  `celular` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id_informacion_contacto`),
  INDEX `fk_informacion_contacto_usuario_idx` (`id_usuario` ASC) VISIBLE,
  UNIQUE INDEX `id_usuario_UNIQUE` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_informacion_contacto_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `clinica_san_jose`.`usuario` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_san_jose`.`firma_electronica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_san_jose`.`firma_electronica` (
  `id_firma_electronica` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `firma_base64` TEXT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_firma_electronica`),
  INDEX `fk_firma_electronica_usuario_idx` (`id_usuario` ASC) VISIBLE,
  UNIQUE INDEX `id_usuario_UNIQUE` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_firma_electronica_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `clinica_san_jose`.`usuario` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_san_jose`.`paciente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_san_jose`.`paciente` (
  `nro_identificacion` VARCHAR(45) NOT NULL,
  `tipo_identificacion` ENUM('cedula', 'pasaporte') NOT NULL,
  `primer_nombre` VARCHAR(45) NOT NULL,
  `segundo_nombre` VARCHAR(45) NOT NULL,
  `primer_apellido` VARCHAR(45) NOT NULL,
  `segundo_apellido` VARCHAR(45) NOT NULL,
  `genero` ENUM('M', 'F', 'O') NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  PRIMARY KEY (`nro_identificacion`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_san_jose`.`archivo_clinico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_san_jose`.`archivo_clinico` (
  `nro_archivo` INT NOT NULL AUTO_INCREMENT,
  `nro_identificacion` VARCHAR(45) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`nro_archivo`),
  INDEX `fk_archivo_paciente_idx` (`nro_identificacion` ASC) VISIBLE,
  UNIQUE INDEX `nro_identificacion_UNIQUE` (`nro_identificacion` ASC) VISIBLE,
  CONSTRAINT `fk_archivo_paciente`
    FOREIGN KEY (`nro_identificacion`)
    REFERENCES `clinica_san_jose`.`paciente` (`nro_identificacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_san_jose`.`formulario_tipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_san_jose`.`formulario_tipo` (
  `id_formulario_tipo` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT NULL,
  PRIMARY KEY (`id_formulario_tipo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_san_jose`.`seccion_formulario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_san_jose`.`seccion_formulario` (
  `id_seccion` INT NOT NULL AUTO_INCREMENT,
  `id_formulario_tipo` INT NOT NULL,
  `nombre_seccion` VARCHAR(255) NOT NULL,
  `descripcion` TEXT NULL,
  PRIMARY KEY (`id_seccion`),
  INDEX `fk_seccion_formulario_tipo_idx` (`id_formulario_tipo` ASC) VISIBLE,
  CONSTRAINT `fk_seccion_formulario_tipo`
    FOREIGN KEY (`id_formulario_tipo`)
    REFERENCES `clinica_san_jose`.`formulario_tipo` (`id_formulario_tipo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_san_jose`.`campo_formulario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_san_jose`.`campo_formulario` (
  `id_campo` INT NOT NULL AUTO_INCREMENT,
  `id_formulario_tipo` INT NOT NULL,
  `id_seccion` INT NOT NULL,
  `nombre_campo` VARCHAR(255) NOT NULL,
  `tipo_dato` ENUM('TEXT', 'NUMBER', 'DATE', 'BOOLEAN', 'ENUM', 'FLOAT') NOT NULL,
  `requerido` TINYINT(1) NOT NULL DEFAULT 0,
  `opciones` TEXT NULL,
  PRIMARY KEY (`id_campo`),
  INDEX `fk_campo_formulario_tipo_idx` (`id_formulario_tipo` ASC) VISIBLE,
  INDEX `fk_campo_formulario_seccion_idx` (`id_seccion` ASC) VISIBLE,
  CONSTRAINT `fk_campo_formulario_tipo`
    FOREIGN KEY (`id_formulario_tipo`)
    REFERENCES `clinica_san_jose`.`formulario_tipo` (`id_formulario_tipo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_campo_formulario_seccion`
    FOREIGN KEY (`id_seccion`)
    REFERENCES `clinica_san_jose`.`seccion_formulario` (`id_seccion`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_san_jose`.`formulario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_san_jose`.`formulario` (
  `id_formulario` INT NOT NULL AUTO_INCREMENT,
  `id_formulario_tipo` INT NOT NULL,
  `nro_archivo` INT NOT NULL,
  `id_usuario_creador` INT NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` ENUM('BORRADOR', 'COMPLETADO', 'EDITADO') NOT NULL DEFAULT 'BORRADOR',
  PRIMARY KEY (`id_formulario`),
  INDEX `fk_formulario_tipo_idx` (`id_formulario_tipo` ASC) VISIBLE,
  INDEX `fk_formulario_archivo_idx` (`nro_archivo` ASC) VISIBLE,
  INDEX `fk_formulario_usuario_idx` (`id_usuario_creador` ASC) VISIBLE,
  CONSTRAINT `fk_formulario_tipo`
    FOREIGN KEY (`id_formulario_tipo`)
    REFERENCES `clinica_san_jose`.`formulario_tipo` (`id_formulario_tipo`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_formulario_archivo`
    FOREIGN KEY (`nro_archivo`)
    REFERENCES `clinica_san_jose`.`archivo_clinico` (`nro_archivo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_formulario_usuario`
    FOREIGN KEY (`id_usuario_creador`)
    REFERENCES `clinica_san_jose`.`usuario` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_san_jose`.`respuesta_formulario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_san_jose`.`respuesta_formulario` (
  `id_respuesta` INT NOT NULL AUTO_INCREMENT,
  `id_formulario` INT NOT NULL,
  `id_campo` INT NOT NULL,
  `valor` TEXT NULL,
  PRIMARY KEY (`id_respuesta`),
  INDEX `fk_respuesta_formulario_idx` (`id_formulario` ASC) INVISIBLE,
  INDEX `fk_respuesta_campo_formulario_idx` (`id_campo` ASC) VISIBLE,
  UNIQUE INDEX `uq_respuesta_formulario_campo` (`id_formulario` ASC, `id_campo` ASC) VISIBLE,
  CONSTRAINT `fk_respuesta_formulario`
    FOREIGN KEY (`id_formulario`)
    REFERENCES `clinica_san_jose`.`formulario` (`id_formulario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_respuesta_campo_formulario`
    FOREIGN KEY (`id_campo`)
    REFERENCES `clinica_san_jose`.`campo_formulario` (`id_campo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_san_jose`.`formulario_cambios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_san_jose`.`formulario_cambios` (
  `id_cambio` INT NOT NULL AUTO_INCREMENT,
  `id_formulario` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  `motivo` TEXT NOT NULL,
  `fecha_cambio` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_cambio`),
  INDEX `fk_cambio_formulario_idx` (`id_formulario` ASC) VISIBLE,
  INDEX `fk_cambio_usuario_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_cambio_formulario`
    FOREIGN KEY (`id_formulario`)
    REFERENCES `clinica_san_jose`.`formulario` (`id_formulario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_cambio_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `clinica_san_jose`.`usuario` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clinica_san_jose`.`formulario_cambios_detalles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinica_san_jose`.`formulario_cambios_detalles` (
  `id_cambio_detalle` INT NOT NULL AUTO_INCREMENT,
  `id_cambio` INT NOT NULL,
  `id_campo` INT NOT NULL,
  `valor_anterior` TEXT NULL,
  `valor_nuevo` TEXT NULL,
  PRIMARY KEY (`id_cambio_detalle`),
  INDEX `fk_cambio_detalle_cambio_idx` (`id_cambio` ASC) VISIBLE,
  INDEX `fk_cambio_detalle_campo_idx` (`id_campo` ASC) VISIBLE,
  CONSTRAINT `fk_cambio_detalle_cambio`
    FOREIGN KEY (`id_cambio`)
    REFERENCES `clinica_san_jose`.`formulario_cambios` (`id_cambio`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_cambio_detalle_campo`
    FOREIGN KEY (`id_campo`)
    REFERENCES `clinica_san_jose`.`campo_formulario` (`id_campo`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
