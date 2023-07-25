export type RecipesType = RecipeType[]

export type RecipeType =
  | {
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
  | RecipeError

export type IngredientType = {
  name: string
  quantity: number
  units: string
}

export type RecipeError = {
  message: string
}

export type FormDataType = {
  title: string
  origin: string
  description: string
  instruction: string
  image: string
  [key: string]: string
}
