import React, { useEffect } from 'react'

import { Form } from '../components/Form'
import { IRecipe, IRecipeForm } from '../models/IRecipe'
import { useCreateRecipeMutation } from '../app/services/recipes'
import { useAppSelector } from '../hooks'


const AddRecipe = () => {
  const currentUser = useAppSelector(state => state.auth)

  useEffect(() => {
    console.log(currentUser)
  }, [currentUser])

  const [
    createRecipe,
    { data: recipeData, error: recipeError, reset: recipeReser }
  ] = useCreateRecipeMutation()

  const inputElements = [
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
      name: 'ingredients',
      type: 'text',
      label: 'Ingredients',
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

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    values: Partial<IRecipeForm>
  ) => {
    e.preventDefault()
    await createRecipe({ ...values, author: currentUser, ingredients: [{ name: 'test', quantity: 1, units: 'kg' }] })

  }

  return (
    <div>
      <Form inputElements={inputElements} onSubmit={onSubmit} wide={true} title='Add new recipe' label='Add recipe' />
    </div>
  )
}

export default AddRecipe
