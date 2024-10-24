/*
  Warnings:

  - You are about to drop the column `title` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `title`,
    ADD COLUMN `title_en` VARCHAR(191) NULL,
    ADD COLUMN `title_uk` VARCHAR(191) NULL;
