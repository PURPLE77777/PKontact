import { ThemeStore } from './theme.store'
import { TokenStore } from './token.store'
import { UserStore } from './user.store'

export class RootStore {
	userStore = new UserStore()
	tokenStore = new TokenStore()
	themeStore = new ThemeStore()
}

export const rootStore = new RootStore()
