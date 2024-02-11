import { Test, TestingModule } from '@nestjs/testing'
import { Prisma } from '@prisma/client'
import { ConversationModule } from 'src/conversation/conversation.module'
import { ConversationService } from 'src/conversation/conversation.service'
import { CreateChatDto } from 'src/conversation/dto/create-conversation.dto'
import { ConversationsOnProfilesModule } from 'src/conversations-on-profiles/conversations-on-profiles.module'
import { ConversationsOnProfilesService } from 'src/conversations-on-profiles/conversations-on-profiles.service'
import { ExceptionModule } from 'src/exception/exception.module'
import { ExceptionService } from 'src/exception/exception.service'
import { PrismaService } from 'src/prisma.service'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'
import { CreateMessageDto } from '../dto/create-message.dto'
import { MessageService } from '../message.service'

describe('MessageService', () => {
	let messageService: MessageService
	let prisma: PrismaService
	let exceptionService: ExceptionService
	let userService: UserService
	let conversationService: ConversationService
	let conversationsOnProfilesService: ConversationsOnProfilesService

	const user1: Prisma.UserCreateInput = {
			id: 'testId1',
			username: 'testName1',
			email: 'testEmail1',
			password: 'testPass1'
		},
		user2: Prisma.UserCreateInput = {
			id: 'testId2',
			username: 'testName2',
			email: 'testEmail2',
			password: 'testPass2'
		},
		createChatDto: CreateChatDto = {
			collocutorId: user2.id,
			name: 'testConversationName'
		},
		conversationId = user1.id + user2.id

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [MessageService, PrismaService],
			imports: [
				ExceptionModule,
				UserModule,
				ConversationModule,
				ConversationsOnProfilesModule
			]
		}).compile()

		messageService = module.get<MessageService>(MessageService)
		prisma = module.get<PrismaService>(PrismaService)
		exceptionService = module.get<ExceptionService>(ExceptionService)
		userService = module.get<UserService>(UserService)
		conversationService = module.get<ConversationService>(ConversationService)
		conversationsOnProfilesService = module.get<ConversationsOnProfilesService>(
			ConversationsOnProfilesService
		)
	})

	// beforeEach(async () => {})

	// afterEach(async () => {})

	it('messageService should be defined', () => {
		expect(messageService).toBeDefined()
	})

	it('prisma should be defined', () => {
		expect(prisma).toBeDefined()
	})

	it('exceptionService should be defined', () => {
		expect(exceptionService).toBeDefined()
	})

	it('userService should be defined', () => {
		expect(userService).toBeDefined()
	})

	it('conversationService should be defined', () => {
		expect(conversationService).toBeDefined()
	})

	it('conversationsOnProfilesService should be defined', () => {
		expect(conversationsOnProfilesService).toBeDefined()
	})

	it('create execution', async () => {
		const message: CreateMessageDto = {
			conversationId: conversationId,
			text: 'hello websocket',
			ownerId: user1.id
		}

		await userService.create(user1)
		await userService.create(user2)
		await conversationService.createChat(user1.id, createChatDto)

		const data = await messageService.create(message)

		expect(data).toMatchObject({
			event: 'create',
			data: {
				text: message.text || '',
				image: message.image || '',
				conversationId
			}
		})

		await conversationService.remove(conversationId)
		await userService.remove(user1.id)
		await userService.remove(user2.id)
	})
})
