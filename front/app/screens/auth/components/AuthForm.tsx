import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { RootNavigationProp } from '@navigation/navigators/rootstack/rootstack.types'

import { rootService } from '@services/root.service'

import { useStore } from '@hooks/useStore'

import { useCountRef } from '@utils/refs/count.ref'

import {
	AuthFormSchema,
	AuthFormType,
	SignInOrAuthFormKeyArrays
} from '../types/auth-form.types'
import {
	checkSubmitBtn,
	useCarouselRef,
	useIsSubmitDisableRef
} from '../utils/auth-screen.refs'

import AuthLoader from './AuthHeader'
import FormsFieldsCarousel from './FormsFieldsCarousel'
import {
	AuthWelcomeText,
	ErrorTextSubmit,
	ErrorTextWrapper,
	SubmitButton,
	SubmitButtonWrapper,
	SubmitText
} from './styled'

const AuthForm = () => {
	const {
		control,
		handleSubmit,
		getValues,
		formState: { errors }
	} = useForm<AuthFormType>({
		criteriaMode: 'firstError',
		resolver: zodResolver(AuthFormSchema),
		mode: 'onChange',
		defaultValues: {
			username: 'TestUserName',
			email: 'test@test.com',
			password: 'testMyPassword'
		}
	})
	useCountRef('AuthStackScreen')
	const isNeedCheckSubmitBtnRef = useRef(true)
	const [carouselIndex, setCarouselIndex] = useState(0)
	const isSubmitDisabled = useIsSubmitDisableRef()
	const carouselRef = useCarouselRef()
	const { tokenStore } = useStore()

	const { navigate } = useNavigation<RootNavigationProp>()

	const {
		mutate,
		data: authResult,
		isPending
	} = useMutation({
		mutationFn: async (authFormData: AuthFormType) => {
			const { authService } = rootService
			console.log('submit:', authFormData)
			const data = await authService.signIn(authFormData)
			isSubmitDisabled.current = false
			isNeedCheckSubmitBtnRef.current = true
			return data
		}
	})

	useEffect(() => {
		if (authResult) {
			setTimeout(() => {
				// TODO: set coockie instead of "navigate"
				// navigate('MainSections', {
				// 	screen: 'Home'
				// })
				tokenStore.setAccessToken('test token')
			}, 2000)
		}
	}, [authResult])

	const fieldNames: SignInOrAuthFormKeyArrays = [
		'username',
		'email',
		'password'
	]

	const onSubmit = (data: AuthFormType) => {
		isSubmitDisabled.current = true
		isNeedCheckSubmitBtnRef.current = false
		mutate(data)
	}

	const nextCarouselItem = () => {
		carouselRef.current?.next()
		isSubmitDisabled.current = true
		setCarouselIndex(carouselIndex + 1)
	}

	const placeHolders: Record<keyof AuthFormType, string> = {
		username: 'Enter username',
		email: 'Enter email',
		password: 'Enter password'
	}

	if (isNeedCheckSubmitBtnRef.current) {
		checkSubmitBtn(
			fieldNames[carouselIndex],
			getValues,
			errors,
			isSubmitDisabled
		)
	}

	const error = errors[fieldNames[carouselIndex]],
		isPasswordField = carouselIndex === fieldNames.length - 1

	return (
		<>
			{isPending ? (
				<AuthLoader isLoad={isPending} />
			) : !authResult ? (
				<FormsFieldsCarousel
					control={control}
					errors={errors}
					placeHolders={placeHolders}
					fieldNames={fieldNames}
					carouselRef={carouselRef}
					errorTextShow={false}
				/>
			) : null}

			{error && (
				<ErrorTextWrapper>
					<ErrorTextSubmit>{error.message}</ErrorTextSubmit>
				</ErrorTextWrapper>
			)}

			{!(authResult || isPending) && (
				<SubmitButtonWrapper>
					<SubmitButton
						disabled={isSubmitDisabled.current}
						onPress={() =>
							isPasswordField ? handleSubmit(onSubmit)() : nextCarouselItem()
						}
						activeOpacity={0.7}
					>
						<SubmitText>{isPasswordField ? 'Submit' : 'Next'}</SubmitText>
					</SubmitButton>
				</SubmitButtonWrapper>
			)}

			{authResult && <AuthWelcomeText>WELCOME!</AuthWelcomeText>}
		</>
	)
}

export default AuthForm
