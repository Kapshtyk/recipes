import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCreateRecipeMutation } from '../app/services/recipes'
import { Form } from '../components/Form'
import { IInput } from '../components/Form/types'
import { IIngredientForm, IRecipeForm } from '../models/IRecipe'
import { CREARE_RECIPE_INPUT_ELEMENTS } from '../utils/constants'
import { recipeValidators } from '../validators'
import { handleErrors } from '../utils/handleErrors'

interface IValues {
  [key: string]: string
}

const AddRecipe = () => {
  const [createRecipe, { data: recipeData, error: recipeError }] = useCreateRecipeMutation()
  const [ingredients, setIngredients] = useState(1)
  const [inputElements, setInputElements] = useState<IInput[]>(CREARE_RECIPE_INPUT_ELEMENTS)
  const [values, setValues] = useState<IValues>({})
  const navigate = useNavigate()
  const [error, setError] = useState({})

  useEffect(() => {
    if (recipeError) {
      handleErrors(recipeError, error, setError)
    }
  }, [recipeError])

  useEffect(() => {
    if (recipeData) {
      navigate(`/recipes/${recipeData._id}`)
    }
  }, [recipeData])

  useEffect(() => {
    const currentElements = [...inputElements]
    currentElements.forEach((element) => {
      element.value = values[element.name]
    })
    setInputElements(currentElements)
  }, [ingredients])

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>, values: IRecipeForm) => {
    e.preventDefault()
    const ingredientsObjects: IIngredientForm[] = []

    for (let index = 1; index <= ingredients; index++) {
      const ingredient: IIngredientForm = {
        name: values[`name${index}` as keyof IRecipeForm] as string,
        quantity: values[`quantity${index}` as keyof IRecipeForm] as unknown as number,
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
      ingredients: ingredientsObjects
    }

    createRecipe(recipeData)
  }

  return (
    <div>
      <Form
        inputElements={inputElements}
        onSubmit={onSubmit}
        wide={true}
        title="Add new recipe"
        label="Add recipe"
        noValidate={true}
        validators={recipeValidators}
        additionalHandler={() => setIngredients(ingredients + 1)}
        additionalHandlerLabel="Add ingredient"
        setValues={setValues}
      />
    </div>
  )
}

export default AddRecipe
