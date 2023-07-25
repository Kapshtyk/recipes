import React from 'react'
import cl from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <footer className={cl.footer}>
      <div className={cl.footer_title}>Created by Arseniiy Kapshtyk</div>
      <div className={cl.footer_text}>
        Follow me on{' '}
        <a className={cl.footer_link} href="https://github.com/Kapshtak">
          Github
        </a>{' '}
        and{' '}
        <a
          className={cl.footer_link}
          href="https://www.linkedin.com/in/kapshtyk/"
        >
          Linkedin
        </a>
      </div>
    </footer>
  )
}

export default Footer
