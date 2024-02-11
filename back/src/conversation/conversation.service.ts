import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { createId } from '@paralleldrive/cuid2'
import { Prisma } from '@prisma/client'
import { ConversationsOnProfilesService } from 'src/conversations-on-profiles/conversations-on-profiles.service'
import { ExceptionService } from 'src/exception/exception.service'
import { PrismaService } from 'src/prisma.service'
import { ProfileService } from 'src/profile/profile.service'
import { UserService } from 'src/user/user.service'
import {
	CreateChatDto,
	CreateGroupChatDto
} from './dto/create-conversation.dto'
import { UpdateConversationDto } from './dto/update-conversation.dto'

@Injectable()
export class ConversationService {
	private readonly notFoundMessage = 'Such conversation not found'
	private readonly usersNotFound = 'Such user(s) not found'

	constructor(
		private readonly prisma: PrismaService,
		private readonly userService: UserService,
		private readonly profileService: ProfileService,
		@Inject(forwardRef(() => ConversationsOnProfilesService))
		private readonly conversationsOnProfilesService: ConversationsOnProfilesService,
		private readonly exceptionService: ExceptionService
	) {}

	async createChat(userId: string, createChatDto: CreateChatDto) {
		const { collocutorId, name, image } = createChatDto

		// should user "createMany" method in userService
		const user1 = await this.userService.findUnique({ id: userId })
		const user2 = await this.userService.findUnique({ id: collocutorId })

		if (!user1 || !user2)
			this.exceptionService.notFoundException(this.usersNotFound)

		const conversationId = userId + collocutorId
		const conversation = await this.findUnique({ id: conversationId }, false)

		if (conversation) {
			const conversationUser1 =
				await this.conversationsOnProfilesService.findUnique({
					profileId_conversationId: {
						conversationId,
						profileId: userId
					}
				})

			const conversationUser2 =
				await this.conversationsOnProfilesService.findUnique({
					profileId_conversationId: {
						conversationId,
						profileId: collocutorId
					}
				})

			const noChatUserId = !conversationUser1
				? userId
				: !conversationUser2
					? collocutorId
					: false

			if (noChatUserId) {
				this.conversationsOnProfilesService.addChatToProfile(
					conversationId,
					noChatUserId
				)
			}

			return conversation
		}

		return this.prisma.conversation.create({
			data: {
				id: conversationId,
				name: name || user2.username,
				image,
				isGroup: false,
				creator: {
					connect: {
						userId
					}
				},
				profiles: {
					create: [
						{
							profileId: userId
						},
						{
							profileId: collocutorId
						}
					]
				}
			},
			include: {
				profiles: true
			}
		})
	}

	async createGroupChat(
		userId: string,
		{ name, collocutorsIds, image, id }: CreateGroupChatDto
	) {
		const conversationId = id || createId(),
			create = collocutorsIds.map(id => ({
				profileId: id
			}))

		return this.prisma.conversation.create({
			data: {
				id: conversationId,
				name,
				image,
				isGroup: true,
				creator: {
					connect: {
						userId
					}
				},
				profiles: {
					create
				}
			},
			include: {
				profiles: true
			}
		})
	}

	async findUnique(
		where: Prisma.ConversationWhereUniqueInput,
		withCheck: boolean = true
	) {
		const conversation = await this.prisma.conversation.findUnique({
			where
		})

		if (withCheck && !conversation)
			throw this.exceptionService.notFoundException(this.notFoundMessage)

		return conversation
	}

	async update({ id, image, name }: UpdateConversationDto) {
		await this.findUnique({ id })

		return this.prisma.conversation.update({
			where: {
				id
			},
			data: {
				image,
				name
			}
		})
	}

	async remove(id: string) {
		await this.findUnique({ id })

		return this.prisma.conversation.delete({
			where: {
				id
			}
		})
	}
}
