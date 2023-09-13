import React from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '../Header'
import styles from './Layout.module.css'

const Layout = () => {
  return (
    <>
      <Header />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </>
  )
}

export default Layout
