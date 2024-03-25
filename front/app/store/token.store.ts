import AsyncStorage from '@react-native-async-storage/async-storage'
import { makeAutoObservable, runInAction } from 'mobx'

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@constants/token.constants'

export class TokenStore {
	accessToken: string | null = null
	refreshToken: string | null = null
	errorAccessToken: any = null
	errorRefreshToken: any = null

	constructor() {
		makeAutoObservable(this)
	}

	setAccessToken(accessToken: string | null) {
		this.accessToken = accessToken
	}

	setRefreshToken(refreshToken: string | null) {
		this.refreshToken = refreshToken
	}

	saveTokens(accessToken: string, refreshToken: string) {
		this.accessToken = accessToken
		this.refreshToken = refreshToken
		this.saveAccessTokenToStorage(accessToken)
		this.saveRefreshTokenToStorage(refreshToken)
	}

	async getTokens() {
		return {
			accessToken: this.accessToken,
			refreshToken: this.refreshToken
		}
	}

	async saveAccessTokenToStorage(accessToken: string) {
		try {
			await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
		} catch (e) {
			runInAction(() => {
				this.errorAccessToken = e
			})
		} finally {
			this.accessToken = null
		}
	}

	async saveRefreshTokenToStorage(refreshToken: string) {
		try {
			await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
		} catch (e) {
			runInAction(() => {
				this.errorRefreshToken = e
			})
		} finally {
			this.refreshToken = null
		}
	}
}
