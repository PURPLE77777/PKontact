import 'styled-components/native'

declare module 'styled-components/native' {
	export interface DefaultTheme {
		colors: {
			gray: string
			textPrimary: string
			textSecondary: string
			textError: string
			bgLayout: string
			bgContainer: string
			bgElement: string
			focusBorder: string
			blurBorder: string
			buttonPrimaryForeground: string
		}
	}
}
