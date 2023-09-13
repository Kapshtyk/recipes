import React, { useEffect, useState } from 'react'

import { Form } from '../components/Form'
import { IUser } from '../models/IUser'
import { addUserToLocalstorageAndStore } from '../store/user/actionCreators'
import {
  useLoginUserMutation,
  useRegisterUserMutation
} from '../store/user/userAPI'
import { SIGN_UP_INPUT_ELEMENTS } from '../utils/constants'
import { authValidators } from '../validators/authValidators'

const SignUp = () => {
  const [registerUser, { error: regError }] = useRegisterUserMutation()
  const [loginUser] = useLoginUserMutation()
  const [error, setError] = useState({})

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    values: Partial<IUser>
  ) => {
    setError({})
    const user = await registerUser(values)
  }

  useEffect(() => {
    console.log(regError)
  }, [regError])

  /* const handleErrors = (e: unknown) => {
    if (
      e &&
      typeof e === 'object' &&
      'data' in e &&
      e.data &&
      typeof e.data === 'object' &&
      'message' in e.data &&
      Array.isArray(e.data.message)
    ) {
      setError(e.data.message)
    } else if (
      e &&
      typeof e === 'object' &&
      'message' in e) {
      console.log(e.message)
      setError({ message: e.message })
    }
  }

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    values: Partial<IUser>
  ) => {
    setError({})
    try {
      const user = await registerUser(values).unwrap()
      if ('_id' in user) {
        try {
          const { token } = await loginUser({
            email: user.email,
            password: 'brokenpassword' //values.password
          }).unwrap()
          addUserToLocalstorageAndStore({
            ...user,
            token
          })
        } catch (e) {
          handleErrors(e)
        }
      } else {
        console.log(user)
        handleErrors(user)
      }
    } catch (e) {
      handleErrors(e)
    }
  } */

  return (
    <Form
      onSubmit={onSubmit}
      title={'Sign up'}
      inputElements={SIGN_UP_INPUT_ELEMENTS}
      noValidate={true}
      submissionErrors={error}
      validators={authValidators}
    />
  )
}

export default SignUp
