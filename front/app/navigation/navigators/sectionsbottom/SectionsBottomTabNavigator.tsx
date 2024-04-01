import { Feather, MaterialIcons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClipsScreen from '@screens/clips/ClipsScreen';
import HomeScreen from '@screens/home/HomeScreen';
import HubScreen from '@screens/hub/HubScreen';
import MessengerScreen from '@screens/messenger/MessengerScreen';
import MusicScreen from '@screens/music/MusicScreen';

import { ComponentElement } from 'react';
import {
	SectionsBottomTabParamList,
	SectionsBottomTabRouteType
} from './sections.types';

const Tab = createBottomTabNavigator<SectionsBottomTabParamList>()

const sectionsBottomTabRoutes: SectionsBottomTabRouteType[] = [
	{
		name: 'Home',
		component: HomeScreen,
		iconName: ''
	},
	{
		name: 'Hub',
		component: HubScreen,
		iconName: ''
	},
	{
		name: 'Messenger',
		component: MessengerScreen,
		iconName: ''
	},
	{
		name: 'Clips',
		component: ClipsScreen,
		iconName: ''
	},
	{
		name: 'Music',
		component: MusicScreen,
		iconName: ''
	}
]

const routeIcons: Record<keyof SectionsBottomTabParamList, ComponentElement<any, any>> = {
	Home: <Octicons name="home" size={24} color="black" />,
	Hub: ,
	Messenger: <Feather name="message-circle" size={24} color="black" />,
	Clips: <Octicons name="video" size={24} color="black" />,
	Music: <MaterialIcons name="queue-music" size={24} color="black" />
}

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
