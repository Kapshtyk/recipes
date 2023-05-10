import React, { useContext, useEffect, useState } from 'react'
import cl from '../styles/Header.module.css'
import { NavLink } from 'react-router-dom'
import { CurrentUserContext } from '../utils/context'
import { UserType } from '../types/users'

const Header = () => {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext)

  return (
    <header className={cl.header}>
      <div className="logo">Recipes</div>
      <nav className={cl.nav}>
        <ul className={cl.ul}>
          <li className={cl.li}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className={cl.li}>
            <NavLink className={cl.add} to="/">
              Add recipe
            </NavLink>
          </li>
          {!currentUser && (
            <li className={cl.li}>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
