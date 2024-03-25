import { PartialType } from '@nestjs/mapped-types'
import { CreateChatDto } from './create-conversation.dto'

export class UpdateConversationDto extends PartialType(CreateChatDto) {
	id: string
	image?: string
	name?: string
}
