-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('USER', 'ADMIN', 'MUSEUM', 'CREATOR', 'EDITOR') NOT NULL DEFAULT 'USER';