import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ExceptionService } from 'src/exception/exception.service'
import { PrismaService } from 'src/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
	private userExistMessage = 'This user name or email is already using'
	private userNotFoundMessage = 'User not found'

	constructor(
		private readonly prisma: PrismaService,
		private readonly exceptionService: ExceptionService
	) {}

	async create(createUserDto: CreateUserDto) {
		const { id, email, username, password, role } = createUserDto
		const userUnique: Prisma.UserWhereUniqueInput = {
			username,
			email
		}

		if (await this.findUnique(userUnique, false))
			this.exceptionService.badRequestException(this.userExistMessage)

		return this.prisma.user.create({
			data: {
				id,
				username,
				email,
				password,
				profile: {
					connectOrCreate: {
						create: {
							role
						},
						where: {
							userId: id
						}
					}
				}
			},
			include: {
				profile: true
			}
		})
	}

	findAll() {
		return this.prisma.user.findMany()
	}

	async findUnique(
		where: Prisma.UserWhereUniqueInput,
		withExistChecking = true,
		include?: Prisma.UserInclude
	) {
		const user = await this.prisma.user.findUnique({
			where,
			include
		})

		if (withExistChecking && !user)
			this.exceptionService.notFoundException(this.userNotFoundMessage)

		return user
	}

	async findFirst(
		where: Prisma.UserWhereInput,
		withExistChecking = true,
		include?: Prisma.UserInclude
	) {
		const user = await this.prisma.user.findFirst({
			where,
			include
		})

		if (withExistChecking && !user)
			this.exceptionService.notFoundException(this.userNotFoundMessage)

		return user
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		const { username, email } = updateUserDto

		if (
			(await this.findUnique({ id })) &&
			!(await this.findFirst({ OR: [{ email }, { username }] }, false))
		) {
			return this.prisma.user.update({
				where: { id },
				data: updateUserDto,
				include: {
					profile: true
				}
			})
		}

		this.exceptionService.badRequestException(this.userExistMessage)
	}

	async remove(id: string) {
		await this.findUnique({ id })

		return this.prisma.user.delete({
			where: { id },
			include: {
				profile: true
			}
		})
	}
}
