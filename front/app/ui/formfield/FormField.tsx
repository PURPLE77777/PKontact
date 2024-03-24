import { useState } from 'react'
import { Controller, FieldValues, Noop } from 'react-hook-form'
import { useTheme } from 'styled-components/native'

import { BaseFieldsProps } from '@AppTypes/field.types'

import { ErrorText, Field } from './Field'

export type FormFieldType<T extends FieldValues> = BaseFieldsProps<T> & {
	placeholder?: string
	errorTextShow?: boolean
}

const FormField = <T extends FieldValues>({
	control,
	name,
	placeholder,
	error,
	errorTextShow
}: FormFieldType<T>) => {
	const [focusField, setFocusField] = useState(false)

	const { colors } = useTheme()

	const changeFieldFocus = () => {
		setFocusField(true)
	}

	const onBlurHandler = (handler: Noop) => {
		setFocusField(false)
		handler()
	}

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onBlur, onChange, value } }) => (
				<>
					<Field
						placeholder={placeholder}
						onBlur={() => onBlurHandler(onBlur)}
						onChangeText={onChange}
						value={value}
						focus={focusField}
						onFocus={changeFieldFocus}
						placeholderTextColor={colors.gray}
					/>
					{errorTextShow && error?.message && <ErrorText>{error.message}</ErrorText>}
				</>
			)}
		/>
	)
}

export default FormField
