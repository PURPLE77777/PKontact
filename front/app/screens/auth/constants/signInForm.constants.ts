import { DefaultValues } from 'react-hook-form'

import {
	LogInOrSignInFormKeyArray,
	SignInFormType
} from '../types/auth-form.types'

export const signInFieldNames: LogInOrSignInFormKeyArray<SignInFormType> = [
	'username',
	'email',
	'password'
]

export const signInPlaceHolders: Record<keyof SignInFormType, string> = {
	username: 'Enter username',
	email: 'Enter email',
	password: 'Enter password'
}

export const signInDefaults: DefaultValues<SignInFormType> = {
	username: 'Test name',
	email: 'test@test.com',
	password: '1234qwerty'
}

export const signInSwitcherPreBtnText = 'Do have the account?'

export const signInSwitcherText = 'Log in'

export const signInWelcomeText = 'WELCOME!'
