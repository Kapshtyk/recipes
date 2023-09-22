import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IUser } from '../../models/IUser'

const initialState: Partial<IUser> = {
  _id: '',
  username: '',
  email: '',
  token: ''
}

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<Omit<IUser, 'password'>>) => {
      state._id = action.payload._id
      state.username = action.payload.username
      state.email = action.payload.email
      state.token = action.payload.token
    },
    clearCurrentUser: (state) => {
      state._id = ''
      state.username = ''
      state.email = ''
      state.token = ''
    }
  }
})

export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions

export default currentUserSlice.reducer

export const selectCurrentUser = (state: any) => state.auth
