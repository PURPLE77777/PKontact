import { $Enums, Prisma } from '@prisma/client'

export class UserCreateInput implements Prisma.UserCreateInput {
	id?: string
	username: string
	email: string
	password: string
}

export class CreateUserDto extends UserCreateInput {
	role?: $Enums.Role
}
