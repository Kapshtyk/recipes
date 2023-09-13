import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

import currentUserSlice from './user/currentUserSlice'
import { usersApi } from './user/userAPI'

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
    [usersApi.reducerPath]: usersApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware)
})

setupListeners(store.dispatch)
