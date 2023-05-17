import React, { useContext, useState } from 'react'
import { CurrentUserContext, UsersContext } from '../utils/context'
import { useNavigate, Link } from 'react-router-dom'
import md5 from 'md5'
import cl from '../styles/Authorization.module.css'
import { addUser } from '../api/APIrecipes'

type UserDataType = {
  firstname: string
  lastname: string
  email: string
  password: string
}

type AuthorizationType = {
  hasAccount: boolean
}

const Authorization = ({hasAccount}: AuthorizationType) => {
  const [userData, setUserData] = useState<UserDataType>({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  })
  const users = useContext(UsersContext)[0]
  const setCurrentUser = useContext(CurrentUserContext)[1]
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
          if (user.password === md5(userData.password)) {
            return user
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
          setError('There are no users with credentials that have been provided.')
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
          setCurrentUser(data)
          if (redirectPath) {
            localStorage.removeItem('redirectPath')
            navigate(JSON.parse(redirectPath).pathname)
          } else {
            navigate('/')
          }
        })
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        }
      }
    }
  }

  return (
    <div className={cl.login_container}>
      <h2 className={cl.login_title}>{hasAccount ? 'Login' : 'Sign up' }</h2>
      <form className={cl.login_form} onSubmit={handleSubmit}>
        {!hasAccount && <><label className={cl.login_lable} htmlFor="email">
          Firstname:
        </label><input
          className={cl.login_input}
          type="text"
          name="firstname"
          onChange={onChangeInput}
          required /><label className={cl.login_lable} htmlFor="email">
            Lastname:
        </label><input
          className={cl.login_input}
          type="text"
          name="lastname"
          onChange={onChangeInput}
          required /></>}
        <label className={cl.login_lable} htmlFor="email">
          Email:
        </label>
        <input
          className={cl.login_input}
          type="email"
          name="email"
          onChange={onChangeInput}
          required
        />
        <label className={cl.login_lable} htmlFor="password">
          Password:
        </label>
        <input
          className={cl.login_input}
          type="password"
          name="password"
          onChange={onChangeInput}
          required
        />
        <button className={cl.login_submit}>Sign up</button>
      </form>
      {error && <span className={cl.login_error}>{error}</span>}
      {hasAccount && <div className={cl.login_signup}>
        If you do not have an account, you can{' '}
        <Link className={cl.login_signup_link} to="/signup">
          sign up here
        </Link>
      </div>}
    </div>
  )
}

export default Authorization
