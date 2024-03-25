import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Socket, io } from 'socket.io-client'
import { CreateMessageDto } from '../dto/create-message.dto'
import { MessageGateway } from '../message.gateway'
import { MessageService } from '../message.service'

describe('MessageGateway', () => {
	let messageGateway: MessageGateway
	let messageService: MessageService
	let app: INestApplication
	let ioClient: Socket

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MessageGateway,
				{
					provide: MessageService,
					useValue: {
						create: (createMessageDto: CreateMessageDto) => ({
							event: 'create',
							data: createMessageDto
						})
					}
				}
			]
		}).compile()

		messageGateway = module.get<MessageGateway>(MessageGateway)
		messageService = module.get<MessageService>(MessageService)

		app = module.createNestApplication()

		await app.listen(3000)

		ioClient = io('ws://localhost:8000', {
			autoConnect: false,
			transports: ['websocket', 'polling']
		})
	})

	afterAll(async () => {
		await app.close()
	})

	beforeEach(async () => {
		ioClient.connect()
	})

	afterEach(async () => {
		ioClient.disconnect()
	})

	it('messageGateway should be defined', () => {
		expect(messageGateway).toBeDefined()
	})

	it('messageService should be defined', () => {
		expect(messageService).toBeDefined()
	})

	it('app should be defined', () => {
		expect(app).toBeDefined()
	})

	it('create', async () => {
		const message: CreateMessageDto = {
			conversationId: 'testConversationId',
			text: 'hello websocket',
			ownerId: 'testId'
		}

		jest.spyOn(messageGateway, 'create')

		ioClient.emit('createMessage', message)

		const data = await new Promise<CreateMessageDto>(resolve => {
			ioClient.on('create', data => {
				resolve(data)
			})
		})

		messageGateway.create(message)

		expect(data).toMatchObject(message)
		expect(messageGateway.create).toHaveBeenCalled()
		expect(messageGateway.create).toHaveBeenCalledWith(message)
	})
})
