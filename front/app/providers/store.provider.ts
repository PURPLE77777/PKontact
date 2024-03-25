import { createContext } from 'react'

import { RootStore, rootStore } from '@store/root.store'

export const RootStoreContext = createContext<RootStore>(rootStore)
