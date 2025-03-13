-- AlterTable
ALTER TABLE `document` MODIFY `documentPayNumber` INTEGER NULL,
    MODIFY `documentPayDate` DATETIME(3) NULL,
    MODIFY `documentAttribute` ENUM('LU', 'NON_LU', 'PAYE', 'IMPORTANT') NULL DEFAULT 'NON_LU';
