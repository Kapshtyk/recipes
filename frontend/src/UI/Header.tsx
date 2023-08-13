import React, { useContext } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import cl from '../styles/Header.module.css'
import { CurrentUserContext } from '../utils/context'

const Header = () => {
  const currentUser = useContext(CurrentUserContext).currentUser
  const logout = useContext(CurrentUserContext).logout
  const location = useLocation()
  const backgroundColor =
    location.pathname === '/' ? 'rgba(0, 0, 0, 0)' : 'rgb(255, 210, 77)'
  const color = location.pathname === '/' ? 'white' : 'black'

  const onClick = () => {
    localStorage.setItem('redirectPath', JSON.stringify(location))
  }
  return (
    <header className={cl.header} style={{ backgroundColor }}>
      <Link className={cl.header_logo} style={{ color: color }} to="/">
        Broth &amp; Ladle 🥕
      </Link>
      <nav className={cl.nav}>
        <ul className={cl.ul}>
          <li className={cl.li}>
            <NavLink
              className={cl.header_anchor}
              style={{ color: color }}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className={cl.li}>
            <NavLink
              className={cl.header_anchor}
              style={{ color: color }}
              to="/recipes"
            >
              Find soup
            </NavLink>
          </li>
          <li className={cl.li}>
            <NavLink
              className={cl.header_anchor}
              style={{ color: color }}
              to="/add-recipe"
            >
              Add soup
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={cl.header_login_section}>
        {!currentUser && (
          <NavLink
            onClick={onClick}
            className={cl.header_anchor}
            style={{ color: color }}
            to="/login"
          >
            <span className={cl.login_span}>Login</span>
          </NavLink>
        )}
        {currentUser && (
          <div className={cl.login_div}>
            <span className={cl.login_span} style={{ color: color }}>
              Welcome,{' '}
              {currentUser &&
                'firstname' in currentUser &&
                currentUser.firstname}
              !
            </span>
            <span
              className={cl.logout_span}
              style={{ color: color }}
              onClick={logout}
            >
              Logout
            </span>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
