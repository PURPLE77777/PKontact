import { Dispatch, SetStateAction } from 'react'
import { Text } from 'react-native'

import { AuthLogInType } from '../types/auth-form.types'

import { SignInWrapper } from './styled'

type FormsSwitcherType = {
	setFormType: Dispatch<SetStateAction<AuthLogInType>>
}

const FormsSwitcher = ({ setFormType }: FormsSwitcherType) => {
	return (
		<SignInWrapper>
			<Text>FormsSwitcher</Text>
		</SignInWrapper>
	)
}

export default FormsSwitcher
