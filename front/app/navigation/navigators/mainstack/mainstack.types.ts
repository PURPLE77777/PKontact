import { ComponentType } from 'react'

export type MainStackParamList = {
	Auth: undefined
	Main: undefined
	Splash: undefined
}

export type MainStackRouteType = {
	name: keyof MainStackParamList
	component: ComponentType<any>
}
