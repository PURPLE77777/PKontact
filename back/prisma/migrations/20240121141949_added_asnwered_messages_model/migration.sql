/*
  Warnings:

  - You are about to drop the column `answered_message_id` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `message` table. All the data in the column will be lost.
  - The primary key for the `profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[message_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[conversation_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `conversation_id` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message_id` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `conversationsmoderators` DROP FOREIGN KEY `ConversationsModerators_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `conversationsonprofiles` DROP FOREIGN KEY `ConversationsOnProfiles_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_conversation_id_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `seenmessagesonprofiles` DROP FOREIGN KEY `SeenMessagesOnProfiles_profile_id_fkey`;

-- AlterTable
ALTER TABLE `message` DROP COLUMN `answered_message_id`,
    DROP COLUMN `ownerId`;

-- AlterTable
ALTER TABLE `profile` DROP PRIMARY KEY,
    DROP COLUMN `userId`,
    ADD COLUMN `conversation_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `message_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`user_id`);

-- CreateTable
CREATE TABLE `AnsweredMessages` (
    `answer_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`answer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Profile_user_id_key` ON `Profile`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Profile_message_id_key` ON `Profile`(`message_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Profile_conversation_id_key` ON `Profile`(`conversation_id`);

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_message_id_fkey` FOREIGN KEY (`message_id`) REFERENCES `Message`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_conversation_id_fkey` FOREIGN KEY (`conversation_id`) REFERENCES `Conversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConversationsOnProfiles` ADD CONSTRAINT `ConversationsOnProfiles_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConversationsModerators` ADD CONSTRAINT `ConversationsModerators_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_conversation_id_fkey` FOREIGN KEY (`conversation_id`) REFERENCES `Conversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnsweredMessages` ADD CONSTRAINT `AnsweredMessages_answer_id_fkey` FOREIGN KEY (`answer_id`) REFERENCES `Message`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeenMessagesOnProfiles` ADD CONSTRAINT `SeenMessagesOnProfiles_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
