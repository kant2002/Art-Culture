/*
  Warnings:

  - You are about to drop the column `content` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `exhibition` DROP FOREIGN KEY `Exhibition_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `exhibitionartist` DROP FOREIGN KEY `ExhibitionArtist_artistId_fkey`;

-- DropForeignKey
ALTER TABLE `exhibitionartist` DROP FOREIGN KEY `ExhibitionArtist_exhibitionId_fkey`;

-- DropForeignKey
ALTER TABLE `exhibitionimage` DROP FOREIGN KEY `ExhibitionImage_exhibitionId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `productimage` DROP FOREIGN KEY `ProductImage_productId_fkey`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `content`,
    DROP COLUMN `title`,
    ADD COLUMN `content_en` VARCHAR(191) NULL,
    ADD COLUMN `content_uk` VARCHAR(191) NULL,
    ADD COLUMN `title_en` VARCHAR(191) NULL,
    ADD COLUMN `title_uk` VARCHAR(191) NULL;
