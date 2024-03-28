import { ComponentType } from 'react'

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
}
