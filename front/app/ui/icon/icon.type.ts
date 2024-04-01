import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import * as Families from '@expo/vector-icons'

type MaterialCommunityIconsGlyph = keyof typeof MaterialCommunityIcons.glyphMap

type FamiliesType = keyof typeof Families

// export type IconsFamilyType =
// 	| keyof typeof MaterialCommunityIcons.glyphMap
// 	| keyof typeof Ionicons.glyphMap
// 	| keyof typeof FontAwesome.glyphMap
// 	| keyof typeof AntDesign.glyphMap
// 	| keyof typeof Foundation.glyphMap
// 	| keyof typeof Entypo.glyphMap
// 	| keyof typeof FontAwesome5.glyphMap
// 	| keyof typeof Fontisto.glyphMap
export type IconsFamilyType<T extends FamiliesType> =
	keyof (typeof Families)[T]['glyphMap']

export enum IconsFamilyEnum {
	ANTDESIGN = 'AntDesign',
	ENTYPO = 'Entypo',
	FONTAWESOME = 'FontAwesome',
	FONTAWESOME5 = 'FontAwesome5',
	FONTISTO = 'Fontisto',
	FOUNDATION = 'Foundation',
	IONICONS = 'Ionicons',
	MATERIALCOMMUNITYICONS = 'MaterialCommunityIcons'
}

const vfsv: IconsFamilyType<'AntDesign'> = 'bells'
vfsv
// export type iconsGlyphs = {
// 	[index in IconsFamilyEnum]: IconsFamilyType
// }

// const icon: iconsGlyphs = {
// 	AntDesign: 'areachart'
// }

export type AntDesignType = keyof typeof AntDesign.glyphMap
export type MaterialCommunityIconsType =
	keyof typeof MaterialCommunityIcons.glyphMap

export type IconsType = AntDesignType | MaterialCommunityIconsType
