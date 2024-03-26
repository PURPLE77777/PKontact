import { StackScreenProps } from '@react-navigation/stack'
import { observer } from 'mobx-react-lite'

import { MainStackParamList } from '@navigation/navigators/mainstack/mainstack.types'

import FormsSwitcher from './components/FormsSwitcher'
import {
	AuthContainer,
	AuthHeaderWrapper,
	FormContainer,
	HeaderContainer,
	Logo,
	LogoText
} from './components/styled'

type AuthScreenProps = StackScreenProps<MainStackParamList, 'Auth'>

const AuthStackScreen = observer(({ route, navigation }: AuthScreenProps) => {
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

				<FormsSwitcher />
			</FormContainer>
		</AuthContainer>
	)
})

export default AuthStackScreen
