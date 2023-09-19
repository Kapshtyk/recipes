import React from 'react'

import { IIngredientForm } from '../../models/IRecipe'

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  label: string
  name: string
  value: string
  type: string
  inputStyles?: string
  labelStyles?: string
  containerStyles?: string
}
