/*
  Warnings:

  - You are about to drop the column `Themeid` on the `icone` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `icone` table. All the data in the column will be lost.
  - You are about to drop the column `iconeImage` on the `icone` table. All the data in the column will be lost.
  - You are about to drop the column `themeColor` on the `theme` table. All the data in the column will be lost.
  - You are about to drop the `_documenttotache` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_has_theme` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userMail]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userIdKey` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconeAvatar` to the `Icone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconeType` to the `Icone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tachePriority` to the `Tache` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_documenttotache` DROP FOREIGN KEY `_DocumentToTache_A_fkey`;

-- DropForeignKey
ALTER TABLE `_documenttotache` DROP FOREIGN KEY `_DocumentToTache_B_fkey`;

-- DropForeignKey
ALTER TABLE `document` DROP FOREIGN KEY `Document_categoryIdKey_fkey`;

-- DropForeignKey
ALTER TABLE `document` DROP FOREIGN KEY `Document_folderIdKey_fkey`;

-- DropForeignKey
ALTER TABLE `document` DROP FOREIGN KEY `Document_userIdKey_fkey`;

-- DropForeignKey
ALTER TABLE `folder` DROP FOREIGN KEY `Folder_userIdKey_fkey`;

-- DropForeignKey
ALTER TABLE `icone` DROP FOREIGN KEY `Icone_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `icone` DROP FOREIGN KEY `Icone_idIcone_fkey`;

-- DropForeignKey
ALTER TABLE `tache` DROP FOREIGN KEY `Tache_userId_fkey`;

-- DropForeignKey
ALTER TABLE `user_has_theme` DROP FOREIGN KEY `User_has_theme_themeId_fkey`;

-- DropForeignKey
ALTER TABLE `user_has_theme` DROP FOREIGN KEY `User_has_theme_userId_fkey`;

-- DropIndex
DROP INDEX `Document_categoryIdKey_key` ON `document`;

-- DropIndex
DROP INDEX `Document_folderIdKey_key` ON `document`;

-- DropIndex
DROP INDEX `Document_userIdKey_key` ON `document`;

-- DropIndex
DROP INDEX `Icone_categoryId_fkey` ON `icone`;

-- DropIndex
DROP INDEX `Tache_userId_key` ON `tache`;

-- AlterTable
ALTER TABLE `category` ADD COLUMN `userIdKey` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `document` ADD COLUMN `documentAvatar` VARCHAR(191) NULL,
    ADD COLUMN `documentEditBy` VARCHAR(191) NULL,
    MODIFY `documentEditDate` DATETIME(3) NULL,
    MODIFY `documentAbout` VARCHAR(191) NULL,
    MODIFY `documentAddDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `documentPayNumber` INTEGER NULL,
    MODIFY `documentPayDate` DATETIME(3) NULL,
    MODIFY `documentAttribute` ENUM('LU', 'NON_LU', 'PAYE', 'IMPORTANT') NULL DEFAULT 'NON_LU',
    MODIFY `folderIdKey` INTEGER NULL;

-- AlterTable
ALTER TABLE `icone` DROP COLUMN `Themeid`,
    DROP COLUMN `categoryId`,
    DROP COLUMN `iconeImage`,
    ADD COLUMN `categoryIdKey` INTEGER NULL,
    ADD COLUMN `documentIdKey` INTEGER NULL,
    ADD COLUMN `iconeAvatar` VARCHAR(191) NOT NULL,
    ADD COLUMN `iconeAvatarPath` VARCHAR(191) NOT NULL DEFAULT 'default.png',
    ADD COLUMN `iconeType` ENUM('CATEGORY', 'DOCUMENT', 'MENU', 'META') NOT NULL,
    ADD COLUMN `themeIdKey` INTEGER NULL;

-- AlterTable
ALTER TABLE `tache` ADD COLUMN `tachePriority` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `theme` DROP COLUMN `themeColor`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `themeIdKey` INTEGER NOT NULL DEFAULT 3,
    ADD COLUMN `userAvatar` VARCHAR(191) NULL,
    ADD COLUMN `userAvatarPath` VARCHAR(191) NULL,
    MODIFY `userRole` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `_documenttotache`;

-- DropTable
DROP TABLE `user_has_theme`;

-- CreateTable
CREATE TABLE `_TachesToDocuments` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TachesToDocuments_AB_unique`(`A`, `B`),
    INDEX `_TachesToDocuments_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_userMail_key` ON `User`(`userMail`);

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_userIdKey_fkey` FOREIGN KEY (`userIdKey`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_userIdKey_fkey` FOREIGN KEY (`userIdKey`) REFERENCES `User`(`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_folderIdKey_fkey` FOREIGN KEY (`folderIdKey`) REFERENCES `Folder`(`idFolder`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_categoryIdKey_fkey` FOREIGN KEY (`categoryIdKey`) REFERENCES `Category`(`idCategory`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Folder` ADD CONSTRAINT `Folder_userIdKey_fkey` FOREIGN KEY (`userIdKey`) REFERENCES `User`(`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Icone` ADD CONSTRAINT `Icone_categoryIdKey_fkey` FOREIGN KEY (`categoryIdKey`) REFERENCES `Category`(`idCategory`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Icone` ADD CONSTRAINT `Icone_themeIdKey_fkey` FOREIGN KEY (`themeIdKey`) REFERENCES `Theme`(`idTheme`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Icone` ADD CONSTRAINT `Icone_documentIdKey_fkey` FOREIGN KEY (`documentIdKey`) REFERENCES `Document`(`idDocument`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tache` ADD CONSTRAINT `Tache_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_themeIdKey_fkey` FOREIGN KEY (`themeIdKey`) REFERENCES `Theme`(`idTheme`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TachesToDocuments` ADD CONSTRAINT `_TachesToDocuments_A_fkey` FOREIGN KEY (`A`) REFERENCES `Document`(`idDocument`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TachesToDocuments` ADD CONSTRAINT `_TachesToDocuments_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tache`(`idTache`) ON DELETE CASCADE ON UPDATE CASCADE;
