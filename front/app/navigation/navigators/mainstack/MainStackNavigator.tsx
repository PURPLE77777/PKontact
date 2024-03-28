import { createStackNavigator } from '@react-navigation/stack'

import AuthStackScreen from '@screens/auth/AuthStackScreen'
import SplashScreen from '@screens/splash/SplashScreen'

import { MainStackParamList, MainStackRouteType } from './mainstack.types'

const Stack = createStackNavigator<MainStackParamList>()

const mainStackRoutes: MainStackRouteType[] = [
	{
		name: 'Auth',
		component: AuthStackScreen
	},
	{
		name: 'Splash',
		component: SplashScreen
	}
]

const MainStackNavigator = () => {
	return (
		<Stack.Navigator initialRouteName='Splash'>
			{mainStackRoutes.map(({ name, component }) => (
				<Stack.Screen key={name} name={name} component={component} />
			))}
		</Stack.Navigator>
	)
}

export default MainStackNavigator
