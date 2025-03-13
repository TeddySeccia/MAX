/*
  Warnings:

  - You are about to drop the column `Themeid` on the `icone` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `icone` table. All the data in the column will be lost.
  - You are about to drop the column `iconeImage` on the `icone` table. All the data in the column will be lost.
  - You are about to drop the column `themeColor` on the `theme` table. All the data in the column will be lost.
  - Added the required column `iconeAvatar` to the `Icone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `themeIdKey` to the `Icone` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `icone` DROP FOREIGN KEY `Icone_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `icone` DROP FOREIGN KEY `Icone_idIcone_fkey`;

-- DropIndex
DROP INDEX `Icone_categoryId_fkey` ON `icone`;

-- AlterTable
ALTER TABLE `icone` DROP COLUMN `Themeid`,
    DROP COLUMN `categoryId`,
    DROP COLUMN `iconeImage`,
    ADD COLUMN `categoryIdKey` INTEGER NULL,
    ADD COLUMN `iconeAvatar` VARCHAR(191) NOT NULL,
    ADD COLUMN `themeIdKey` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `theme` DROP COLUMN `themeColor`;

-- AddForeignKey
ALTER TABLE `Icone` ADD CONSTRAINT `Icone_categoryIdKey_fkey` FOREIGN KEY (`categoryIdKey`) REFERENCES `Category`(`idCategory`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Icone` ADD CONSTRAINT `Icone_themeIdKey_fkey` FOREIGN KEY (`themeIdKey`) REFERENCES `Theme`(`idTheme`) ON DELETE RESTRICT ON UPDATE CASCADE;
