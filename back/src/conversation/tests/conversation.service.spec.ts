import { Test, TestingModule } from '@nestjs/testing'
import { createId } from '@paralleldrive/cuid2'
import { Prisma } from '@prisma/client'
import { ConversationsOnProfilesModule } from 'src/conversations-on-profiles/conversations-on-profiles.module'
import { ConversationsOnProfilesService } from 'src/conversations-on-profiles/conversations-on-profiles.service'
import { ExceptionService } from 'src/exception/exception.service'
import { PrismaService } from 'src/prisma.service'
import { ProfileService } from 'src/profile/profile.service'
import { UserService } from 'src/user/user.service'
import { ConversationService } from '../conversation.service'
import {
	CreateChatDto,
	CreateGroupChatDto
} from '../dto/create-conversation.dto'
import { UpdateConversationDto } from '../dto/update-conversation.dto'

jest.useRealTimers()

describe('ConversationService', () => {
	let conversationService: ConversationService
	let prisma: PrismaService
	let userService: UserService
	let conversationsOnProfilesService: ConversationsOnProfilesService
	let exceptionService: ExceptionService
	let profileService: ProfileService

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
			imports: [ConversationsOnProfilesModule],
			providers: [
				ConversationService,
				PrismaService,
				UserService,
				ProfileService,
				ExceptionService
			]
		}).compile()

		conversationService = module.get<ConversationService>(ConversationService)
		prisma = module.get<PrismaService>(PrismaService)
		userService = module.get<UserService>(UserService)
		conversationsOnProfilesService = module.get<ConversationsOnProfilesService>(
			ConversationsOnProfilesService
		)
		exceptionService = module.get<ExceptionService>(ExceptionService)
		profileService = module.get<ProfileService>(ProfileService)
	})

	it('conversationService should be defined', () => {
		expect(conversationService).toBeDefined()
	})

	it('prisma should be defined', () => {
		expect(prisma).toBeDefined()
	})

	it('userService should be defined', () => {
		expect(userService).toBeDefined()
	})

	it('conversationsOnProfilesService should be defined', () => {
		expect(conversationsOnProfilesService).toBeDefined()
	})

	it('exceptionService should be defined', () => {
		expect(exceptionService).toBeDefined()
	})

	it('profileService should be defined', () => {
		expect(profileService).toBeDefined()
	})

	it('createChat execution', async () => {
		const createChatDto: CreateChatDto = {
			collocutorId: user2.id,
			name: 'testConversationName'
		}

		await userService.create(user1)
		await userService.create(user2)

		const conversation = await conversationService.createChat(
			user1.id,
			createChatDto
		)

		expect(conversation).toMatchObject({
			id: conversationId,
			name: createChatDto.name,
			image: null,
			isGroup: false,
			// creator: {
			// 	userId: user1.id
			// },
			profiles: [
				{
					conversationId: conversationId,
					profileId: user1.id
				},
				{
					conversationId: conversationId,
					profileId: user2.id
				}
			]
		})

		await conversationService.remove(conversation.id)
		await userService.remove(user1.id)
		await userService.remove(user2.id)
	})

	it('createGroupChat execution', async () => {
		const users: Prisma.UserCreateInput[] = Array.from<
				unknown,
				Prisma.UserCreateInput
			>({ length: 10 }, (_, i) => ({
				id: 'testId' + i,
				username: 'testName' + i,
				email: 'testEmai' + i,
				password: 'testPass' + i
			})),
			user: Prisma.UserCreateInput = {
				id: 'testIdMain',
				username: 'testNameMain',
				email: 'testEmaiMain',
				password: 'testPassMain'
			},
			conversationId = createId(),
			collocutorsIds: string[] = [],
			profiles: { profileId: string; conversationId: string }[] = []

		users.push(user)

		users.forEach(async user => {
			collocutorsIds.push(user.id)
			profiles.push({ profileId: user.id, conversationId })
			await userService.create(user)
		})

		const conversationGroupChatDto: CreateGroupChatDto = {
			id: conversationId,
			name: 'GroupConversationName',
			collocutorsIds
		}

		type convType = {
			id: string
			name: string
			image: string | null
			isGroup: boolean
			createdAt: Date
			updatedAt: Date
			profiles: {
				createdAt: Date
				conversationId: string
				profileId: string
			}[]
		}

		const convPromise = new Promise<convType>(resolve => {
			setTimeout(() => {
				resolve(
					conversationService.createGroupChat(user.id, conversationGroupChatDto)
				)
			}, 100)
		})

		const conversation = await convPromise

		expect(conversation).toMatchObject({
			id: conversationId,
			name: conversationGroupChatDto.name,
			image: null,
			isGroup: true,
			profiles
		})

		await conversationService.remove(conversation.id)
		users.forEach(async user => await userService.remove(user.id))
	})

	it('remove execution', async () => {
		const updateConversationDto: UpdateConversationDto = {
			id: conversationId,
			image: 'test.png'
		}

		type convType = {
			id: string
			name: string
			image: string | null
			isGroup: boolean
			createdAt: Date
			updatedAt: Date
		}

		const convPromise = new Promise<convType>(resolve => {
			setTimeout(async () => {
				await userService.create(user1)
				await userService.create(user2)
				resolve(conversationService.createChat(user1.id, createChatDto))
			}, 100)
		})

		const conversation = await convPromise

		const data = await conversationService.update(updateConversationDto)

		expect(data).toMatchObject({
			id: conversation.id,
			name: conversation.name,
			image: updateConversationDto.image,
			isGroup: false
		})

		await conversationService.remove(conversation.id)
		await userService.remove(user1.id)
		await userService.remove(user2.id)
	})

	it('remove execution', async () => {
		type convType = {
			id: string
			name: string
			image: string | null
			isGroup: boolean
			createdAt: Date
			updatedAt: Date
			// profiles: {
			// 	createdAt: Date
			// 	conversationId: string
			// 	profileId: string
			// }[]
		}

		const convPromise = new Promise<convType>(resolve => {
			setTimeout(async () => {
				await userService.create(user1)
				await userService.create(user2)
				resolve(conversationService.createChat(user1.id, createChatDto))
			}, 100)
		})

		const conversation = await convPromise

		const data = await conversationService.remove(conversation.id)

		expect(data).toMatchObject({
			id: conversationId,
			name: createChatDto.name,
			image: null,
			isGroup: false
		})

		await userService.remove(user1.id)
		await userService.remove(user2.id)
	})
})
