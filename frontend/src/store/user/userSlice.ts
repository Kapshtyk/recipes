import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IUser } from '../../models/IUser'
import { BASE_URL } from '../../utils/constants'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['currentUser'],
  endpoints: (builder) => ({
    registerUser: builder.mutation<IUser, string>({
      query: (post) => ({
        url: 'auth/registration/',
        method: 'POST',
        body: post
      }),
      invalidatesTags: ['currentUser']
    })
  })
})

export const { useRegisterUserMutation } = usersApi
