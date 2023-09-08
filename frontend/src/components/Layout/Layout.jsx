import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../Header'

const Layout = () => {
  return (
    <>
      <Header />
      <div className="container-xl h-100% d-flex flex-row flex-wrap justify-content-between px-4 shadow p-3 mb-5 bg-body-tertiary rounded gap-4">
        <Outlet />
      </div>
    </>
  )
}

export default Layout
