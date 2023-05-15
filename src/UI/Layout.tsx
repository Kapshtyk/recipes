import React from 'react'
import Header from './Header'
import Footer from './Footer'
import cl from '../styles/Layout.module.css'

export type LayoutType = {
  children: React.ReactNode
}

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
