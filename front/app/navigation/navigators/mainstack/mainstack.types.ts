import { ComponentType } from 'react'

export type MainStackParamList = {
	Auth: undefined
	Splash: undefined
}

export type MainStackRouteType = {
	name: keyof MainStackParamList
	component: ComponentType<any>
}
