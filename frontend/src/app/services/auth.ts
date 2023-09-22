import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IToken, IUser } from '../../models/IUser'
import { BASE_URL } from '../../utils/constants'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['currentUser'],
  endpoints: (builder) => ({
    registerUser: builder.mutation<IUser, Partial<IUser>>({
      query: (credentials) => ({
        url: 'auth/registration/',
        method: 'POST',
        body: credentials
      }),
      //TODO: fix it
      invalidatesTags: ['currentUser']
    }),
    loginUser: builder.mutation<IToken, Partial<IUser>>({
      query: (credentials) => ({
        url: 'auth/login/',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['currentUser']
    })
  })
})

export const { useRegisterUserMutation, useLoginUserMutation } = usersApi
