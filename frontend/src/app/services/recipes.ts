/* eslint-disable indent */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { IRecipe, IRecipeForm } from '../../models/IRecipe'
import { BASE_URL } from '../../utils/constants'
import { RootState } from '../store'

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  keepUnusedDataFor: 180,
  tagTypes: ['recipes'],
  endpoints: (builder) => ({
    getRecipes: builder.query<IRecipe[], void>({
      query: () => 'recipes',
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'recipes' as const, _id })), { type: 'recipes', id: 'LIST' }]
          : [{ type: 'recipes', id: 'LIST' }]
    }),
    getRecipeById: builder.query<IRecipe, string>({
      query: (id) => `recipes/${id}`,
      providesTags: (result, error, id) => [{ type: 'recipes', id }]
    }),
    createRecipe: builder.mutation<IRecipe, IRecipeForm>({
      query: (body: IRecipeForm) => ({
        url: 'recipes',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'recipes', id: 'LIST' }]
    })
  })
})

export const { useGetRecipesQuery, useGetRecipeByIdQuery, useCreateRecipeMutation } = recipesApi
