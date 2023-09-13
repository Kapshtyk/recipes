import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { IUser } from './models/IUser'
import router from './router/router'
import { setCurrentUser } from './store/user/currentUserSlice'
import { APP_NAME } from './utils/constants'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const currentUser = localStorage.getItem(`${APP_NAME}CurrentUser`)
    if (currentUser !== null) {
      const user = JSON.parse(currentUser) as Partial<IUser>
      dispatch(setCurrentUser(user))
    }
  }, [])

  return <RouterProvider router={router} />
}

export default App
