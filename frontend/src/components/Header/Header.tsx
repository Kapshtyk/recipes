import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.first_layer}></div>
      <div className={styles.second_layer}></div>
      <div className={styles.third_layer}></div>
      <div className={styles.fourth_layer}></div>
      <div className={styles.fifth_layer}></div>
      <div className={styles.header_content}>
        <h1 className={styles.header_title}>Broth and Laddle 🥕</h1>
        <div className={styles.header_nav}>
          <Link to="/" className={styles.header_link}>
            Homepage
          </Link>
          <Link to="/recipes" className={styles.header_link}>
            Recipes
          </Link>
        </div>
      </div>
    </header>
  )
}

export { Header }
