import { Module, forwardRef } from '@nestjs/common'
import { ExceptionModule } from 'src/exception/exception.module'
import { PrismaService } from 'src/prisma.service'
import { ProfileModule } from 'src/profile/profile.module'
import { UserModule } from 'src/user/user.module'
import { ConversationController } from './conversation.controller'
import { ConversationService } from './conversation.service'
import { ConversationsOnProfilesModule } from 'src/conversations-on-profiles/conversations-on-profiles.module'

@Module({
	providers: [ConversationService, PrismaService],
	controllers: [ConversationController],
	exports: [ConversationService],
	imports: [
		UserModule,
		ProfileModule,
		forwardRef(() => ConversationsOnProfilesModule),
		ExceptionModule
	]
})
export class ConversationModule {}
