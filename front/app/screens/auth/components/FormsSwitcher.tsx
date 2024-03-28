import { FormSwitcherType } from '../types/auth-form.types'

import {
	FormSwitcherWrapper,
	SwitcherBtn,
	SwitcherPreBtnText,
	SwitcherText
} from './styled'

const FormsSwitcher = ({
	switcherText,
	switcherPreBtnText,
	setIsLogInForm
}: FormSwitcherType) => {
	return (
		<FormSwitcherWrapper>
			<SwitcherPreBtnText>{switcherPreBtnText}</SwitcherPreBtnText>
			<SwitcherBtn
				onPress={() => setIsLogInForm(prev => !prev)}
				activeOpacity={0.7}
			>
				<SwitcherText>{switcherText}</SwitcherText>
			</SwitcherBtn>
		</FormSwitcherWrapper>
	)
}

export default FormsSwitcher
