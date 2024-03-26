import { z } from 'zod'

const passwordSchema = z.string().min(8).max(24),
	emailSchema = z.string().email(),
	usernameSchema = z.string().min(5).max(32),
	emailUsernameSchema = z.union([emailSchema, usernameSchema])

export const AuthFormSchema = z.object({
	username: passwordSchema,
	email: emailSchema,
	password: passwordSchema
})
export const SignInSchema = z.object({
	emailUsername: emailUsernameSchema,
	password: passwordSchema
})

export type AuthFormType = z.infer<typeof AuthFormSchema>

export type SignInType = z.infer<typeof SignInSchema>

export type AuthLogInType = 'auth' | 'login'

export type KeyArray<T> = Array<keyof T>

export type SignInOrAuthFormKeyArrays =
	| KeyArray<SignInType>
	| KeyArray<AuthFormType>

export type FormsTypes = AuthFormType | SignInType
