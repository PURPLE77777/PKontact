import { User } from '@AppTypes/user.types'

type Tokens = {
	accessToken: string
	refreshToken: string
}

export type AuthResponse = User &
	Tokens & {
		result: boolean
	}
