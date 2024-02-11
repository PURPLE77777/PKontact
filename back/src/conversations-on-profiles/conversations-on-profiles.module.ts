import { Module, forwardRef } from '@nestjs/common'
import { ConversationModule } from 'src/conversation/conversation.module'
import { ExceptionModule } from 'src/exception/exception.module'
import { PrismaService } from 'src/prisma.service'
import { ConversationsOnProfilesService } from './conversations-on-profiles.service'

@Module({
	providers: [ConversationsOnProfilesService, PrismaService],
	imports: [forwardRef(() => ConversationModule), ExceptionModule],
	exports: [ConversationsOnProfilesService]
})
export class ConversationsOnProfilesModule {}
