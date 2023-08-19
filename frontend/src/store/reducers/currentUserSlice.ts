import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IUser } from '../../models/IUser'
import { checkCredentials } from './ActionCreators'

interface CurrentUserState {
  currentUser: IUser | null
  isLoading: boolean
  error: string
}

const initialState: CurrentUserState = {
  currentUser: null,
  isLoading: false,
  error: ''
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkCredentials.pending.type, (state) => {
        state.isLoading = true
      })

      .addCase(
        checkCredentials.fulfilled.type,
        (state, action: PayloadAction<CurrentUserState>) => {
          state.isLoading = false
          state.error = ''
          state.currentUser = action.payload.currentUser
        }
      )
      .addCase(
        checkCredentials.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false
          state.error = action.payload
        }
      )
  }
  /* extraReducers: {
    [checkCredentials.pending.type]: (state) => {
      state.isLoading = true
    },
    [checkCredentials.fulfilled.type]: (
      state,
      action: PayloadAction<CurrentUserState>
    ) => {
      state.isLoading = false
      state.error = ''
      state.currentUser = action.payload.currentUser
    },
    [checkCredentials.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false
      state.error = action.payload
    }
  } */
})

export default currentUserSlice.reducer
