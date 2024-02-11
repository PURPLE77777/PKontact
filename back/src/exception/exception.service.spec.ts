import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { ExceptionService } from './exception.service'

jest.mock('./exception.service')

describe('ExceptionService', () => {
	let exceptionService: ExceptionService

	const notFoundMessage = 'Not found exception'
	const badRequestMessage = 'Bad request'

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ExceptionService]
		}).compile()

		exceptionService = module.get<ExceptionService>(ExceptionService)
	})

	it('exceptionService should be defined', () => {
		expect(exceptionService).toBeDefined()
	})

	it('badRequestException execution', async () => {
		const badRequestCustomMessage = 'Very Bad'

		try {
			exceptionService.badRequestException(badRequestCustomMessage)
		} catch (error) {
			expect(error).toThrow(new BadRequestException(badRequestCustomMessage))
		}

		try {
			exceptionService.badRequestException()
		} catch (error: unknown) {
			expect(error).toThrow(new BadRequestException(badRequestMessage))
		}
	})

	it('notFoundException execution', () => {
		const notFoundCustomMessage = 'Not such data'

		try {
			exceptionService.notFoundException(notFoundCustomMessage)
		} catch (error: unknown) {
			expect(error).toThrow(new NotFoundException(notFoundCustomMessage))
		}

		try {
			exceptionService.notFoundException()
		} catch (error: unknown) {
			expect(exceptionService.notFoundException).toThrow(
				new NotFoundException(notFoundMessage)
			)
		}
	})
})
