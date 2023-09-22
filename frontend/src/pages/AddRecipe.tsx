import React, { useEffect, useState } from 'react'

import { useCreateRecipeMutation } from '../app/services/recipes'
import { Form } from '../components/Form'
import { IInput } from '../components/Form/types'
import { useAppSelector } from '../hooks'
import { IIngredientForm, IRecipeForm } from '../models/IRecipe'
import { CREARE_RECIPE_INPUT_ELEMENTS } from '../utils/constants'

const AddRecipe = () => {
  const currentUser = useAppSelector((state) => state.auth)

  const [
    createRecipe,
    { data: recipeData, error: recipeError, reset: recipeReser }
  ] = useCreateRecipeMutation()

  const [ingredients, setIngredients] = useState(1)
  const [inputElements, setInputElements] = useState<IInput[]>(
    CREARE_RECIPE_INPUT_ELEMENTS
  )

  const generateFields = () => {
    const fields = [...inputElements]
    fields.push({
      name: `name${ingredients}`,
      type: 'text',
      label: 'Ingredient',
      value: ''
    })
    fields.push({
      name: `units${ingredients}`,
      type: 'text',
      label: 'Units',
      value: ''
    })
    fields.push({
      name: `quantity${ingredients}`,
      type: 'number',
      label: 'Quantity',
      value: ''
    })
    return fields
  }

  useEffect(() => {
    setInputElements(generateFields())
  }, [ingredients])

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    values: IRecipeForm
  ) => {
    e.preventDefault()
    const ingredientsObjects: IIngredientForm[] = []

    for (let index = 1; index <= ingredients; index++) {
      const ingredient: IIngredientForm = {
        name: values[`name${index}` as keyof IRecipeForm] as string,
        quantity: values[`quantity${index}` as keyof IRecipeForm] as number,
        units: values[`units${index}` as keyof IRecipeForm] as string
      }
      ingredientsObjects.push(ingredient)
    }

    const recipeData: IRecipeForm = {
      title: values.title,
      origin: values.origin,
      description: values.description,
      instructions: values.instructions,
      image: values.image,
      ingredients: ingredientsObjects,
      author: currentUser
    }

    await createRecipe(recipeData)
  }

  return (
    <div>
      <Form
        inputElements={inputElements}
        onSubmit={onSubmit}
        wide={true}
        title="Add new recipe"
        label="Add recipe"
        additionalHandler={() => setIngredients(ingredients + 1)}
        additionalHandlerLabel="Add ingredient"
      />
    </div>
  )
}

export default AddRecipe
