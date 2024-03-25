import { ComponentType } from 'react'

export type SectionsBottomTabParamList = {
	Chats: undefined
	Home: undefined

	// Profile: { userId: string }
	// Feed: { sort: 'latest' | 'top' } | undefined
}

export type SectionsBottomTabRouteType = {
	name: keyof SectionsBottomTabParamList
	component: ComponentType
}
