import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  useLoginUserMutation
} from '../app/services/auth'
import { Form } from '../components/Form'
import { setCurrentUser } from '../features/auth/authSlice'
import { useAppDispatch } from '../hooks'
import { IUser } from '../models/IUser'
import { SIGN_IN_INPUT_ELEMENTS } from '../utils/constants'
import { authValidators } from '../validators/authValidators'
import jwtDecode from 'jwt-decode'

interface IDecodedToken {
  _id: string
  email: string
  username: string
}

const SignIn = () => {
  const dispatch = useAppDispatch()

  const [
    loginUser,
    {
      data: loginData,
      isSuccess: loginIsSuccess,
      error: loginError }
  ] = useLoginUserMutation()

  const [error, setError] = useState({})

  useEffect(() => {
    if (loginIsSuccess && loginData) {
      const decoded: IDecodedToken = jwtDecode(loginData.token)
      dispatch(
        setCurrentUser({
          _id: decoded._id,
          email: decoded.email,
          username: decoded.username,
          token: loginData.token
        })
      )

    }
  }, [loginData])


  const onSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    values: Partial<IUser>
  ) => {
    e.preventDefault()
    setError(() => ({}))
    loginUser(values)
  }

  /* 
    const handleErrors = (e: unknown) => {
      if (loginError) {
        if (
          e &&
          typeof e === 'object' &&
          'data' in e &&
          typeof e.data === 'object' &&
          e.data &&
          'message' in e.data &&
          typeof e.data.message === 'string'
        ) {
          setError({ ...error, message: e.data.message })
        } else if (e && typeof e === 'object' && 'message' in e) {
          console.log(e.message)
          setError({ ...error, message: e.message })
        } else {
          console.error('unhandled exception: ', e)
        }
      }
    } */

  return (
    <Form
      onSubmit={onSubmit}
      title={'Sign in'}
      inputElements={SIGN_IN_INPUT_ELEMENTS}
      noValidate={true}
      submittingErrors={error}
      validators={authValidators}
      label="Sign up"
    />
  )
}

export default SignIn
