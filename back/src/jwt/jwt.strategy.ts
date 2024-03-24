import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ExceptionService } from 'src/exception/exception.service'
import { UserService } from 'src/user/user.service'
import { Payload } from '../auth/interfaces/payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	private readonly userNotFoundMessage = 'Such user not found'

	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UserService,
		private readonly exceptionService: ExceptionService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET')
		})
	}

	async validate({ userId }: Payload) {
		const user = await this.userService.findUnique({
			id: userId
		})

		if (!user) this.exceptionService.notFoundException(this.userNotFoundMessage)

		return user
	}
}
