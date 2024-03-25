import { jest } from '@jest/globals'
import { Test, TestingModule } from '@nestjs/testing'
import { MockedObject } from 'jest-mock'
import { CreateUserDto } from '../dto/create-user.dto'
import { UserController } from '../user.controller'
import { UserService } from '../user.service'

jest.mock<UserController>('../user.controller')

describe('UserController', () => {
	let userController: UserController
	let mockedUserController: MockedObject<UserController>
	let userService: UserService

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				{
					provide: UserService,
					useValue: {}
				}
			]
		}).compile()

		userController = module.get<UserController>(UserController)
		userService = module.get<UserService>(UserService)
		mockedUserController = jest.mocked(userController)
	})

	it('userController should be defined', () => {
		expect(userController).toBeDefined()
	})

	it('userService should be defined', () => {
		expect(userService).toBeDefined()
	})

	it('create was called', () => {
		const newUser = {} as CreateUserDto

		mockedUserController.create(newUser)
		expect(userController.create).toHaveBeenCalled()
		expect(userController.create).toHaveBeenCalledWith(newUser)
	})

	it('findAll was called', () => {
		userController.findAll()
		expect(userController.findAll).toHaveBeenCalled()
	})

	it('update was called', () => {
		const newUser = {} as CreateUserDto

		const userId = 'testId'

		mockedUserController.update(userId, newUser)
		expect(userController.update).toHaveBeenCalled()
		expect(userController.update).toHaveBeenCalledWith(userId, newUser)
	})

	it('remove was called', () => {
		const userId = 'testId'

		mockedUserController.remove(userId)
		expect(userController.remove).toHaveBeenCalled()
		expect(userController.remove).toHaveBeenCalledWith(userId)
	})
})
