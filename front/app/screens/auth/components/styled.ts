import styled from 'styled-components/native'

import { StyledTouchableOpacity } from '@ui/button/StyledButton'
import { Container } from '@ui/container/Container'
import { ErrorText } from '@ui/formfield/Field'
import { Layout } from '@ui/layout/Layout'
import { LoaderWrapper } from '@ui/loader/LoaderWrapper'
import { StyledText } from '@ui/text/StyledText'

// Containers

export const AuthContainer = styled(Layout)`
	align-content: center;
	justify-content: center;
`

export const FormContainer = styled(Container)`
	margin: 20px;
	padding: 20px;
	border-radius: 10px;
	justify-content: space-between;
`
//////////

// Auth Header
export const AuthHeaderWrapper = styled.View`
	justify-content: space-between;
`

export const HeaderContainer = styled.View`
	flex-direction: row;
	justify-content: center;
	height: 60px;
`

export const Logo = styled.Image`
	width: 120px;
	height: 100%;
`

export const LogoText = styled(StyledText)`
	font-size: 60px;
`
//////////

// Carousel
export const CarouselWrapper = styled.View`
	height: 50px;
	margin: 20px 0px 0px;
`
//////////

// FormsSwitcher
export const FormSwitcherWrapper = styled.View`
	padding: 0px 10px;
	margin-top: 20px;
	align-items: center;
	flex-direction: row;
`

export const SwitcherPreBtnText = styled(StyledText)`
	color: ${({ theme }) => theme.colors.textPrimary};
`

export const SwitcherBtn = styled.TouchableOpacity`
	flex-direction: row;
	margin-left: 10px;
`

export const SwitcherText = styled(StyledText)`
	color: ${({ theme }) => theme.colors.focus};
`
//////////

// ErrorText
export const ErrorTextWrapper = styled.View`
	margin-top: 10px;
	align-items: flex-start;
`

export const ErrorTextSubmit = styled(ErrorText)`
	margin: 0px;
`
//////////

// AuthLoader
export const StyledAuthLoader = styled(LoaderWrapper)`
	margin-top: 20px;
`
//////////

// Submit buttons
export const SubmitButtonWrapper = styled.View`
	justify-content: space-between;
	margin-top: 20px;
`

export const SubmitText = styled(StyledText)`
	text-align: center;
	color: ${({ theme }) => theme.colors.textSecondary};
`

export const SubmitButton = styled(StyledTouchableOpacity)`
	opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
	background-color: ${({ theme }) => theme.colors.buttonPrimaryForeground};
`
//////////

// Welcome text
export const AuthWelcomeText = styled(StyledText)`
	margin-top: 20px;
	font-size: 40px;
`
//////////
