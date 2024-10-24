/*
  Warnings:

  - You are about to drop the column `title_en` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `title_uk` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `title_en`,
    DROP COLUMN `title_uk`,
    ADD COLUMN `title` VARCHAR(191) NULL;
