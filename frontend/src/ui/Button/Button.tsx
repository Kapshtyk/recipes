import React from 'react'
import defaultStyles from './Button.module.css'

interface IIButton {
  children?: React.ReactNode
  styles?: {
    button?: string,
    button_label?: string,
  }
  label: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export const Button: React.FC<IIButton> = ({ children, styles, label, disabled = false, type = 'button' }) => {
  return (
    <button disabled={disabled} type={type} className={styles?.button ? styles.button : defaultStyles.button}>
      {children}
      <span className={styles?.button_label ? styles.button_label : defaultStyles.button_label}>{label}</span>
    </button>
  )
}
