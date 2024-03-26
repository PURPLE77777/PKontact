import { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

import LogInForm from './LogInForm'
import SignInForm from './SignInForm'
import { FormSwitcherWrapper, SwitcherText } from './styled'

const FormsSwitcher = () => {
	const [isLogInForm, setIsLogInForm] = useState(true)
	return (
		<>
			{isLogInForm ? <LogInForm /> : <SignInForm />}

			<FormSwitcherWrapper>
				<TouchableOpacity onPress={() => setIsLogInForm(!isLogInForm)}>
					<SwitcherText>{isLogInForm ? 'Sign in' : 'Log in'}</SwitcherText>
				</TouchableOpacity>
			</FormSwitcherWrapper>
		</>
	)
}

export default FormsSwitcher
