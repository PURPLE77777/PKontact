import {
	IsEmail,
	IsOptional,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator'

export class SignInDto {
	@IsString()
	@IsEmail()
	email: string

	@IsString()
	@MinLength(4, {
		message: 'The name must consist of at least 2 symbols'
	})
	username: string

	@IsString()
	@MinLength(8, {
		message: 'The password must consist of at least 4 symbols'
	})
	@MaxLength(32, {
		message: 'The password must consist of a maximum of 32 symbols'
	})
	password: string
}

export class LogInDto {
	@IsString()
	@IsOptional()
	@IsEmail()
	email?: string

	@IsString()
	@IsOptional()
	@MinLength(2, {
		message: 'The name must consist of at least 2 symbols'
	})
	username?: string

	@IsString()
	@MinLength(4, {
		message: 'The password must consist of at least 4 symbols'
	})
	@MaxLength(32, {
		message: 'The password must consist of a maximum of 32 symbols'
	})
	password: string
}
