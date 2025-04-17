/*
  Warnings:

  - You are about to drop the `tache_has_document` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tache_has_document` DROP FOREIGN KEY `Tache_has_document_documentId_fkey`;

-- DropForeignKey
ALTER TABLE `tache_has_document` DROP FOREIGN KEY `Tache_has_document_tacheId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `userTel` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `tache_has_document`;

-- CreateTable
CREATE TABLE `_DocumentToTache` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DocumentToTache_AB_unique`(`A`, `B`),
    INDEX `_DocumentToTache_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_DocumentToTache` ADD CONSTRAINT `_DocumentToTache_A_fkey` FOREIGN KEY (`A`) REFERENCES `Document`(`idDocument`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DocumentToTache` ADD CONSTRAINT `_DocumentToTache_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tache`(`idTache`) ON DELETE CASCADE ON UPDATE CASCADE;
