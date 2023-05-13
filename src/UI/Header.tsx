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
              <NavLink onClick={onClick} className={cl.header_anchor} to="/login">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      {currentUser && (
        <>
          <span>
            Welclome, {currentUser.firstname} {currentUser.lastname}
          </span>
          <button onClick={logout}>Logount</button>
        </>
      )}
    </header>
  )
}

export default Header
