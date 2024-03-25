import { makeAutoObservable } from 'mobx'

import { User } from '@AppTypes/user.types'

export class UserStore {
	user: User | null = null

	constructor() {
		makeAutoObservable(this)
	}

	setUser(user: User) {
		this.user = user
	}
}
