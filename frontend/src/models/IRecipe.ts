import { IUser } from './IUser'

export interface IRecipe {
  _id: string
  title: string
  origin: string
  description: string
  instructions: string
  image: string
  ingredients: IIRecipeIngredient[]
  author: Partial<IUser>
  __v: number
}

export interface IIRecipeIngredient {
  _id?: string
  ingredient: IIngredient
  quantity: number
  recipe: string
  __v: number
}

export interface IIngredient {
  name: string
  units: string
  quantity: number
}

export interface IRecipeForm {
  title: string
  origin: string
  description: string
  instructions: string
  image: string
  ingredients: IIngredient[]
  author: Partial<IUser>
}
