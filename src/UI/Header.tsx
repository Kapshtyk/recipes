import React, { useContext } from 'react'
import cl from '../styles/Header.module.css'
import { NavLink } from 'react-router-dom'
import { CurrentUserContext } from '../utils/context'

const Header = () => {
  const currentUser = useContext(CurrentUserContext)[0]

  return (
    <header className={cl.header}>
      <div className="logo">Recipes</div>
      <nav className={cl.nav}>
        <ul className={cl.ul}>
          <li className={cl.li}>
            <NavLink className={cl.header_anchor} to="/">
              Home
            </NavLink>
          </li>
          <li className={cl.li}>
            <NavLink className={cl.header_anchor} to="/add-recipe">
              Add recipe
            </NavLink>
          </li>
          {!currentUser && (
            <li className={cl.li}>
              <NavLink className={cl.header_anchor} to="/login">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      {currentUser && (
        <span>
          Welclome, {currentUser.firstname} {currentUser.lastname}
        </span>
      )}
    </header>
  )
}

export default Header
