export interface IRecipe {
  title: string
  origin: string
  description: string
  instructions: string
  ingredients: IIngredientElement[]
  author: IAuthor
  image: string
  _id: string
}

export interface IAuthor {
  username: string
  email: string
  id: string
}

export interface IIngredientElement {
  ingredient: IIngredientIngredient
  quantity: number
  recipe: string
  id: string
}

export interface IIngredientIngredient {
  name: string
  units: string
  id: string
}
