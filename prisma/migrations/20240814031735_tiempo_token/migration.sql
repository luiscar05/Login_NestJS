/*
  Warnings:

  - You are about to drop the column `tokenId` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[UserId]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `FechaCreacion` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FechaExpiracion` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserId` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_tokenId_fkey`;

-- AlterTable
ALTER TABLE `token` ADD COLUMN `FechaCreacion` DATETIME(3) NOT NULL,
    ADD COLUMN `FechaExpiracion` DATETIME(3) NOT NULL,
    ADD COLUMN `UserId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `tokenId`;

-- CreateIndex
CREATE UNIQUE INDEX `Token_UserId_key` ON `Token`(`UserId`);

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
