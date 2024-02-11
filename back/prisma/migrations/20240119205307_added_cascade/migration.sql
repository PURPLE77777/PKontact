-- DropForeignKey
ALTER TABLE `conversationsonprofiles` DROP FOREIGN KEY `ConversationsOnProfiles_conversation_id_fkey`;

-- AddForeignKey
ALTER TABLE `ConversationsOnProfiles` ADD CONSTRAINT `ConversationsOnProfiles_conversation_id_fkey` FOREIGN KEY (`conversation_id`) REFERENCES `Conversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
