-- AlterTable
ALTER TABLE `document` ADD COLUMN `documentAvatar` VARCHAR(191) NULL,
    MODIFY `documentEditDate` DATETIME(3) NULL,
    MODIFY `documentAbout` VARCHAR(191) NULL,
    MODIFY `documentAddDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `documentEditBy` VARCHAR(191) NULL;
