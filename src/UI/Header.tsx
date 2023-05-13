import React, { useContext } from 'react'
import cl from '../styles/Header.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import { CurrentUserContext } from '../utils/context'

const Header = () => {
  const [currentUser, setCurrentUser, {logout}] = useContext(CurrentUserContext)
  const location = useLocation()

  const onClick = () => {
    localStorage.setItem('redirectPath', JSON.stringify(location))
  }
  return (
    <header className={cl.header}>
      <div className={cl.header_logo}>Broth & Ladle 🥕</div>
      <nav className={cl.nav}>
        <ul className={cl.ul}>
          <li className={cl.li}>
            <NavLink className={cl.header_anchor} to="/">
              Find soups
            </NavLink>
          </li>
          <li className={cl.li}>
            <NavLink className={cl.header_anchor} to="/add-recipe">
              Add soup
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={cl.header_login_section}>
        {!currentUser && (
          <NavLink onClick={onClick} className={cl.header_anchor} to="/login">
            <span className={cl.login_span}>Login</span>
          </NavLink>
        )}
        {currentUser && (
          <div className={cl.login_div}>
            <span className={cl.login_span}>
              Welcome, {currentUser.firstname}!
            </span>
            <span className={cl.logout_span} onClick={logout}>Logout</span>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
