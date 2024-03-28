import { rootService } from '@services/root.service'

import {
	signInDefaults,
	signInFieldNames,
	signInPlaceHolders,
	signInSwitcherPreBtnText,
	signInSwitcherText,
	signInWelcomeText
} from '../constants/signInForm.constants'
import { FormsSetterType, SignInFormSchema } from '../types/auth-form.types'

import AuthFormCarousel from './FormsStates'

const SignInForm = ({ setIsLogInForm }: FormsSetterType) => {
	const { authService } = rootService

	return (
		<AuthFormCarousel
			fieldNames={signInFieldNames}
			placeHolders={signInPlaceHolders}
			schema={SignInFormSchema}
			submitFn={authService.signIn}
			defaults={signInDefaults}
			welcomeText={signInWelcomeText}
			switcherText={signInSwitcherText}
			switcherPreBtnText={signInSwitcherPreBtnText}
			setIsLogInForm={setIsLogInForm}
		/>
	)
}

export default SignInForm
