import * as Font from 'expo-font'

export const useFonts = async () =>
	await Font.loadAsync({
		'Ubuntu-Bold': require('@assets/fonts/Ubuntu/Ubuntu-Bold.ttf'),
		'Ubuntu-Medium': require('@assets/fonts/Ubuntu/Ubuntu-Medium.ttf'),
		'Ubuntu-Regular': require('@assets/fonts/Ubuntu/Ubuntu-Regular.ttf'),
		'Comfortaa-Regular': require('@assets/fonts/Comfortaa/Comfortaa-Regular.ttf'),
		'Comfortaa-Light': require('@assets/fonts/Comfortaa/Comfortaa-Light.ttf'),
		'Comfortaa-Medium': require('@assets/fonts/Comfortaa/Comfortaa-Medium.ttf'),
		'Comfortaa-SemiBold': require('@assets/fonts/Comfortaa/Comfortaa-SemiBold.ttf'),
		'Comfortaa-Bold': require('@assets/fonts/Comfortaa/Comfortaa-Bold.ttf')
	})
