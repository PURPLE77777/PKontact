import { Control, FieldError, FieldValues, Path } from 'react-hook-form'

export type BaseFieldsProps<T extends FieldValues> = {
	name: Path<T>
	control: Control<T>
	error: FieldError | undefined
}
