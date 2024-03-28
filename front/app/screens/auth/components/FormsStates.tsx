import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { DefaultValues, FieldError, useForm } from 'react-hook-form'
import { z } from 'zod'

import { RootNavigationProp } from '@navigation/navigators/rootstack/rootstack.types'

import { AuthResponse } from '@services/types/auth.types'

import { useStore } from '@hooks/useStore'

import { useCountRef } from '@utils/refs/count.ref'

import {
	FormsSetterType,
	FormsTypes,
	LogInOrSignInFormKeyArray,
	SwitcherTexts
} from '../types/auth-form.types'
import {
	checkSubmitBtn,
	useCarouselRef,
	useIsSubmitDisableRef
} from '../utils/auth-screen.refs'

import AuthLoader from './AuthHeader'
import FormsFieldsCarousel from './FormsFieldsCarousel'
import FormsSwitcher from './FormsSwitcher'
import {
	AuthWelcomeText,
	ErrorTextSubmit,
	ErrorTextWrapper,
	SubmitButton,
	SubmitButtonWrapper,
	SubmitText
} from './styled'

type FormsStatesType<T extends FormsTypes> = {
	fieldNames: LogInOrSignInFormKeyArray<T>
	placeHolders: Record<keyof T, string>
	schema: z.AnyZodObject
	submitFn: (data: T) => Promise<AuthResponse>
	welcomeText?: string
	defaults?: DefaultValues<T> | undefined
}

const AuthFormCarousel = <T extends FormsTypes>({
	fieldNames,
	placeHolders,
	schema,
	submitFn,
	welcomeText,
	defaults,
	switcherText,
	switcherPreBtnText,
	setIsLogInForm
}: FormsStatesType<T> & FormsSetterType & SwitcherTexts) => {
	const {
		control,
		handleSubmit,
		getValues,
		formState: { errors }
	} = useForm<T>({
		criteriaMode: 'firstError',
		resolver: zodResolver(schema),
		mode: 'onChange',
		defaultValues: defaults
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
		mutationFn: async (formData: T) => {
			console.log('submit:', formData)
			const data = await submitFn(formData)
			isSubmitDisabled.current = false
			isNeedCheckSubmitBtnRef.current = true
			return data.result
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

	const onSubmit = (formData: T) => {
		isSubmitDisabled.current = true
		isNeedCheckSubmitBtnRef.current = false
		mutate(formData)
	}

	const nextCarouselItem = () => {
		carouselRef.current?.next()
		isSubmitDisabled.current = true
		setCarouselIndex(carouselIndex + 1)
	}

	if (isNeedCheckSubmitBtnRef.current) {
		checkSubmitBtn<T>(
			fieldNames[carouselIndex],
			getValues,
			errors,
			isSubmitDisabled
		)
	}

	const error = errors[fieldNames[carouselIndex]] as FieldError,
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

			{authResult && <AuthWelcomeText>{welcomeText}</AuthWelcomeText>}

			{!(isPending || authResult) && (
				<FormsSwitcher
					switcherText={switcherText}
					switcherPreBtnText={switcherPreBtnText}
					setIsLogInForm={setIsLogInForm}
				/>
			)}
		</>
	)
}

export default AuthFormCarousel
