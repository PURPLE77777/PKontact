import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConversationModule } from './conversation/conversation.module'
import { ConversationsOnProfilesModule } from './conversations-on-profiles/conversations-on-profiles.module'
import { MessageModule } from './message/message.module'
import { ProfileModule } from './profile/profile.module'
import { UserModule } from './user/user.module'
import { ExceptionModule } from './exception/exception.module';

@Module({
	imports: [
		UserModule,
		ProfileModule,
		ConversationModule,
		ConversationsOnProfilesModule,
		MessageModule,
		ExceptionModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
