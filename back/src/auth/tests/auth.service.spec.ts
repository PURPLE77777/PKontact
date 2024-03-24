import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { ExceptionModule } from 'src/exception/exception.module'
import { jwtConfig } from 'src/jwt/jwt.config'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'
import { AuthService } from '../auth.service'

describe('AuthService', () => {
	let authService: AuthService
	let userService: UserService
	let jwtService: JwtService
	let configService: ConfigService

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AuthService],
			imports: [
				UserModule,
				ExceptionModule,
				ConfigModule,
				JwtModule.registerAsync({
					imports: [ConfigModule],
					inject: [ConfigService],
					useFactory: jwtConfig
				})
			]
		}).compile()

		authService = module.get<AuthService>(AuthService)
		userService = module.get<UserService>(UserService)
		jwtService = module.get<JwtService>(JwtService)
		configService = module.get<ConfigService>(ConfigService)
	})

	it('authService should be defined', () => {
		expect(authService).toBeDefined()
	})

	it('userService should be defined', () => {
		expect(userService).toBeDefined()
	})

	it('jwtService should be defined', () => {
		expect(jwtService).toBeDefined()
	})

	it('configService should be defined', () => {
		expect(configService).toBeDefined()
	})
})
