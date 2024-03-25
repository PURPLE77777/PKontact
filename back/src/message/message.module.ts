import { Module } from '@nestjs/common'
import { ExceptionModule } from 'src/exception/exception.module'
import { PrismaService } from 'src/prisma.service'
import { MessageGateway } from './message.gateway'
import { MessageService } from './message.service'

@Module({
	providers: [MessageGateway, MessageService, PrismaService],
	imports: [ExceptionModule]
})
export class MessageModule {}
