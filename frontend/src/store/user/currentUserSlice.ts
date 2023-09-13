import { createSlice } from '@reduxjs/toolkit'

import { IToken, IUser } from '../../models/IUser'

const initialState: Partial<IUser> = {
  username: '',
  email: '',
  token: ''
}

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.username = action.payload.username
      state.email = action.payload.email
      state.token = action.payload.token
    },
    clearCurrentUser: (state) => {
      state.username = ''
      state.email = ''
      state.token = ''
    }
  }
})

export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions

export default currentUserSlice.reducer
