export type ResipesType = {
  recipes: RecipeType[]
}

export type RecipeType = {
  id: number
  title: string
  origin: string
  description: string
  instruction: string
  image: string
  authorId: number
  ingredients: IngredientType[]
}

export type IngredientType = {
  name: string
  quantity: number
  units: string
}
