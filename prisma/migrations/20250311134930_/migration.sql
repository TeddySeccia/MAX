-- DropForeignKey
ALTER TABLE `icone` DROP FOREIGN KEY `Icone_themeIdKey_fkey`;

-- DropIndex
DROP INDEX `Icone_themeIdKey_fkey` ON `icone`;

-- AlterTable
ALTER TABLE `icone` MODIFY `themeIdKey` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Icone` ADD CONSTRAINT `Icone_themeIdKey_fkey` FOREIGN KEY (`themeIdKey`) REFERENCES `Theme`(`idTheme`) ON DELETE SET NULL ON UPDATE CASCADE;
