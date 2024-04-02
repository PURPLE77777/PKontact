import * as Families from '@expo/vector-icons'
import {
	AntDesign,
	Entypo,
	Feather,
	FontAwesome,
	Fontisto,
	Foundation,
	Ionicons,
	MaterialCommunityIcons
} from '@expo/vector-icons'

type AntDesignGlyphMap = keyof typeof AntDesign.glyphMap
type MaterialCommunityIconsGlyphMap =
	keyof typeof MaterialCommunityIcons.glyphMap
type IoniconsGlyphMap = keyof typeof Ionicons.glyphMap
type FontAwesomeGlyphMap = keyof typeof FontAwesome.glyphMap
type FoundationGlyphMap = keyof typeof Foundation.glyphMap
type EntypoGlyphMap = keyof typeof Entypo.glyphMap
type FontistoGlyphMap = keyof typeof Fontisto.glyphMap
type FeatherGlyphMap = keyof typeof Feather.glyphMap

export type FamiliesType = Exclude<
	keyof typeof Families,
	| 'createIconSet'
	| 'createIconSetFromIcoMoon'
	| 'createMultiStyleIconSet'
	| 'createIconSetFromFontello'
>
export type FamilyType<T extends FamiliesType> = T

export type IconNamesType =
	| MaterialCommunityIconsGlyphMap
	| IoniconsGlyphMap
	| FontAwesomeGlyphMap
	| AntDesignGlyphMap
	| FoundationGlyphMap
	| EntypoGlyphMap
	| FontistoGlyphMap
	| FeatherGlyphMap
export type FamilyIconNameType<T extends FamiliesType> =
	keyof (typeof Families)[T]['glyphMap']

export enum IconsFamilyEnum {
	ANTDESIGN = 'AntDesign',
	ENTYPO = 'Entypo',
	FONTAWESOME = 'FontAwesome',
	FONTISTO = 'Fontisto',
	FOUNDATION = 'Foundation',
	IONICONS = 'Ionicons',
	MATERIALCOMMUNITYICONS = 'MaterialCommunityIcons',
	FEATHER = 'Feather'
}

// export type iconsGlyphs = {
// 	[index in IconsFamilyEnum]: IconsFamilyType
// }

// const icon: iconsGlyphs = {
// 	AntDesign: 'areachart'
// }
