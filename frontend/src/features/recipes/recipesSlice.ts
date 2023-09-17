import { createSlice } from '@reduxjs/toolkit'

import { IRecipe } from '../../models/IRecipe'

const initialState: IRecipe[] = []

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      return action.payload
    }
  }
})

export const { setRecipes } = recipesSlice.actions

export default recipesSlice.reducer
