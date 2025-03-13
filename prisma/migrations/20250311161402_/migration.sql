/*
  Warnings:

  - Added the required column `tachePriority` to the `Tache` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `document` DROP FOREIGN KEY `Document_categoryIdKey_fkey`;

-- DropForeignKey
ALTER TABLE `document` DROP FOREIGN KEY `Document_userIdKey_fkey`;

-- DropForeignKey
ALTER TABLE `folder` DROP FOREIGN KEY `Folder_userIdKey_fkey`;

-- DropForeignKey
ALTER TABLE `tache` DROP FOREIGN KEY `Tache_userId_fkey`;

-- AlterTable
ALTER TABLE `tache` ADD COLUMN `tachePriority` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_userIdKey_fkey` FOREIGN KEY (`userIdKey`) REFERENCES `User`(`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_categoryIdKey_fkey` FOREIGN KEY (`categoryIdKey`) REFERENCES `Category`(`idCategory`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Folder` ADD CONSTRAINT `Folder_userIdKey_fkey` FOREIGN KEY (`userIdKey`) REFERENCES `User`(`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tache` ADD CONSTRAINT `Tache_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;
