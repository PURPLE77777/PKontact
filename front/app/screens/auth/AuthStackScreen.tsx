import { StackScreenProps } from '@react-navigation/stack'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { MainStackParamList } from '@navigation/navigators/mainstack/mainstack.types'

import SignInForm from './components/SignInForm'
import {
	AuthContainer,
	AuthHeaderWrapper,
	FormContainer,
	HeaderContainer,
	Logo,
	LogoText
} from './components/styled'
import { ActiveAuthFormType } from './types/auth-form.types'

type AuthScreenProps = StackScreenProps<MainStackParamList, 'Auth'>

const AuthStackScreen = observer(({ route, navigation }: AuthScreenProps) => {
	const [formType, setFormType] = useState<ActiveAuthFormType>('auth')

	return (
		<AuthContainer>
			<FormContainer>
				<AuthHeaderWrapper>
					<HeaderContainer>
						<Logo
							source={require('@assets/images/pk_logo.png')}
							resizeMode='contain'
						/>
						<LogoText>ontact</LogoText>
					</HeaderContainer>
				</AuthHeaderWrapper>

				<SignInForm />
			</FormContainer>
		</AuthContainer>
	)
})

export default AuthStackScreen
