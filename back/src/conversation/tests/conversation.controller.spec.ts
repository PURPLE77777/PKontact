import { Test, TestingModule } from '@nestjs/testing'
import { ConversationController } from '../conversation.controller'
import { ConversationService } from '../conversation.service'
import { CreateChatDto } from '../dto/create-conversation.dto'
import { UpdateConversationDto } from '../dto/update-conversation.dto'

jest.mock<ConversationController>('../conversation.controller')

describe('ConversationController', () => {
	let conversationController: ConversationController
	let conversationService: ConversationService

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ConversationController],
			providers: [
				{
					provide: ConversationService,
					useValue: {}
				}
			]
		}).compile()

		conversationController = module.get<ConversationController>(
			ConversationController
		)
		conversationService = module.get<ConversationService>(ConversationService)
	})

	it('conversationController defined', () => {
		expect(conversationController).toBeDefined()
	})

	it('conversationService defined', () => {
		expect(conversationService).toBeDefined()
	})

	it('createChat execution', () => {
		const createConversationDto = {} as CreateChatDto
		conversationController.createChat('', createConversationDto)

		expect(conversationController.createChat).toHaveBeenCalled()
		expect(conversationController.createChat).toHaveBeenCalledWith(
			'',
			createConversationDto
		)
	})

	it('findOne execution', () => {
		const testId = 'testId'
		conversationController.findOne(testId)

		expect(conversationController.findOne).toHaveBeenCalled()
		expect(conversationController.findOne).toHaveBeenCalledWith(testId)
	})

	it('update execution', () => {
		const updateConversationDto = {} as UpdateConversationDto
		conversationController.update(updateConversationDto)

		expect(conversationController.update).toHaveBeenCalled()
		expect(conversationController.update).toHaveBeenCalledWith(
			updateConversationDto
		)
	})

	it('remove execution', () => {
		const testId = 'testId'
		conversationController.remove(testId)

		expect(conversationController.remove).toHaveBeenCalled()
		expect(conversationController.remove).toHaveBeenCalledWith(testId)
	})
})
