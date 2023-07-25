import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { LayoutType } from '../types/layout'
import cl from '../styles/Layout.module.css'

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
