import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConversationModule } from './conversation/conversation.module'
import { ConversationsOnProfilesModule } from './conversations-on-profiles/conversations-on-profiles.module'
import { ExceptionModule } from './exception/exception.module'
import { MessageModule } from './message/message.module'
import { ProfileModule } from './profile/profile.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		UserModule,
		ProfileModule,
		ConversationModule,
		ConversationsOnProfilesModule,
		MessageModule,
		ExceptionModule,
		AuthModule,
		ConfigModule.forRoot()
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
