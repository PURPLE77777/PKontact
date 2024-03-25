import { useContext } from 'react'

import { RootStoreContext } from '@providers/store.provider'

import { RootStore } from '@store/root.store'

export const useStore = (): RootStore => {
	const rootStore = useContext(RootStoreContext)
	return rootStore
}
