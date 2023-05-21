import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { addUser } from '../api/APIrecipes'
import { AuthorizationType, AuthorizationUserDataType } from '../types/users'
import { CurrentUserContext, UsersContext } from '../utils/context'

import md5 from 'md5'

import cl from '../styles/Authorization.module.css'
import style from '../styles/AddRecipe.module.css'

const Authorization = ({ hasAccount }: AuthorizationType) => {
  const [userData, setUserData] = useState<AuthorizationUserDataType>({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  })
  const users = useContext(UsersContext).users
  const fetchUsers = useContext(UsersContext).fetchUsers
  const setCurrentUser = useContext(CurrentUserContext).setCurrentUser
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (hasAccount) {
      if (users) {
        const data = users.find((user) => {
          if ('firstname' in user) {
            if (user.password === md5(userData.password)) {
              return user
            }
          }
        })
        if (data) {
          setCurrentUser(data)
          const redirectPath = localStorage.getItem('redirectPath')
          if (redirectPath) {
            localStorage.removeItem('redirectPath')
            navigate(JSON.parse(redirectPath).pathname)
          } else {
            navigate('/')
          }
        } else {
          setError(
            'There are no users with credentials that have been provided.'
          )
        }
      }
    } else {
      try {
        const redirectPath = localStorage.getItem('redirectPath')
        await addUser({
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          password: md5(userData.password)
        }).then((data) => {
          fetchUsers()
          setCurrentUser(data)
          if (redirectPath) {
            localStorage.removeItem('redirectPath')
            navigate(JSON.parse(redirectPath).pathname)
          } else {
            navigate('/')
          }
        })
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        }
      }
    }
  }

  return (
    <div className={style.form_container} style={{ width: 400 }}>
      <h2 className={cl.authorization_title}>
        {hasAccount ? 'Login' : 'Sign up'}
      </h2>
      <form className={cl.authorization_form} onSubmit={handleSubmit}>
        {!hasAccount && (
          <>
            <label className={cl.authorization_lable} htmlFor="email">
              Firstname:
            </label>
            <input
              className={cl.authorization_input}
              type="text"
              name="firstname"
              onChange={onChangeInput}
              required
            />
            <label className={cl.authorization_lable} htmlFor="email">
              Lastname:
            </label>
            <input
              className={cl.authorization_input}
              type="text"
              name="lastname"
              onChange={onChangeInput}
              required
            />
          </>
        )}
        <label className={cl.authorization_lable} htmlFor="email">
          Email:
        </label>
        <input
          className={cl.authorization_input}
          type="email"
          name="email"
          onChange={onChangeInput}
          required
        />
        <label className={cl.authorization_lable} htmlFor="password">
          Password:
        </label>
        <input
          className={cl.authorization_input}
          type="password"
          name="password"
          onChange={onChangeInput}
          required
        />
        <button className={cl.authorization_submit}>Sign up</button>
      </form>
      {error && <span className={cl.authorization_error}>{error}</span>}
      {hasAccount && (
        <div className={cl.authorization_signup}>
          If you do not have an account, you can{' '}
          <Link className={cl.authorization_signup_link} to="/signup">
            sign up here
          </Link>
        </div>
      )}
    </div>
  )
}

export default Authorization
