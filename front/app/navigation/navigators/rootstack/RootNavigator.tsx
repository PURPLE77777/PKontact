import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'


import { useFonts } from '@hooks/useFonts'
import { useStore } from '@hooks/useStore'

import MainStackNavigator from '../mainstack/MainStackNavigator'
import SectionsBottomTabNavigator from '../sectionsbottom/SectionsBottomTabNavigator'

import { rootService } from '@services/root.service'
import {
	RootNavigationProp,
	RootStackParamList,
	RootStackRouteType
} from './rootstack.types'

const Stack = createStackNavigator<RootStackParamList>()

const rootRoutes: RootStackRouteType[] = [
	{
		name: 'MainStack',
		component: MainStackNavigator
	},
	{
		name: 'MainSections',
		component: SectionsBottomTabNavigator
	}
]

const RootNavigator = () => {
	const { tokenStore } = useStore()

	const { navigate } = useNavigation<RootNavigationProp>()
	const fontLoaded = useRef(false)

	const { isFetching } = useQuery({
		queryKey: ['check-auth'],
		queryFn: async () => {
			const { authService } = rootService
			const data = await authService.checkAuth()
			return data
		}
	})

	const navigateByAccessToken = () => {
		tokenStore.accessToken
			? navigate('MainSections', {
				screen: 'Home'
			})
			: navigate('MainStack', {
				screen: 'Auth'
			})
	}

	useEffect(() => {
		const loadFonts = async () => {
			if (!fontLoaded.current) {
				try {
					await useFonts()
					// await new Promise(resolve => setTimeout(resolve, 1000))
				} catch (e) {
					console.warn(e)
				} finally {
					fontLoaded.current = true
				}
			}
		}
		loadFonts()
	}, [])

	useEffect(() => {
		if (!isFetching && fontLoaded.current) {
			navigateByAccessToken()
		}
	}, [isFetching, fontLoaded.current, tokenStore.accessToken])

	return (
		<Stack.Navigator initialRouteName={'MainStack'}>
			{rootRoutes.map(({ name, component }) => (
				<Stack.Screen key={name} name={name} component={component} />
			))}
		</Stack.Navigator>
	)
}

export default RootNavigator
