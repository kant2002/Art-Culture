-- DropIndex
DROP INDEX `Exhibition_createdById_fkey` ON `exhibition`;

-- DropIndex
DROP INDEX `ExhibitionArtist_artistId_fkey` ON `exhibitionartist`;

-- DropIndex
DROP INDEX `ExhibitionImage_exhibitionId_fkey` ON `exhibitionimage`;

-- DropIndex
DROP INDEX `Post_author_id_fkey` ON `post`;

-- DropIndex
DROP INDEX `Product_authorId_fkey` ON `product`;

-- DropIndex
DROP INDEX `ProductImage_productId_fkey` ON `productimage`;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `ProductImage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exhibition` ADD CONSTRAINT `Exhibition_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExhibitionImage` ADD CONSTRAINT `ExhibitionImage_exhibitionId_fkey` FOREIGN KEY (`exhibitionId`) REFERENCES `Exhibition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExhibitionArtist` ADD CONSTRAINT `ExhibitionArtist_exhibitionId_fkey` FOREIGN KEY (`exhibitionId`) REFERENCES `Exhibition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExhibitionArtist` ADD CONSTRAINT `ExhibitionArtist_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `user_email_key`;
