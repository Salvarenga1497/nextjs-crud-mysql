CREATE TABLE `productos` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR (250) NOT NULL,
  `descripcion` VARCHAR (250) NOT NULL,
  `precio` DECIMAL (10, 2),
  `creado` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = INNODB CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

ALTER TABLE `test`.`productos`   
	ADD COLUMN `img` VARCHAR(200) NULL AFTER `descripcion`;