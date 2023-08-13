import React from 'react'

import cl from '../styles/Layout.module.css'
import { LayoutType } from '../types/layout'
import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }: LayoutType) => {
  return (
    <>
      <Header />
      <main className={cl.main_content}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
