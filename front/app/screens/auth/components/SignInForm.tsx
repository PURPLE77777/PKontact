import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { RootNavigationProp } from '@navigation/navigators/rootstack/rootstack.types'

import { rootService } from '@services/root.service'

import { useStore } from '@hooks/useStore'

import { useCountRef } from '@utils/refs/count.ref'

import { SignInSchema, SignInType } from '../types/auth-form.types'
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

const SignInForm = () => {
	const {
		control,
		handleSubmit,
		getValues,
		formState: { errors }
	} = useForm<SignInType>({
		criteriaMode: 'firstError',
		resolver: zodResolver(SignInSchema),
		mode: 'onChange',
		defaultValues: {
			emailUsername: 'TestUserName', // 'test@test.com'
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
		mutationFn: async (signFormData: SignInType) => {
			const { authService } = rootService
			const data = await authService.logIn(signFormData)
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

	const fieldNames: (keyof SignInType)[] = ['emailUsername', 'password']

	const onSubmit = (data: SignInType) => {
		isSubmitDisabled.current = true
		isNeedCheckSubmitBtnRef.current = false
		mutate(data)
	}

	const nextCarouselItem = () => {
		carouselRef.current?.next()
		isSubmitDisabled.current = true
		setCarouselIndex(carouselIndex + 1)
	}

	const placeHolders: Record<keyof SignInType, string> = {
		emailUsername: 'Enter username or email',
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

			{authResult && <AuthWelcomeText>WELCOME BACK!</AuthWelcomeText>}
		</>
	)
}

export default SignInForm
