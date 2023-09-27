import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from '../features/auth/authSlice'
import { usersApi } from './services/auth'
import { ingredientsApi } from './services/ingredients'
import { recipesApi } from './services/recipes'

const persistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: [usersApi.reducerPath, recipesApi.reducerPath]
}

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    auth: persistReducer<any, any>(persistConfig, authReducer)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
      .concat(usersApi.middleware)
      .concat(recipesApi.middleware)
      .concat(ingredientsApi.middleware)
})
setupListeners(store.dispatch)

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
