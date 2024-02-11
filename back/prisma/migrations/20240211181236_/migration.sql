/*
  Warnings:

  - Made the column `conversation_id` on table `message` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_conversation_id_fkey`;

-- AlterTable
ALTER TABLE `message` MODIFY `conversation_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_conversation_id_fkey` FOREIGN KEY (`conversation_id`) REFERENCES `Conversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
