/*
  Warnings:

  - Added the required column `iconeType` to the `Icone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `icone` ADD COLUMN `iconeType` ENUM('CATEGORY', 'DOCUMENT', 'MENU') NOT NULL;
