export type RecipesType = RecipeType[]

export type RecipeType = {
  id?: number
  title: string
  origin: string
  description: string
  instruction: string
  image: string
  authorId: number
  ingredients: IngredientType[]
  [key: string]: string | number | IngredientType[] | undefined
}

export type IngredientType = {
  name: string
  quantity: number
  units: string
}
