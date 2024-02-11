import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'

@Injectable()
export class ExceptionService {
	private notFoundMessage = 'Not found exception'
	private badRequestMessage = 'Bad request'

	notFoundException(message?: string): never {
		throw new NotFoundException(message || this.notFoundMessage)
	}

	badRequestException(message?: string): never {
		throw new BadRequestException(message || this.badRequestMessage)
	}
}
