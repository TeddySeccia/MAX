/*
  Warnings:

  - You are about to drop the column `theme` on the `icone` table. All the data in the column will be lost.
  - Added the required column `themeIdKey` to the `Icone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `icone` DROP COLUMN `theme`,
    ADD COLUMN `themeIdKey` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Icone` ADD CONSTRAINT `Icone_themeIdKey_fkey` FOREIGN KEY (`themeIdKey`) REFERENCES `Theme`(`idTheme`) ON DELETE RESTRICT ON UPDATE CASCADE;
