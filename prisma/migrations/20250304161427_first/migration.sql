-- CreateTable
CREATE TABLE `Category` (
    `idCategory` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(191) NOT NULL,
    `categoryParent` INTEGER NULL,

    PRIMARY KEY (`idCategory`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Document` (
    `idDocument` INTEGER NOT NULL AUTO_INCREMENT,
    `documentPath` VARCHAR(191) NOT NULL,
    `documentName` VARCHAR(191) NOT NULL,
    `documentType` VARCHAR(191) NOT NULL,
    `documentEditDate` DATETIME(3) NOT NULL,
    `documentAbout` VARCHAR(191) NOT NULL,
    `documentAddDate` DATETIME(3) NOT NULL,
    `documentSize` INTEGER NOT NULL,
    `documentExtension` VARCHAR(191) NOT NULL,
    `documentPayNumber` INTEGER NOT NULL,
    `documentPayDate` DATETIME(3) NOT NULL,
    `documentAttribute` ENUM('LU', 'NON_LU', 'PAYE', 'IMPORTANT') NULL,
    `userIdKey` INTEGER NOT NULL,
    `folderIdKey` INTEGER NOT NULL,
    `categoryIdKey` INTEGER NOT NULL,

    UNIQUE INDEX `Document_userIdKey_key`(`userIdKey`),
    UNIQUE INDEX `Document_folderIdKey_key`(`folderIdKey`),
    UNIQUE INDEX `Document_categoryIdKey_key`(`categoryIdKey`),
    PRIMARY KEY (`idDocument`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Folder` (
    `idFolder` INTEGER NOT NULL AUTO_INCREMENT,
    `folderName` VARCHAR(191) NOT NULL,
    `userIdKey` INTEGER NOT NULL,

    UNIQUE INDEX `Folder_userIdKey_key`(`userIdKey`),
    PRIMARY KEY (`idFolder`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Icone` (
    `idIcone` INTEGER NOT NULL AUTO_INCREMENT,
    `iconeName` VARCHAR(191) NOT NULL,
    `iconeColor` VARCHAR(191) NOT NULL,
    `iconeImage` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NULL,
    `Themeid` INTEGER NOT NULL,

    PRIMARY KEY (`idIcone`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tache_has_document` (
    `idTache_has_document` INTEGER NOT NULL AUTO_INCREMENT,
    `tacheId` INTEGER NOT NULL,
    `documentId` INTEGER NOT NULL,

    UNIQUE INDEX `Tache_has_document_tacheId_key`(`tacheId`),
    UNIQUE INDEX `Tache_has_document_documentId_key`(`documentId`),
    PRIMARY KEY (`idTache_has_document`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tache` (
    `idTache` INTEGER NOT NULL AUTO_INCREMENT,
    `tacheName` VARCHAR(191) NOT NULL,
    `tacheDescription` VARCHAR(191) NOT NULL,
    `tacheStart` DATETIME(3) NOT NULL,
    `tacheEnd` DATETIME(3) NOT NULL,
    `tacheStatus` VARCHAR(191) NOT NULL,
    `tacheAttribute` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Tache_userId_key`(`userId`),
    PRIMARY KEY (`idTache`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Theme` (
    `idTheme` INTEGER NOT NULL AUTO_INCREMENT,
    `themeName` VARCHAR(191) NOT NULL,
    `themeColor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idTheme`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `idUser` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL,
    `userFName` VARCHAR(191) NOT NULL,
    `userMail` VARCHAR(191) NOT NULL,
    `userPassword` VARCHAR(191) NOT NULL,
    `userBirthDate` DATETIME(3) NULL,
    `userAdress` VARCHAR(191) NULL,
    `userTel` INTEGER NULL,
    `userRole` ENUM('ADMIN', 'USER') NOT NULL,
    `userSex` ENUM('HOMME', 'FEMME', 'AUTRE') NULL,

    PRIMARY KEY (`idUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_has_theme` (
    `idUser_has_theme` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `themeId` INTEGER NOT NULL,

    UNIQUE INDEX `User_has_theme_userId_key`(`userId`),
    UNIQUE INDEX `User_has_theme_themeId_key`(`themeId`),
    PRIMARY KEY (`idUser_has_theme`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_userIdKey_fkey` FOREIGN KEY (`userIdKey`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_folderIdKey_fkey` FOREIGN KEY (`folderIdKey`) REFERENCES `Folder`(`idFolder`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_categoryIdKey_fkey` FOREIGN KEY (`categoryIdKey`) REFERENCES `Category`(`idCategory`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Folder` ADD CONSTRAINT `Folder_userIdKey_fkey` FOREIGN KEY (`userIdKey`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Icone` ADD CONSTRAINT `Icone_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`idCategory`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Icone` ADD CONSTRAINT `Icone_idIcone_fkey` FOREIGN KEY (`idIcone`) REFERENCES `Theme`(`idTheme`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tache_has_document` ADD CONSTRAINT `Tache_has_document_tacheId_fkey` FOREIGN KEY (`tacheId`) REFERENCES `Tache`(`idTache`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tache_has_document` ADD CONSTRAINT `Tache_has_document_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `Document`(`idDocument`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tache` ADD CONSTRAINT `Tache_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_has_theme` ADD CONSTRAINT `User_has_theme_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_has_theme` ADD CONSTRAINT `User_has_theme_themeId_fkey` FOREIGN KEY (`themeId`) REFERENCES `Theme`(`idTheme`) ON DELETE RESTRICT ON UPDATE CASCADE;
