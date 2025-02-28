/*
  Warnings:

  - You are about to drop the column `FechaCreacion` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `FechaExpiracion` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `RefrechToken` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `token` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `token` DROP COLUMN `FechaCreacion`,
    DROP COLUMN `FechaExpiracion`,
    DROP COLUMN `RefrechToken`,
    DROP COLUMN `token`;
