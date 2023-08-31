import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IRecipe } from '../../models/IRecipe'
import { fetchRecipes } from './ActionCreators'

interface RecipesState {
  recipes: IRecipe[]
  isLoading: boolean
  error: string
}

const initialState: RecipesState = {
  recipes: [],
  isLoading: false,
  error: ''
}

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRecipes.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchRecipes.fulfilled.type]: (
      state,
      action: PayloadAction<IRecipe[]>
    ) => {
      state.isLoading = false
      state.error = ''
      state.recipes = action.payload
    },
    [fetchRecipes.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export default recipesSlice.reducer
