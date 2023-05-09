import React from 'react'
import cl from '../styles/Header.module.css'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className={cl.header}>
      <div className="logo">Recipes</div>
      <nav className={cl.nav}>
        <ul className={cl.ul}>
          <li className={cl.li}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/">Add recipe</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
