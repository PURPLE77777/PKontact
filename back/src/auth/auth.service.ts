import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Prisma } from '@prisma/client'
import { verify } from 'argon2'
import { ExceptionService } from 'src/exception/exception.service'
import { UserService } from 'src/user/user.service'
import { LogInDto, SignInDto } from './dto/create-auth.dto'
import { TokensDto } from './dto/tokens.interface'
import { Payload } from './interfaces/payload.interface'

@Injectable()
export class AuthService {
	private readonly userExistMessage: string = 'Such user is already exist'
	private readonly incorrectValuesMessage: string = 'Incorrect entered values'
	private readonly notFoundMessage: string = 'The user not found'
	private readonly invalidTokensMessage: string = 'Invalid refresh tokens'
	private readonly logger = new Logger(AuthService.name)

	constructor(
		private readonly userService: UserService,
		private readonly exceptionService: ExceptionService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async signIn(authDto: SignInDto) {
		const { password, ...userInfo } = authDto

		const oldUser = await this.userService.findUnique({
			...userInfo
		})

		if (oldUser)
			this.exceptionService.badRequestException(this.userExistMessage)

		const newUser = await this.userService.create({
			...authDto
		})

		const tokens = this.generateTokens({
			userId: newUser.id,
			email: newUser.email,
			username: newUser.username
		})

		return {
			...newUser,
			...tokens
		}
	}

	generateTokens(payload: Payload) {
		const accessToken = this.jwtService.sign(payload, {
				expiresIn: this.configService.get('EXPIRE_ACCESS_TOKEN_TIME')
			}),
			refreshToken = this.jwtService.sign(payload, {
				expiresIn: this.configService.get('EXPIRE_REFRESH_TOKEN_TIME')
			})

		return {
			accessToken,
			refreshToken
		}
	}

	async logIn(authDto: LogInDto) {
		const { email, username, password } = authDto,
			where: Prisma.UserWhereUniqueInput = email
				? {
						email
					}
				: {
						username
					},
			user = await this.userService.findUnique(where)

		if (!user) this.exceptionService.notFoundException(this.notFoundMessage)

		const isVerify = await verify(user.password, password)

		if (!isVerify)
			this.exceptionService.badRequestException(this.incorrectValuesMessage)

		const tokens = this.generateTokens({
			email: user.email,
			userId: user.id,
			username: user.username
		})

		return {
			...user,
			...tokens
		}
	}

	private checkToken(token: string) {
		let payload: Payload | null = null

		try {
			payload = this.jwtService.verify(token)
		} catch (e: any) {
			console.error(e)
		}

		this.logger.log('checkToken payload:', payload)

		return payload
	}

	async checkAuth(tokensDto: TokensDto) {
		const payload: Payload =
			this.checkToken(tokensDto.accessToken) ||
			this.checkToken(tokensDto.refreshToken)

		if (!payload)
			this.exceptionService.unauthorizedException(this.invalidTokensMessage)

		const user = await this.userService.findUnique({
			id: payload.userId
		})

		if (!user) this.exceptionService.notFoundException(this.notFoundMessage)

		const tokens = this.generateTokens({
			email: user.email,
			userId: user.id,
			username: user.username
		})

		return {
			...user,
			...tokens
		}
	}
}
