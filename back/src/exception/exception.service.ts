import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'

@Injectable()
export class ExceptionService {
	private readonly notFoundMessage = 'Not found exception'
	private readonly badRequestMessage = 'Bad request'
	private readonly unauthorizedMessage = 'Invalid refresh token'

	notFoundException(message?: string): never {
		throw new NotFoundException(message || this.notFoundMessage)
	}

	badRequestException(message?: string): never {
		throw new BadRequestException(message || this.badRequestMessage)
	}

	unauthorizedException(message?: string): never {
		throw new UnauthorizedException(message || this.unauthorizedMessage)
	}
}
