import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway
} from '@nestjs/websockets'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'
import { MessageService } from './message.service'

@WebSocketGateway(8000)
export class MessageGateway {
	constructor(private readonly messageService: MessageService) {}

	@SubscribeMessage('createMessage')
	create(@MessageBody() createMessageDto: CreateMessageDto) {
		return this.messageService.create(createMessageDto)
	}

	@SubscribeMessage('findAllMessage')
	findAll() {
		return this.messageService.findAll()
	}

	@SubscribeMessage('findOneMessage')
	findOne(@MessageBody() id: number) {
		return this.messageService.findOne(id)
	}

	@SubscribeMessage('updateMessage')
	update(@MessageBody() updateMessageDto: UpdateMessageDto) {
		return this.messageService.update(updateMessageDto.id, updateMessageDto)
	}

	@SubscribeMessage('removeMessage')
	remove(@MessageBody() id: string) {
		return this.messageService.remove(id)
	}
}
