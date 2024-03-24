import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Navigation from '@navigation/Navigation'

import Theme from '@providers/Theme'
import { RootStoreContext } from '@providers/store.provider'

import { rootStore } from '@store/root.store'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RootStoreContext.Provider value={rootStore}>
				<Theme>
					<Navigation />
				</Theme>
			</RootStoreContext.Provider>
		</QueryClientProvider>
	)
}
