import { useState } from 'react'

import LogInForm from './LogInForm'
import SignInForm from './SignInForm'

const FormsContainer = () => {
	const [isLogInForm, setIsLogInForm] = useState(true)
	return (
		<>
			{isLogInForm ? (
				<LogInForm setIsLogInForm={setIsLogInForm} />
			) : (
				<SignInForm setIsLogInForm={setIsLogInForm} />
			)}
		</>
	)
}

export default FormsContainer
