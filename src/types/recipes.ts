export type Resipes = {
  recipes: Recipe[]
}

export type Recipe = {
  id: number
  title: string
  origin: string
  description: string
  instruction: string
  image: string
  authorId: number
  ingredients: Ingredient[]
}

export type Ingredient = {
  name: string
  quantity: number
  units: string
}
