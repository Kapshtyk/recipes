import { IUser } from '../../models/IUser'
import { APP_NAME } from '../../utils/constants'
import { store } from '../store'
import { setCurrentUser } from './currentUserSlice'

export const addUserToLocalstorageAndStore = (user: Partial<IUser>) => {
  console.log('addUserToLocalstorageAndStore', user)
  localStorage.setItem(`${APP_NAME}CurrentUser`, JSON.stringify(user))
  store.dispatch(setCurrentUser(user))
}
