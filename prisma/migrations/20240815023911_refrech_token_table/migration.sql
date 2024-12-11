/*
  Warnings:

  - Added the required column `RefrechToken` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `token` ADD COLUMN `RefrechToken` VARCHAR(1000) NOT NULL;
