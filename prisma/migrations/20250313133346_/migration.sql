/*
  Warnings:

  - You are about to drop the column `iconePath` on the `icone` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `icone` DROP COLUMN `iconePath`,
    ADD COLUMN `iconeAvatarPath` VARCHAR(191) NOT NULL DEFAULT 'default.png';
