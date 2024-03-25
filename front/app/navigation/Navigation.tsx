import {
	NavigationContainer,
	useNavigationContainerRef
} from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import { Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import { ThemeEnums } from '@AppTypes/theme.types'

import { useStore } from '@hooks/useStore'

import RootNavigator from './navigators/rootstack/RootNavigator'

const StyledView = styled.View`
	background-color: papayawhip;
`

const StyledText = styled.TouchableOpacity`
	color: #ff0000;
`
const Navigation = observer(() => {
	const { tokenStore, themeStore } = useStore()
	const navigationRef = useNavigationContainerRef()

	const setAccessToken = () => {
		tokenStore.setAccessToken('test token')
	}

	const clearAccessToken = () => {
		tokenStore.setAccessToken(null)
	}

	const changeAppTheme = () => {
		themeStore.setTheme(
			ThemeEnums.DARK === themeStore.theme ? ThemeEnums.LIGHT : ThemeEnums.DARK
		)
	}

	return (
		<>
			<NavigationContainer ref={navigationRef}>
				<RootNavigator />
			</NavigationContainer>
			<StyledView>
				<StyledText>
					<Text>{tokenStore.accessToken}</Text>
				</StyledText>
				<StyledText>
					<Text>{themeStore.theme}</Text>
				</StyledText>
				<StyledText onPress={setAccessToken}>
					<Text>Set access token</Text>
				</StyledText>
				<TouchableOpacity onPress={clearAccessToken}>
					<Text>Clear access token</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={changeAppTheme}>
					<Text>Change theme</Text>
				</TouchableOpacity>
			</StyledView>
		</>
	)
})

export default Navigation
