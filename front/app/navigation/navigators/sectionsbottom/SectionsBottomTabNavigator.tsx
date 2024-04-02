import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { observer } from 'mobx-react-lite'

import { darkTheme, lightTheme } from '@constants/theme.constants'

import { ThemeEnums } from '@AppTypes/theme.types'

import ClipsScreen from '@screens/clips/ClipsScreen'
import HomeScreen from '@screens/home/HomeScreen'
import HubScreen from '@screens/hub/HubScreen'
import MessengerScreen from '@screens/messenger/MessengerScreen'
import MusicScreen from '@screens/music/MusicScreen'

import { useStore } from '@hooks/useStore'

import Icon from '@ui/icon/Icon'
import { FamilyIconNameType, IconsFamilyEnum } from '@ui/icon/icon.type'

import {
	SectionsBottomTabParamList,
	SectionsBottomTabRouteType
} from './sections.types'

const Tab = createBottomTabNavigator<SectionsBottomTabParamList>()

const homeIcon: FamilyIconNameType<IconsFamilyEnum.ENTYPO> = 'home',
	hubIcon: FamilyIconNameType<IconsFamilyEnum.FEATHER> = 'grid',
	messengerIcon: FamilyIconNameType<IconsFamilyEnum.FEATHER> = 'message-circle',
	clipsIcon: FamilyIconNameType<IconsFamilyEnum.MATERIALCOMMUNITYICONS> =
		'clippy',
	musicIcon: FamilyIconNameType<IconsFamilyEnum.MATERIALCOMMUNITYICONS> =
		'music-box-multiple-outline'

const sectionsBottomTabRoutes: SectionsBottomTabRouteType[] = [
	{
		name: 'Home',
		component: HomeScreen,
		iconFamily: IconsFamilyEnum.ENTYPO,
		iconName: homeIcon
	},
	{
		name: 'Hub',
		component: HubScreen,
		iconFamily: IconsFamilyEnum.FEATHER,
		iconName: hubIcon
	},
	{
		name: 'Messenger',
		component: MessengerScreen,
		iconFamily: IconsFamilyEnum.FEATHER,
		iconName: messengerIcon
	},
	{
		name: 'Clips',
		component: ClipsScreen,
		iconFamily: IconsFamilyEnum.MATERIALCOMMUNITYICONS,
		iconName: clipsIcon
	},
	{
		name: 'Music',
		component: MusicScreen,
		iconFamily: IconsFamilyEnum.ENTYPO,
		iconName: musicIcon
	}
]

// const routeIcons: Record<keyof SectionsBottomTabParamList, ComponentElement<any, any>> = {
// 	Home: <Octicons name="home" size={24} color="black" />,
// 	Hub: ,
// 	Messenger: <Feather name="message-circle" size={24} color="black" />,
// 	Clips: <Octicons name="video" size={24} color="black" />,
// 	Music: <MaterialIcons name="queue-music" size={24} color="black" />
// }

const SectionsBottomTabNavigator = observer(() => {
	const { themeStore } = useStore()

	return (
		<Tab.Navigator
			initialRouteName='Home'
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					const tabItem = sectionsBottomTabRoutes.find(
						({ name }) => name === route.name
					)
					const iconsProps: { size: number; color: string } = { size, color }

					if (tabItem) {
						return (
							<Icon
								family={tabItem.iconFamily}
								name={tabItem.iconName}
								{...iconsProps}
							/>
						)
					}

					return (
						<FontAwesome
							name={'question-circle-o'}
							{...iconsProps}
						/>
					)

					// if (route.name === 'Home') {
					// 	iconName = focused
					// 		? 'ios-information-circle'
					// 		: 'ios-information-circle-outline';
					// } else if (route.name === 'Settings') {
					// 	iconName = focused ? 'ios-list' : 'ios-list-outline';
					// }

					// You can return any component that you like here!
				},
				tabBarActiveTintColor:
					themeStore.theme === ThemeEnums.DARK
						? darkTheme.colors.focus
						: lightTheme.colors.gray,
				tabBarInactiveTintColor:
					themeStore.theme === ThemeEnums.DARK
						? darkTheme.colors.focus
						: lightTheme.colors.gray
			})}
		>
			{sectionsBottomTabRoutes.map(({ name, component }) => (
				<Tab.Screen
					key={name}
					name={name}
					component={component}
				/>
			))}
		</Tab.Navigator>
	)
})
export default SectionsBottomTabNavigator
