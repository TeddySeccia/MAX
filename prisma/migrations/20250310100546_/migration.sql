/*
  Warnings:

  - You are about to drop the column `themeIdKey` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_themeIdKey_fkey`;

-- DropIndex
DROP INDEX `User_themeIdKey_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `themeIdKey`;
