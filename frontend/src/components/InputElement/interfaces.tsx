import React from 'react'

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  value: string
  type: string
  inputStyles?: string
  labelStyles?: string
  containerStyles?: string
}
