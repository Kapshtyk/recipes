import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  useLoginUserMutation,
  useRegisterUserMutation
} from '../app/services/auth'
import { Form } from '../components/Form'
import { addUserToLocalstorageAndStore } from '../features/auth/authSlice'
import { IUser } from '../models/IUser'
import { SIGN_UP_INPUT_ELEMENTS } from '../utils/constants'
import { authValidators } from '../validators/authValidators'

const SignUp = () => {
  const navigate = useNavigate()

  const [
    registerUser,
    { data: regData, error: regError, reset: resetRegisterUser }
  ] = useRegisterUserMutation()

  const [
    loginUser,
    {
      data: loginData,
      isSuccess: loginIsSuccess,
      error: loginError,
      reset: resetLoginUser
    }
  ] = useLoginUserMutation()

  const [error, setError] = useState({})

  useEffect(() => {
    handleErrors(regError)
  }, [regError])

  useEffect(() => {
    handleErrors(loginError)
  }, [loginError])

  useEffect(() => {
    if (loginIsSuccess && loginData) {
      addUserToLocalstorageAndStore({
        _id: regData?._id,
        email: regData?.email,
        username: regData?.username,
        token: loginData?.token
      })
    }
  }, [loginIsSuccess, loginData])

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    values: Partial<IUser>
  ) => {
    e.preventDefault()
    setError(() => ({}))
    registerUser(values)
      .unwrap()
      .then(() => {
        loginUser({ email: values.email, password: values.password })
          .then(() => {
            resetRegisterUser()
            resetLoginUser()
            navigate('/')
          })
          .catch((e) => {
            handleErrors(e)
          })
      })
      .catch((e) => {
        handleErrors(e)
      })
  }

  const handleErrors = (e: unknown) => {
    if (regError || loginError) {
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
  }

  return (
    <Form
      onSubmit={onSubmit}
      title={'Sign up'}
      inputElements={SIGN_UP_INPUT_ELEMENTS}
      noValidate={true}
      submittingErrors={error}
      /* validators={authValidators} */
      label="Sign up"
    />
  )
}

export default SignUp
