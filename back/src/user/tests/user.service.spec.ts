import { Test, TestingModule } from '@nestjs/testing'
import { Prisma, Role } from '@prisma/client'
import { ExceptionService } from 'src/exception/exception.service'
import { PrismaService } from 'src/prisma.service'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UserService } from '../user.service'

describe('UserService', () => {
	let userService: UserService
	let prisma: PrismaService
	let exceptionService: ExceptionService

	const user: Prisma.UserCreateInput = {
		id: 'testId',
		username: 'testName',
		email: 'testEmail',
		password: 'testPass'
	}

	const profile = {
		role: Role.USER,
		userId: user.id
	}

	const updatedData: UpdateUserDto = {
		username: 'ChangeName',
		password: 'updatedPassword'
	}

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService, PrismaService, ExceptionService]
		}).compile()

		userService = module.get<UserService>(UserService)
		prisma = module.get<PrismaService>(PrismaService)
		exceptionService = module.get<ExceptionService>(ExceptionService)
	})

	it('userService should be defined', () => {
		expect(userService).toBeDefined()
	})

	it('prisma should be defined', () => {
		expect(prisma).toBeDefined()
	})

	it('exceptionService should be defined', () => {
		expect(exceptionService).toBeDefined()
	})

	it('create user', async () => {
		const data = await userService.create(user)

		expect(data).toMatchObject({
			...user,
			profile: {
				...profile
			}
		})
	})

	it('findOne user', async () => {
		const data = await userService.findUnique({ id: user.id })
		expect(data).toMatchObject({
			...user
		})
	})

	it('update user', async () => {
		const data = await userService.update(user.id, updatedData)
		expect(data).toMatchObject({
			...user,
			...updatedData,
			profile: {
				...profile
			}
		})
	})

	it('remove user', async () => {
		const data = await userService.remove(user.id)

		expect(data).toMatchObject({
			...user,
			...updatedData,
			profile: {
				...profile
			}
		})
	})
})
