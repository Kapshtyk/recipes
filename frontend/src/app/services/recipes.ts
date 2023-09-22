import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { IRecipe, IRecipeForm } from '../../models/IRecipe'
import { APP_NAME, BASE_URL } from '../../utils/constants'

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: 180,
  tagTypes: ['recipes'],
  endpoints: (builder) => ({
    getRecipes: builder.query<IRecipe[], void>({
      query: () => 'recipes',
      providesTags: ['recipes']
    }),
    createRecipe: builder.mutation<IRecipe, IRecipeForm>({
      query: (body) => ({
        url: 'recipes',
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`${APP_NAME}-token`)}
          `
        }
      }),
      invalidatesTags: ['recipes']
    })
  })
})

export const { useGetRecipesQuery, useCreateRecipeMutation } = recipesApi
