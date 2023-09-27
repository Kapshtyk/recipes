import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useLoginUserMutation, useRegisterUserMutation } from '../app/services/auth'
import { Form } from '../components/Form/'
import { setCurrentUser } from '../features/auth/authSlice'
import { useAppDispatch } from '../hooks'
import { IUser } from '../models/IUser'
import { SIGN_UP_INPUT_ELEMENTS } from '../utils/constants'
import { handleErrors } from '../utils/handleErrors'
import { signupValidators } from '../validators'

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [values, setValues] = useState({} as IUser)
  const [registerUser, { data: regData, isSuccess: regSuccess, error: regError }] = useRegisterUserMutation()

  const [loginUser, { data: loginData, isSuccess: loginIsSuccess, error: loginError }] = useLoginUserMutation()

  const [error, setError] = useState({})

  useEffect(() => {
    if (regError) {
      handleErrors(regError, error, setError)
    }
  }, [regError])

  useEffect(() => {
    if (loginError) {
      handleErrors(loginError, error, setError)
    }
  }, [loginError])

  useEffect(() => {
    if (regSuccess && regData) {
      loginUser({ email: values.email, password: values.password })
    }
  }, [regData, regSuccess])

  useEffect(() => {
    if (loginIsSuccess && loginData && regData) {
      dispatch(
        setCurrentUser({
          _id: regData._id,
          email: regData.email,
          username: regData.username,
          token: loginData.token
        })
      )
      navigate('/')
    }
  }, [loginIsSuccess, loginData])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>, values: Partial<IUser>) => {
    e.preventDefault()
    setError(() => ({}))
    registerUser(values)
  }

  return (
    <Form
      onSubmit={onSubmit}
      title={'Sign up'}
      inputElements={SIGN_UP_INPUT_ELEMENTS}
      noValidate={true}
      submittingErrors={error}
      validators={signupValidators}
      label="Sign up"
      setValues={setValues}
    />
  )
}

export default SignUp
