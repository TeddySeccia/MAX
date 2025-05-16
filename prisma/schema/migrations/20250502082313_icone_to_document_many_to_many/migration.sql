/*
  Warnings:

  - You are about to drop the column `documentIdKey` on the `icone` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `icone` DROP FOREIGN KEY `Icone_documentIdKey_fkey`;

-- DropIndex
DROP INDEX `Icone_documentIdKey_fkey` ON `icone`;

-- AlterTable
ALTER TABLE `icone` DROP COLUMN `documentIdKey`;

-- AlterTable
ALTER TABLE `user` MODIFY `themeIdKey` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `_IconesToDocuments` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_IconesToDocuments_AB_unique`(`A`, `B`),
    INDEX `_IconesToDocuments_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_IconesToDocuments` ADD CONSTRAINT `_IconesToDocuments_A_fkey` FOREIGN KEY (`A`) REFERENCES `Document`(`idDocument`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IconesToDocuments` ADD CONSTRAINT `_IconesToDocuments_B_fkey` FOREIGN KEY (`B`) REFERENCES `Icone`(`idIcone`) ON DELETE CASCADE ON UPDATE CASCADE;
