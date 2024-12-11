/*
  Warnings:

  - You are about to drop the column `Token` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cedula]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tokenId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `token` DROP FOREIGN KEY `Token_UserId_fkey`;

-- AlterTable
ALTER TABLE `token` DROP COLUMN `Token`,
    DROP COLUMN `UserId`,
    ADD COLUMN `token` VARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `tokenId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_cedula_key` ON `User`(`cedula`);

-- CreateIndex
CREATE UNIQUE INDEX `User_tokenId_key` ON `User`(`tokenId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_tokenId_fkey` FOREIGN KEY (`tokenId`) REFERENCES `Token`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
