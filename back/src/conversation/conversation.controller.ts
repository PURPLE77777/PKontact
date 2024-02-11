import { Controller } from '@nestjs/common'
import { ConversationService } from './conversation.service'
import { CreateChatDto } from './dto/create-conversation.dto'
import { UpdateConversationDto } from './dto/update-conversation.dto'

@Controller('conversation')
export class ConversationController {
	constructor(private readonly conversationService: ConversationService) {}

	createChat(userId: string, createConversationDto: CreateChatDto) {
		return this.conversationService.createChat(userId, createConversationDto)
	}

	findOne(id: string) {
		return this.conversationService.findUnique({ id }, false)
	}

	update(updateConversationDto: UpdateConversationDto) {
		return this.conversationService.update(updateConversationDto)
	}

	remove(id: string) {
		return this.conversationService.remove(id)
	}
}
