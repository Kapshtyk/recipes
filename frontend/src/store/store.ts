import { combineReducers, configureStore } from '@reduxjs/toolkit'

import recipesReducer from './reducers/recipesSlice'
import userReducer from './reducers/usersSlice'

const rootReducer = combineReducers({
  userReducer,
  recipesReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
