import { Module } from '@nestjs/common'
import { ExceptionModule } from 'src/exception/exception.module'
import { PrismaService } from 'src/prisma.service'
import { UserModule } from 'src/user/user.module'
import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'

@Module({
	controllers: [ProfileController],
	providers: [ProfileService, PrismaService],
	exports: [ProfileService],
	imports: [UserModule, ExceptionModule]
})
export class ProfileModule {}
