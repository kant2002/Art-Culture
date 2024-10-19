/*
  Warnings:

  - You are about to drop the `artist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `exhibitionartist` DROP FOREIGN KEY `ExhibitionArtist_artistId_fkey`;

-- AlterTable
ALTER TABLE `exhibition` MODIFY `time` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `artist`;

-- AddForeignKey
ALTER TABLE `ExhibitionArtist` ADD CONSTRAINT `ExhibitionArtist_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
