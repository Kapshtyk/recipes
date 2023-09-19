import React, { useEffect, useState } from 'react'

import { useCreateRecipeMutation } from '../app/services/recipes'
import { Form } from '../components/Form'
import { IInput } from '../components/InputElement'
import { useAppSelector } from '../hooks'
import { IIngredientForm, IRecipeForm } from '../models/IRecipe'

const AddRecipe = () => {
  const currentUser = useAppSelector((state) => state.auth)

  const [
    createRecipe,
    { data: recipeData, error: recipeError, reset: recipeReser }
  ] = useCreateRecipeMutation()

  const initialFields = [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      value: ''
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      value: ''
    },
    {
      name: 'instructions',
      type: 'textarea',
      label: 'Instructions',
      value: ''
    },
    {
      name: 'origin',
      type: 'text',
      label: 'Origin',
      value: ''
    },
    {
      name: 'photo',
      type: 'file',
      label: 'Photo',
      value: '',
      accept: 'image/*'
    }
  ]

  const [ingredients, setIngredients] = useState(1)
  const [inputElements, setInputElements] = useState<IInput[]>(initialFields)

  const generateFields = () => {
    const fields = [...inputElements]
    fields.push({
      name: `name${ingredients}`,
      type: 'text',
      label: 'Ingredient name',
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
  }, [])

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
      />
    </div>
  )
}

export default AddRecipe
