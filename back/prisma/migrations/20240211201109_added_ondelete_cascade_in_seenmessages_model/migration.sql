-- DropForeignKey
ALTER TABLE `conversationsmoderators` DROP FOREIGN KEY `ConversationsModerators_conversation_id_fkey`;

-- DropForeignKey
ALTER TABLE `conversationsmoderators` DROP FOREIGN KEY `ConversationsModerators_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `seenmessagesonprofiles` DROP FOREIGN KEY `SeenMessagesOnProfiles_message_id_fkey`;

-- DropForeignKey
ALTER TABLE `seenmessagesonprofiles` DROP FOREIGN KEY `SeenMessagesOnProfiles_profile_id_fkey`;

-- AddForeignKey
ALTER TABLE `ConversationsModerators` ADD CONSTRAINT `ConversationsModerators_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConversationsModerators` ADD CONSTRAINT `ConversationsModerators_conversation_id_fkey` FOREIGN KEY (`conversation_id`) REFERENCES `Conversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeenMessagesOnProfiles` ADD CONSTRAINT `SeenMessagesOnProfiles_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeenMessagesOnProfiles` ADD CONSTRAINT `SeenMessagesOnProfiles_message_id_fkey` FOREIGN KEY (`message_id`) REFERENCES `Message`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
