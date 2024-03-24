import Loader from '@ui/loader/Loader'

import { StyledAuthLoader } from './styled'

type AuthLoaderType = {
	isLoad: boolean
}

const AuthLoader = ({ isLoad }: AuthLoaderType) => {
	return (
		<StyledAuthLoader>
			<Loader isLoad={isLoad} />
		</StyledAuthLoader>
	)
}

export default AuthLoader
