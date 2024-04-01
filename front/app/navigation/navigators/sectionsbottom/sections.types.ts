import { ComponentType } from 'react'

import { IconsType } from '@ui/icon/icon.type'

export type SectionsBottomTabParamList = {
	Home: undefined
	Hub: undefined
	Messenger: undefined
	Clips: undefined
	Music: undefined
	// Profile: { userId: string }
	// Feed: { sort: 'latest' | 'top' } | undefined
}

export type SectionsBottomTabRouteType = {
	name: keyof SectionsBottomTabParamList
	component: ComponentType<any>
	iconName: IconsType
}
