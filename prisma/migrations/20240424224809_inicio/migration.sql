-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `cedula` BIGINT NULL,
    `contrasena` VARCHAR(191) NULL,
    `rol` VARCHAR(191) NOT NULL DEFAULT 'User',

    UNIQUE INDEX `User_contrasena_key`(`contrasena`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
