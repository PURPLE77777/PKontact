import { MutableRefObject } from 'react'
import { Control, FieldErrors, FieldValues } from 'react-hook-form'
import { useWindowDimensions } from 'react-native'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'

import FormField from '@ui/formfield/FormField'

import { AuthForm } from '../types/auth-form.types'

import { CarouselWrapper } from './styled'

type AuthFieldsCarouselProps<T extends FieldValues> = {
	control: Control<T>
	errors: FieldErrors<T>
	placeHolders: Record<keyof T, string>
	carouselRef: MutableRefObject<ICarouselInstance | null>
	fieldNames: (keyof T)[]
	errorTextShow
}

const AuthFieldsCarousel = ({
	control,
	errors,
	carouselRef,
	fieldNames,
	placeHolders,
	errorTextShow
}: AuthFieldsCarouselProps<AuthForm>) => {
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
						name={item}
						control={control}
						error={errors[item]}
						placeholder={placeHolders?.[item]}
						errorTextShow={errorTextShow}
					/>
				)}
			/>
		</CarouselWrapper>
	)
}

export default AuthFieldsCarousel
