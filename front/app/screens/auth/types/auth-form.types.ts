import { Dispatch, SetStateAction } from 'react'
import { z } from 'zod'

const passwordSchema = z.string().min(8).max(24),
	emailSchema = z.string().email(),
	usernameSchema = z.string().min(5).max(32),
	emailUsernameSchema = z.union([emailSchema, usernameSchema])

export const SignInFormSchema = z.object({
	username: passwordSchema,
	email: emailSchema,
	password: passwordSchema
})

export const LogInFormSchema = z.object({
	emailUsername: emailUsernameSchema,
	password: passwordSchema
})

export type SignInFormType = z.infer<typeof SignInFormSchema>

export type LogInFormType = z.infer<typeof LogInFormSchema>

export type KeyArray<T> = Array<keyof T>

export type FormsTypes = SignInFormType | LogInFormType

export type LogInOrSignInFormKeyArray<T extends FormsTypes> = Array<keyof T>

export type SwitcherTexts = {
	switcherText: string
	switcherPreBtnText: string
}

export type FormsSetterType = {
	setIsLogInForm: Dispatch<SetStateAction<boolean>>
}

export type FormSwitcherType = SwitcherTexts & FormsSetterType
