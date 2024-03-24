import { NavigationProp, NavigatorScreenParams } from '@react-navigation/native'
import { ComponentType } from 'react'

import { MainStackParamList } from '../mainstack/mainstack.types'
import { SectionsBottomTabParamList } from '../sectionsbottom/sections.types'

export type RootStackParamList = {
	MainStack: NavigatorScreenParams<MainStackParamList>
	MainSections: NavigatorScreenParams<SectionsBottomTabParamList>
}

export type RootStackRouteType = {
	name: keyof RootStackParamList
	component: ComponentType
}

export type RootNavigationProp = NavigationProp<RootStackParamList>
