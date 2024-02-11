import { Module } from '@nestjs/common'
import { ExceptionModule } from 'src/exception/exception.module'
import { PrismaService } from 'src/prisma.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService],
	exports: [UserService],
	imports: [ExceptionModule]
})
export class UserModule {}
