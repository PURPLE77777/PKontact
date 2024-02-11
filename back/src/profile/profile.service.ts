import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ExceptionService } from 'src/exception/exception.service'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class ProfileService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly exceptionService: ExceptionService,
		private readonly userService: UserService
	) {}

	async findUnique(where: Prisma.ProfileWhereUniqueInput) {
		return this.prisma.profile.findUnique({
			where
		})
	}
}
