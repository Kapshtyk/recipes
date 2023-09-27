import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'

import { useLoginUserMutation } from '../app/services/auth'
import { Form } from '../components/Form'
import { setCurrentUser } from '../features/auth/authSlice'
import { useAppDispatch } from '../hooks'
import { IUser } from '../models/IUser'
import { SIGN_IN_INPUT_ELEMENTS } from '../utils/constants'
import { handleErrors } from '../utils/handleErrors'
import { signinValidators } from '../validators'

interface IDecodedToken {
  id: string
  email: string
  username: string
}

const SignIn = () => {
  const dispatch = useAppDispatch()

  const [loginUser, { data: loginData, isSuccess: loginIsSuccess, error: loginError }] = useLoginUserMutation()

  const [error, setError] = useState({})

  useEffect(() => {
    if (loginError) {
      handleErrors(loginError, error, setError)
    }
  }, [loginError])

  useEffect(() => {
    if (loginIsSuccess && loginData) {
      const decoded: IDecodedToken = jwtDecode(loginData.token)
      dispatch(
        setCurrentUser({
          _id: decoded.id,
          email: decoded.email,
          username: decoded.username,
          token: loginData.token
        })
      )
    }
  }, [loginData])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>, values: Partial<IUser>) => {
    e.preventDefault()
    setError(() => ({}))
    loginUser(values)
  }

  return (
    <Form
      onSubmit={onSubmit}
      title={'Sign in'}
      inputElements={SIGN_IN_INPUT_ELEMENTS}
      noValidate={true}
      validators={signinValidators}
      submittingErrors={error}
      label="Sign in"
    />
  )
}

export default SignIn
