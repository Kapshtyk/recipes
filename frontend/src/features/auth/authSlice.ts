import { createSlice } from '@reduxjs/toolkit'

import { IUser } from '../../models/IUser'
import { APP_NAME } from '../../utils/constants'

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

export const addUserToLocalstorageAndStore = (user: Partial<IUser>) => {
  localStorage.setItem(`${APP_NAME}CurrentUser`, JSON.stringify(user))
  setCurrentUser(user)
}

export const removeUserFromLocalstorageAndStore = () => {
  localStorage.removeItem(`${APP_NAME}CurrentUser`)
  clearCurrentUser()
}
