import { DefaultValues } from 'react-hook-form'

import {
	LogInFormType,
	LogInOrSignInFormKeyArray
} from '../types/auth-form.types'

export const logInFieldNames: LogInOrSignInFormKeyArray<LogInFormType> = [
	'emailUsername',
	'password'
]

export const logInPlaceHolders: Record<keyof LogInFormType, string> = {
	emailUsername: 'Enter username or email',
	password: 'Enter password'
}

export const logInDefaults: DefaultValues<LogInFormType> = {
	emailUsername: 'lalalalala',
	password: '1234qwerty'
}

export const logInSwitcherPreBtnText = "Don't have an account?"

export const logInSwitcherText = 'Sign in'

export const logInWelcomeText = 'WELCOME BACK!'
