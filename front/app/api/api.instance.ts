import axios from 'axios'

import { rootStore } from '@store/root.store'

import { errorCatch, getContentType } from './api.helper'
import { sleep } from './sleep'

export const instance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
	headers: getContentType()
})

instance.interceptors.request.use(
	async request => {
		const accessToken = rootStore.tokenStore.accessToken

		if (request.headers && accessToken) {
			request.headers.Authorization = `Bearer ${accessToken}`
		}

		return request
	},
	error => {
		console.log(errorCatch(error))
		return Promise.reject(errorCatch(error))
	}
)

instance.interceptors.response.use(
	async response => {
		await sleep()
		return response
	},
	async error => {
		console.log(errorCatch(error))
		return Promise.reject(errorCatch(error))
	}
)
