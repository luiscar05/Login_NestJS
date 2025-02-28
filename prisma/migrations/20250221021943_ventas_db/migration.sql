/*
  Warnings:

  - Made the column `cedula` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contrasena` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `token` ADD COLUMN `SesionInicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user` MODIFY `cedula` INTEGER NOT NULL,
    MODIFY `contrasena` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Grupo` (
    `id_Grupo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`id_Grupo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Productos` (
    `id_Producto` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `precio` DOUBLE NOT NULL,
    `stock` INTEGER NOT NULL,

    PRIMARY KEY (`id_Producto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ventas` (
    `id_ventas` INTEGER NOT NULL AUTO_INCREMENT,
    `id_grupo` INTEGER NOT NULL,
    `fecha_venta` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `total` DOUBLE NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'Pendiente',

    PRIMARY KEY (`id_ventas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detalle_Venta` (
    `id_detalle` INTEGER NOT NULL AUTO_INCREMENT,
    `id_venta` INTEGER NOT NULL,
    `id_producto` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `subtotal` DOUBLE NOT NULL,

    PRIMARY KEY (`id_detalle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Deudas` (
    `id_deuda` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente` INTEGER NOT NULL,
    `Ventas_id` INTEGER NOT NULL,
    `monto_total` DOUBLE NOT NULL,
    `monto_pendiente` DOUBLE NOT NULL,
    `fecha_deuda` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_deuda`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pago` (
    `id_pago` INTEGER NOT NULL AUTO_INCREMENT,
    `Deuda_id` INTEGER NOT NULL,
    `monto_pagado` DOUBLE NOT NULL,
    `fecha_pago` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_pago`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Grupo` ADD CONSTRAINT `Grupo_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ventas` ADD CONSTRAINT `Ventas_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `Grupo`(`id_Grupo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detalle_Venta` ADD CONSTRAINT `Detalle_Venta_id_venta_fkey` FOREIGN KEY (`id_venta`) REFERENCES `Ventas`(`id_ventas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detalle_Venta` ADD CONSTRAINT `Detalle_Venta_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `Productos`(`id_Producto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deudas` ADD CONSTRAINT `Deudas_Ventas_id_fkey` FOREIGN KEY (`Ventas_id`) REFERENCES `Ventas`(`id_ventas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deudas` ADD CONSTRAINT `Deudas_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `Grupo`(`id_Grupo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pago` ADD CONSTRAINT `pago_Deuda_id_fkey` FOREIGN KEY (`Deuda_id`) REFERENCES `Deudas`(`id_deuda`) ON DELETE RESTRICT ON UPDATE CASCADE;
