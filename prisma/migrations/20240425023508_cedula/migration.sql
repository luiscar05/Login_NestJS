/*
  Warnings:

  - You are about to alter the column `cedula` on the `user` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `cedula` INTEGER NULL;
