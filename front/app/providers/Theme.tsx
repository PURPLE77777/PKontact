import { observer } from 'mobx-react-lite'
import { FC, PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components/native'

import { darkTheme, lightTheme } from '@constants/theme.constants'

import { ThemeEnums } from '@AppTypes/theme.types'

import { useStore } from '@hooks/useStore'

const Theme: FC<PropsWithChildren> = observer(({ children }) => {
	const { themeStore } = useStore()

	return (
		<ThemeProvider
			theme={themeStore.theme === ThemeEnums.DARK ? darkTheme : lightTheme}
		>
			{children}
		</ThemeProvider>
	)
})

export default Theme
