import { Prisma } from '@prisma/client'

class CreateConversation implements Prisma.ConversationCreateInput {
	id?: string
	image?: string
	name: string
}

export class CreateChatDto extends CreateConversation {
	collocutorId: string
}

export class CreateGroupChatDto extends CreateConversation {
	collocutorsIds: string[]
}
