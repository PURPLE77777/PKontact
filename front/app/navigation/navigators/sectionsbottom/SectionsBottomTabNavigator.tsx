import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ChatsScreen from '@screens/chats/ChatsScreen'
import HomeScreen from '@screens/home/HomeScreen'

import {
	SectionsBottomTabParamList,
	SectionsBottomTabRouteType
} from './sections.types'

const Tab = createBottomTabNavigator<SectionsBottomTabParamList>()

export const sectionsBottomTabRoutes: SectionsBottomTabRouteType[] = [
	{
		name: 'Chats',
		component: ChatsScreen
	},
	{
		name: 'Home',
		component: HomeScreen
	}
]

const SectionsBottomTabNavigator = () => {
	return (
		<Tab.Navigator initialRouteName='Home'>
			{sectionsBottomTabRoutes.map(({ name, component }) => (
				<Tab.Screen key={name} name={name} component={component} />
			))}
		</Tab.Navigator>
	)
}
export default SectionsBottomTabNavigator
