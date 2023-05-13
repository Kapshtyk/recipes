import React, { useContext, useState } from 'react'
import { CurrentUserContext, UsersContext } from '../utils/context'
import { useNavigate } from 'react-router-dom'
import md5 from 'md5'

type UserDataType = {
  email: string
  password: string
}

const Login = () => {
  const [userData, setUserData] = useState<UserDataType>({
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
          console.log(redirectPath)
          localStorage.removeItem('redirectPath')
          navigate(JSON.parse(redirectPath).pathname)
        } else {
          navigate('/')
        }
      } else {
        setError('There are no users with credentials that have been provided.')
      }
    }
  }


  return (
    <div className="Login">
      <div className="area">
        <h2>Login</h2>
        <form className="" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" onChange={onChangeInput} required />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={onChangeInput}
            required
          />
          <button className="{classes.button_form}">Login</button>
        </form>
      </div>
      {error && <span>{error}</span>}
    </div>
  )
}

export default Login
