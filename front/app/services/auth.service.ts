import {
	LogInFormType,
	SignInFormType
} from '@screens/auth/types/auth-form.types'

import { sleep } from '@api/sleep'

import { AuthResponse } from './types/auth.types'

export class AuthService {
	async checkAuth() {
		await sleep()
		return true
		// const tokens = rootStore.tokenStore.getTokens()
		// const { data } = await axios.post<AuthResponse>(
		// 	process.env.EXPO_PUBLIC_SERVER_URL + AUTH_BASE + 'login/check-auth',
		// 	{
		// 		...tokens
		// 	}
		// )

		// console.log('checkAuth response', data)

		// if (data) {
		// 	rootStore.tokenStore.saveTokens(data.accessToken, data.refreshToken)
		// }

		// return data
	}

	async signIn(data: SignInFormType): Promise<AuthResponse> {
		await sleep(5000)
		return { result: Math.random() > 0.4 } as AuthResponse
	}

	async logIn(data: LogInFormType): Promise<AuthResponse> {
		await sleep(5000)
		return { result: Math.random() > 0.4 } as AuthResponse
	}
}

// export const authService = new AuthService()
