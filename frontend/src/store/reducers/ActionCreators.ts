import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { IUser } from '../../models/IUser'
import { BASE_URL } from '../../utils/constants'

/* export const fetchUsers2 = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.usersFetching())
    const response = await axios.get<IUser[]>(`${BASE_URL}users`)
    dispatch(userSlice.actions.usersFetchingSuccess(response.data))
  } catch (error: any) {
    dispatch(userSlice.actions.usersFetchingError(error.message))
  }
} */

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IUser[]>(`${BASE_URL}users`)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const checkCredentials = createAsyncThunk(
  'users/checkCredentials',
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post<IUser>(
        `${BASE_URL}users/login`,
        credentials
      )
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
