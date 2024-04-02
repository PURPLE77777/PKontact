import {
	AntDesign,
	Entypo,
	FontAwesome,
	FontAwesome5,
	Fontisto,
	Foundation,
	Ionicons,
	MaterialCommunityIcons
} from '@expo/vector-icons'
import { ReactElement } from 'react'

import { FamiliesType, FamilyIconNameType } from './icon.type'

type IconPropsType<T extends FamiliesType> = {
	family: T
	name: FamilyIconNameType<T>
	size: number
	color: string
}

const Icon = <T extends FamiliesType>({
	family,
	name,
	size,
	color
}: IconPropsType<T>) => {
	const unknownIcon = (
		<FontAwesome5
			name={name as keyof typeof FontAwesome5.glyphMap}
			size={size}
			color={color}
		/>
	)

	const iconsByFamily: Partial<Record<FamiliesType, ReactElement>> = {
		AntDesign: (
			<AntDesign
				name={name as keyof typeof AntDesign.glyphMap}
				size={size}
				color={color}
			/>
		),
		Entypo: (
			<Entypo
				name={name as keyof typeof Entypo.glyphMap}
				size={size}
				color={color}
			/>
		),
		FontAwesome: (
			<FontAwesome
				name={name as keyof typeof FontAwesome.glyphMap}
				size={size}
				color={color}
			/>
		),
		FontAwesome5: (
			<FontAwesome5
				name={name as keyof typeof FontAwesome.glyphMap}
				size={size}
				color={color}
			/>
		),
		Fontisto: (
			<Fontisto
				name={name as keyof typeof Fontisto.glyphMap}
				size={size}
				color={color}
			/>
		),
		Foundation: (
			<Foundation
				name={name as keyof typeof Foundation.glyphMap}
				size={size}
				color={color}
			/>
		),
		Ionicons: (
			<Ionicons
				name={name as keyof typeof Ionicons.glyphMap}
				size={size}
				color={color}
			/>
		),
		MaterialCommunityIcons: (
			<MaterialCommunityIcons
				name={name as keyof typeof MaterialCommunityIcons.glyphMap}
				size={size}
				color={color}
			/>
		)
		// EvilIcons: unknownIcon,
		// Feather: unknownIcon,
		// FontAwesome6: unknownIcon,
		// MaterialIcons: unknownIcon,
		// Octicons: unknownIcon,
		// SimpleLineIcons: unknownIcon,
		// Zocial: unknownIcon
	}

	return iconsByFamily[family] || unknownIcon
}

export default Icon
