import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ExceptionService } from 'src/exception/exception.service'
import { PrismaService } from 'src/prisma.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'

@Injectable()
export class MessageService {
	private readonly createEventName = 'create'
	private readonly badRequetMessage = 'Bad request by creating message'
	private readonly notFoundMessage = 'The message not found'

	constructor(
		private readonly prisma: PrismaService,
		private readonly exceptionService: ExceptionService
	) {}

	async create(createMessageDto: CreateMessageDto) {
		const { conversationId, image, text, ownerId, addressedToMessageId } =
			createMessageDto

		if (!(conversationId && ownerId && (text || image))) {
			this.exceptionService.badRequestException(this.badRequetMessage)
		}

		let isAddressedMessageExist = false
		if (
			addressedToMessageId &&
			(await this.findUnique({ id: addressedToMessageId }, false))
		) {
			isAddressedMessageExist = true
		}

		const message = await this.prisma.message.create({
			data: {
				text: text || '',
				image: image || '',
				conversation: {
					connect: {
						id: conversationId
					}
				},
				seenUsers: {
					create: {
						profileId: ownerId
					}
				},
				answeredMessages: isAddressedMessageExist
					? {
							connect: {
								answerId: addressedToMessageId
							}
						}
					: undefined
			}
		})

		return {
			event: this.createEventName,
			data: message
		}
	}

	async findUnique(where: Prisma.MessageWhereUniqueInput, withCheck = true) {
		const message = await this.prisma.message.findUnique({ where })

		if (withCheck && !message)
			this.exceptionService.notFoundException(this.notFoundMessage)

		return message
	}

	findAll() {
		return `This action returns all message`
	}

	findOne(id: number) {
		return `This action returns a #${id} message`
	}

	update(id: number, updateMessageDto: UpdateMessageDto) {
		return `This action updates a #${id} message`
	}

	async remove(id: string) {
		await this.findUnique({ id })

		return this.prisma.message.delete({
			where: {
				id
			}
		})
	}
}
