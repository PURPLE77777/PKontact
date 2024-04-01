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

import { IconsFamilyEnum, IconsFamilyType, IconsType } from './icon.type'

type IconPropsType = {
	family: IconsFamilyType
	name: IconsType
	size: number
	color: string
}

const IconElement = ({ family, ...iconProps }: IconPropsType) => {
	switch (family) {
		case IconsFamilyEnum.ANTDESIGN:
			return <AntDesign {...iconProps} />
		case IconsFamilyEnum.ENTYPO:
			return <Entypo />
		case IconsFamilyEnum.FONTAWESOME:
			return <FontAwesome />
		case IconsFamilyEnum.FONTAWESOME5:
			return <FontAwesome5 />
		case IconsFamilyEnum.FONTISTO:
			return <Fontisto />
		case IconsFamilyEnum.FOUNDATION:
			return <Foundation />
		case IconsFamilyEnum.IONICONS:
			return <Ionicons />
		case IconsFamilyEnum.MATERIALCOMMUNITYICONS:
			return <MaterialCommunityIcons />
		default:
			;<FontAwesome5 />
	}
}

export default IconElement
