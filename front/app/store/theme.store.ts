import { makeAutoObservable } from 'mobx'

import { ThemeEnums } from '@AppTypes/theme.types'

export class ThemeStore {
	theme: ThemeEnums = ThemeEnums.DARK

	constructor() {
		makeAutoObservable(this)
	}

	setTheme(newTheme: ThemeEnums) {
		this.theme = newTheme
	}
}
