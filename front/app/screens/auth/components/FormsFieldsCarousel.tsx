import { MutableRefObject } from 'react'
import { Control, FieldError, FieldErrors, Path } from 'react-hook-form'
import { useWindowDimensions } from 'react-native'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'

import FormField from '@ui/formfield/FormField'

import {
	FormsTypes,
	LogInOrSignInFormKeyArrays
} from '../types/auth-form.types'

import { CarouselWrapper } from './styled'

type FormsFieldsCarouselProps<T extends FormsTypes> = {
	control: Control<T>
	errors: FieldErrors<T>
	placeHolders: Record<keyof T, string>
	carouselRef: MutableRefObject<ICarouselInstance | null>
	fieldNames: LogInOrSignInFormKeyArrays<T>
	errorTextShow: boolean
}

const FormsFieldsCarousel = <T extends FormsTypes>({
	control,
	errors,
	carouselRef,
	fieldNames,
	placeHolders,
	errorTextShow
}: FormsFieldsCarouselProps<T>) => {
	const { width } = useWindowDimensions()

	return (
		<CarouselWrapper>
			<Carousel
				ref={carouselRef}
				data={fieldNames}
				// style={{ backgroundColor: 'rgba(55,55,55,0.5)' }}
				width={width - 80}
				// height={80}
				mode='parallax'
				modeConfig={{
					parallaxScrollingScale: 1,
					parallaxScrollingOffset: 50,
					parallaxAdjacentItemScale: 0.5
				}}
				enabled={false}
				renderItem={({ index, item }) => (
					<FormField
						key={index}
						name={item as Path<T>}
						control={control}
						error={errors[item as string] as FieldError}
						placeholder={placeHolders?.[item]}
						errorTextShow={errorTextShow}
					/>
				)}
			/>
		</CarouselWrapper>
	)
}

export default FormsFieldsCarousel
