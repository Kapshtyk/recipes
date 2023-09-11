import React from 'react'

import Form from '../components/Form'
import { IUser } from '../models/IUser'
import { useRegisterUserMutation } from '../store/user/userSlice'

const Authorization = () => {
  const [registerUser, { isLoading, isSuccess, isError }] = useRegisterUserMutation()

  const inputElements = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      value: ''
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      value: ''
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      value: ''
    },
    {
      name: 'confirmPassword',
      label: 'Confirm password',
      type: 'password',
      value: ''
    }
  ]

  const onSubmit = (e: React.FormEvent<HTMLFormElement>, values: Partial<IUser>) => {
    console.log(values)
  }
  return <Form onSubmit={onSubmit} title={'Sign up'} inputElements={inputElements} noValidate={true} />
}

export default Authorization
