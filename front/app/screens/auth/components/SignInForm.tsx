import { DefaultValues } from 'react-hook-form'

import { rootService } from '@services/root.service'

import {
	LogInOrSignInFormKeyArrays,
	SignInFormSchema,
	SignInFormType
} from '../types/auth-form.types'

import AuthFormCarousel from './FormsStates'

const fieldNames: LogInOrSignInFormKeyArrays<SignInFormType> = [
	'username',
	'email',
	'password'
]

const placeHolders: Record<keyof SignInFormType, string> = {
	username: 'Enter username',
	email: 'Enter email',
	password: 'Enter password'
}

const defaults: DefaultValues<SignInFormType> = {
	username: '',
	email: '',
	password: ''
}

const SignInForm = () => {
	const { authService } = rootService

	return (
		<AuthFormCarousel
			fieldNames={fieldNames}
			placeHolders={placeHolders}
			schema={SignInFormSchema}
			submitFn={authService.signIn}
			defaults={defaults}
			welcomeText='WELCOME!'
		/>
	)
}

export default SignInForm
