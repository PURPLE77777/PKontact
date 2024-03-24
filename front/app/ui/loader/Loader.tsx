import { ActivityIndicator } from 'react-native'

import { LoaderWrapper } from './LoaderWrapper'

type LoaderType = {
	isLoad: boolean
}

const Loader = ({ isLoad }: LoaderType) => {
	return (
		<LoaderWrapper>
			<ActivityIndicator animating={isLoad} size='large' color='#529ef4' />
		</LoaderWrapper>
	)
}

export default Loader
