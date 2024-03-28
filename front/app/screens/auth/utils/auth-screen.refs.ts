import { MutableRefObject, useRef } from 'react'
import {
	FieldError,
	FieldErrors,
	Path,
	UseFormGetValues
} from 'react-hook-form'
import { ICarouselInstance } from 'react-native-reanimated-carousel'

import { FormsTypes } from '../types/auth-form.types'

export const useCarouselRef = () => {
	const isCanNotNextPageRef = useRef<ICarouselInstance | null>(null)
	return isCanNotNextPageRef
}

export const useCurrentCarouselIndex = () => {
	const currentCarouselIndexRef = useRef(0)
	return currentCarouselIndexRef
}

export const useIsSubmitDisableRef = () => {
	const isSubmitDisabled = useRef(true)
	return isSubmitDisabled
}

export const checkSubmitBtn = <T extends FormsTypes>(
	fieldName: keyof T,
	getValues: UseFormGetValues<T>,
	errors: FieldErrors<T>,
	isSubmitDisabled: MutableRefObject<boolean>
) => {
	const currentFieldValue = getValues(fieldName as Path<T>)
	if (currentFieldValue && !(errors[fieldName] as FieldError)) {
		isSubmitDisabled.current = false
	} else {
		isSubmitDisabled.current = true
	}
}
