import React from 'react'

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
      </div>
    </header>
  )
}

export default Header
