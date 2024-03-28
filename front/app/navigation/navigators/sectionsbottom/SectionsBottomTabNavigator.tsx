import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ClipsScreen from '@screens/clips/ClipsScreen'
import HomeScreen from '@screens/home/HomeScreen'
import HubScreen from '@screens/hub/HubScreen'
import MessengerScreen from '@screens/messenger/MessengerScreen'
import MusicScreen from '@screens/music/MusicScreen'

import {
	SectionsBottomTabParamList,
	SectionsBottomTabRouteType
} from './sections.types'

const Tab = createBottomTabNavigator<SectionsBottomTabParamList>()

export const sectionsBottomTabRoutes: SectionsBottomTabRouteType[] = [
	{
		name: 'Home',
		component: HomeScreen
	},
	{
		name: 'Hub',
		component: HubScreen
	},
	{
		name: 'Messenger',
		component: MessengerScreen
	},
	{
		name: 'Clips',
		component: ClipsScreen
	},
	{
		name: 'Music',
		component: MusicScreen
	}
]

const SectionsBottomTabNavigator = () => {
	return (
		<Tab.Navigator initialRouteName='Home'>
			{sectionsBottomTabRoutes.map(({ name, component }) => (
				// TODO: added icons to each screen
				<Tab.Screen key={name} name={name} component={component} />
			))}
		</Tab.Navigator>
	)
}
export default SectionsBottomTabNavigator
