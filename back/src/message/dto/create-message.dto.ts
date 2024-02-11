export class CreateMessageDto {
	image?: string
	text?: string
	ownerId: string
	conversationId: string
	addressedToMessageId?: string
}
