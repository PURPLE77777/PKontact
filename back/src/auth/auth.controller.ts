import {
	Body,
	Controller,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LogInDto, SignInDto } from './dto/create-auth.dto'
import { TokensDto } from './dto/tokens.interface'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('sign-in')
	@UsePipes(new ValidationPipe())
	signIn(@Body() signInDto: SignInDto) {
		return this.authService.signIn(signInDto)
	}

	@Post('log-in')
	@UsePipes(new ValidationPipe())
	logIn(@Body() logInDto: LogInDto) {
		return this.authService.logIn(logInDto)
	}

	@Post('check-auth')
	@UsePipes(new ValidationPipe())
	checkAuth(@Body() tokensDto: TokensDto) {
		return this.authService.checkAuth(tokensDto)
	}
}
