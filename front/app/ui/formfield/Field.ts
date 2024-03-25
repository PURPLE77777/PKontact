import styled from 'styled-components/native'

import { StyledText } from '@ui/text/StyledText'

type FieldType = {
	focus: boolean
}

export const Field = styled.TextInput<FieldType>`
	color: ${({ theme }) => theme.colors.textPrimary};
	border-radius: 10px;
	border: 3px;
	padding: 5px 10px;
	flex: 1;
	font-size: 20px;
	border-color: ${({ theme, focus }) =>
		focus ? theme.colors.focusBorder : theme.colors.blurBorder};
	background-color: ${({ theme }) => theme.colors.bgElement};
`

export const ErrorText = styled(StyledText)`
	margin-top: 10px;
	font-size: 16px;
	color: ${({ theme }) => theme.colors.textError};
`
