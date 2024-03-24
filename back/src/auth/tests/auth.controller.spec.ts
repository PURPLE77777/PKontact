import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from '../auth.controller'
import { AuthService } from '../auth.service'
import { LogInDto, SignInDto } from '../dto/create-auth.dto'
import { TokensDto } from '../dto/tokens.interface'

describe('AuthController', () => {
	let authController: AuthController
	let authService: AuthService

	const signInDto: SignInDto = {
			email: 'test@mail.com',
			username: 'testName',
			password: 'testPass'
		},
		logInDto: LogInDto = {
			email: 'test@mail.com',
			password: 'testPass'
		},
		tokensDto: TokensDto = {
			accessToken: 'testAccessToken',
			refreshToken: 'testRefreshToken'
		}

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: AuthService,
					useValue: {
						signIn: jest.fn((signInDto: SignInDto) => signInDto),
						logIn: jest.fn((logInDto: LogInDto) => logInDto),
						checkAuth: jest.fn((tokensDto: TokensDto) => tokensDto)
					}
				}
			]
		}).compile()

		authController = module.get<AuthController>(AuthController)
		authService = module.get<AuthService>(AuthService)
	})

	it('authController should be defined', () => {
		expect(authController).toBeDefined()
	})

	it('authService should be defined', () => {
		expect(authService).toBeDefined()
	})

	it('signIn execution', () => {
		const data = authController.signIn(signInDto)

		expect(data).toMatchObject(signInDto)
	})

	it('logIn execution', () => {
		const data = authController.logIn(logInDto)

		expect(data).toMatchObject(logInDto)
	})

	it('checkAuth execution', () => {
		const data = authController.checkAuth(tokensDto)

		expect(data).toMatchObject(tokensDto)
	})
})
