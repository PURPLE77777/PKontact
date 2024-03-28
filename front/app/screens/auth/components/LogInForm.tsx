import { rootService } from '@services/root.service'

import {
	logInDefaults,
	logInFieldNames,
	logInPlaceHolders,
	logInSwitcherPreBtnText,
	logInSwitcherText,
	logInWelcomeText
} from '../constants/logInForm.constants'
import { FormsSetterType, LogInFormSchema } from '../types/auth-form.types'

import AuthFormCarousel from './FormsStates'

const LogInForm = ({ setIsLogInForm }: FormsSetterType) => {
	const { authService } = rootService

	return (
		<AuthFormCarousel
			fieldNames={logInFieldNames}
			placeHolders={logInPlaceHolders}
			schema={LogInFormSchema}
			submitFn={authService.logIn}
			defaults={logInDefaults}
			welcomeText={logInWelcomeText}
			switcherText={logInSwitcherText}
			switcherPreBtnText={logInSwitcherPreBtnText}
			setIsLogInForm={setIsLogInForm}
		/>
	)
}

export default LogInForm
