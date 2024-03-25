import { z } from 'zod'

export const AuthFormSchema = z.object({
	username: z.string().min(5).max(32),
	email: z.string().email(),
	password: z.string().min(8).max(24)
})

export type AuthForm = z.infer<typeof AuthFormSchema>
