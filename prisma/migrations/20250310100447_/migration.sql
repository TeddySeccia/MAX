/*
  Warnings:

  - You are about to drop the `user_has_theme` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `document` DROP FOREIGN KEY `Document_folderIdKey_fkey`;

-- DropForeignKey
ALTER TABLE `user_has_theme` DROP FOREIGN KEY `User_has_theme_themeId_fkey`;

-- DropForeignKey
ALTER TABLE `user_has_theme` DROP FOREIGN KEY `User_has_theme_userId_fkey`;

-- AlterTable
ALTER TABLE `document` MODIFY `folderIdKey` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `themeIdKey` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `user_has_theme`;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_folderIdKey_fkey` FOREIGN KEY (`folderIdKey`) REFERENCES `Folder`(`idFolder`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_themeIdKey_fkey` FOREIGN KEY (`themeIdKey`) REFERENCES `Theme`(`idTheme`) ON DELETE RESTRICT ON UPDATE CASCADE;
