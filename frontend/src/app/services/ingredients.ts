/* eslint-disable indent */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { IIngredient } from '../../models/IIngredient'
import { BASE_URL } from '../../utils/constants'
import { RootState } from '../store'

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
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
  tagTypes: ['ingredients'],
  endpoints: (builder) => ({
    getIngredients: builder.query<IIngredient[], string>({
      query: (query: string) => `ingredients/search?query=${query}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'ingredients' as const,
                _id
              })),
              { type: 'ingredients', id: 'LIST' }
            ]
          : [{ type: 'ingredients', id: 'LIST' }]
    }),
    createIngredient: builder.mutation<IIngredient, Omit<IIngredient, '_id'>>({
      query: (body: Omit<IIngredient, '_id'>) => ({
        url: 'ingredients',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'ingredients', id: 'LIST' }]
    })
  })
})

export const { useCreateIngredientMutation, useGetIngredientsQuery } = ingredientsApi
