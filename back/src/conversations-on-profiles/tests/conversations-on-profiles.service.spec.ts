import { Test, TestingModule } from '@nestjs/testing'
import { Prisma } from '@prisma/client'
import { ConversationModule } from 'src/conversation/conversation.module'
import { ConversationService } from 'src/conversation/conversation.service'
import { CreateChatDto } from 'src/conversation/dto/create-conversation.dto'
import { ExceptionModule } from 'src/exception/exception.module'
import { ExceptionService } from 'src/exception/exception.service'
import { PrismaService } from 'src/prisma.service'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'
import { ConversationsOnProfilesService } from '../conversations-on-profiles.service'

describe('ConversationsOnProfilesService', () => {
	let conversationsOnProfilesService: ConversationsOnProfilesService
	let conversationService: ConversationService
	let prisma: PrismaService
	let exceptionService: ExceptionService
	let userService: UserService

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
			imports: [ExceptionModule, ConversationModule, UserModule],
			providers: [ConversationsOnProfilesService, PrismaService]
		}).compile()

		conversationsOnProfilesService = module.get<ConversationsOnProfilesService>(
			ConversationsOnProfilesService
		)
		prisma = module.get<PrismaService>(PrismaService)
		exceptionService = module.get<ExceptionService>(ExceptionService)
		conversationService = module.get<ConversationService>(ConversationService)
		userService = module.get<UserService>(UserService)
	})

	it('conversationsOnProfilesService should be defined', () => {
		expect(conversationsOnProfilesService).toBeDefined()
	})

	it('prisma should be defined', () => {
		expect(prisma).toBeDefined()
	})

	it('exceptionService should be defined', () => {
		expect(exceptionService).toBeDefined()
	})

	it('conversationService should be defined', () => {
		expect(conversationService).toBeDefined()
	})

	it('userService should be defined', () => {
		expect(userService).toBeDefined()
	})

	it('addChatToProfile execution', async () => {
		await userService.create(user1)
		await userService.create(user2)
		await conversationService.createChat(user1.id, createChatDto)

		const user3: Prisma.UserCreateInput = {
			id: 'testId3',
			username: 'testName3',
			email: 'testEmail3',
			password: 'testPass3'
		}

		await userService.create(user3)

		const data = await conversationsOnProfilesService.addChatToProfile(
			conversationId,
			user3.id
		)

		expect(data).toMatchObject({
			conversationId,
			profileId: user3.id
		})

		await conversationService.remove(conversationId)
		await userService.remove(user1.id)
		await userService.remove(user2.id)
		await userService.remove(user3.id)
	})

	it('addChatToProfile execution', async () => {
		await userService.create(user1)
		await userService.create(user2)
		await conversationService.createChat(user1.id, createChatDto)

		const data = await conversationsOnProfilesService.removeFromUser(
			conversationId,
			user2.id
		)

		expect(data).toMatchObject({
			conversationId,
			profileId: user2.id
		})

		await conversationService.remove(conversationId)
		await userService.remove(user1.id)
		await userService.remove(user2.id)
	})
})
