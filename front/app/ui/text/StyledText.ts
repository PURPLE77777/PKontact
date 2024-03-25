import styled from 'styled-components/native'

export const StyledText = styled.Text`
	font-family: Ubuntu-Regular;
	font-size: 20px;
	text-align: center;
	color: ${({ theme }) => theme.colors.textPrimary};
`
