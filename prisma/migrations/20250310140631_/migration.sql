/*
  Warnings:

  - You are about to drop the column `themeIdKey` on the `icone` table. All the data in the column will be lost.
  - Added the required column `theme` to the `Icone` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `icone` DROP FOREIGN KEY `Icone_themeIdKey_fkey`;

-- DropIndex
DROP INDEX `Icone_themeIdKey_fkey` ON `icone`;

-- AlterTable
ALTER TABLE `icone` DROP COLUMN `themeIdKey`,
    ADD COLUMN `theme` VARCHAR(191) NOT NULL;
