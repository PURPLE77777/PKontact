import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ConversationService } from 'src/conversation/conversation.service'
import { ExceptionService } from 'src/exception/exception.service'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ConversationsOnProfilesService {
	readonly notFoundMessage = 'Such conversation not found'

	constructor(
		private readonly prisma: PrismaService,
		@Inject(forwardRef(() => ConversationService))
		private readonly conversationService: ConversationService,
		private readonly exceptionService: ExceptionService
	) {}

	async addChatToProfile(conversationId: string, profileId: string) {
		const convOnProfConnection = await this.findUnique(
			{
				profileId_conversationId: {
					conversationId,
					profileId
				}
			},
			false
		)

		if (convOnProfConnection)
			this.exceptionService.badRequestException(this.notFoundMessage)

		return this.prisma.conversationsOnProfiles.create({
			data: {
				conversationId,
				profileId
			}
		})
	}

	async findUnique(
		where: Prisma.ConversationsOnProfilesWhereUniqueInput,
		withCheck = true
	) {
		const convOnProfConnection =
			await this.prisma.conversationsOnProfiles.findUnique({
				where
			})

		if (withCheck && !convOnProfConnection)
			this.exceptionService.notFoundException(this.notFoundMessage)

		return convOnProfConnection
	}

	async findManyConversation(conversationId: string) {
		const conversations = await this.prisma.conversationsOnProfiles.findMany({
			where: {
				conversationId
			}
		})

		if (!conversations.length)
			this.exceptionService.notFoundException(this.notFoundMessage)

		return conversations
	}

	async removeFromUser(conversationId: string, profileId: string) {
		const userConversation = await this.findManyConversation(conversationId)

		const deletedConversation =
			userConversation.length === 1
				? await this.conversationService.remove(conversationId)
				: await this.prisma.conversationsOnProfiles.delete({
						where: {
							profileId_conversationId: {
								profileId,
								conversationId
							}
						}
					})

		return deletedConversation
	}
}
