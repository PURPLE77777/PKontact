import { DefaultValues } from 'react-hook-form'

import { rootService } from '@services/root.service'

import {
	LogInFormSchema,
	LogInFormType,
	LogInOrSignInFormKeyArrays
} from '../types/auth-form.types'

import AuthFormCarousel from './FormsStates'

const fieldNames: LogInOrSignInFormKeyArrays<LogInFormType> = [
	'emailUsername',
	'password'
]

const placeHolders: Record<keyof LogInFormType, string> = {
	emailUsername: 'Enter username or email',
	password: 'Enter password'
}

const defaults: DefaultValues<LogInFormType> = {
	emailUsername: '',
	password: ''
}

const LogInForm = () => {
	const { authService } = rootService

	return (
		<AuthFormCarousel
			fieldNames={fieldNames}
			placeHolders={placeHolders}
			schema={LogInFormSchema}
			submitFn={authService.logIn}
			defaults={defaults}
			welcomeText='WELCOME BACK!'
		/>
	)
}

export default LogInForm
