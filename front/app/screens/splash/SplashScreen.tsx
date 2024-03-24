import { observer } from 'mobx-react-lite'
import { Text, View } from 'react-native'

const SplashScreen = observer(() => {
	console.log('SplashScreen render')

	return (
		<View>
			<Text>SplashScreen</Text>
		</View>
	)
})

export default SplashScreen
