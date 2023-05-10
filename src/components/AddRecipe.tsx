import React, { MouseEventHandler, useContext, useState } from 'react'
import cl from '../styles/AddRecipe.module.css'
import { RecipeType } from '../types/recipes'
import { IngredientType } from '../types/recipes'
import { CurrentUserContext } from '../utils/context'
import { getCountries } from '../utils/CountryCode'
import { JSX } from 'react/jsx-runtime'
import { addRecipe } from '../api/APIrecipes'

interface RecipeData {
  [key: string]: string | number | IngredientType[] | undefined
}
interface AddRecipeProps {
  fetchRecipes: () => void
}

const AddRecipe: React.FC<AddRecipeProps> = ({ fetchRecipes }) => {
  const currentUser = useContext(CurrentUserContext)[0]
  const [ingredientsCounter, setIngredientsCounter] = useState(1)
  const [recipeData, setRecipeData] = useState<RecipeData>({
    title: '',
    origin: '',
    description: '',
    instruction: '',
    image: '',
    authorId: 0,
    ingredients: []
  })

  const addIngredient = () => {
    setIngredientsCounter(ingredientsCounter + 1)
  }

  const removeIngredient = () => {
    if (ingredientsCounter > 1) {
      setIngredientsCounter(ingredientsCounter - 1)
    }
  }

  const onChangeInput = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    setRecipeData({
      ...recipeData,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const ingredients = []
    for (let i = 0; i < ingredientsCounter; i++) {
      const [name, quantity, units] = Object.keys(recipeData).filter((key) => {
        return key.includes('' + i)
      })
      ingredients.push({
        name: recipeData[name],
        quantity: recipeData[quantity],
        units: recipeData[units]
      })
    }
    if (currentUser) {
      const recipe = {
        title: recipeData.title,
        origin: recipeData.origin,
        description: recipeData.description,
        instruction: recipeData.instruction,
        image: recipeData.image,
        authorId: currentUser.id,
        ingredients: ingredients
      }
      if (await addRecipe(recipe)) {
        fetchRecipes()
      }
    }
  }

  const ingredientsList: JSX.Element[] = []

  for (let i = 0; i < ingredientsCounter; i++) {
    ingredientsList.push(
      <div key={i}>
        <input
          className={cl.form_input}
          type="text"
          name={`name${i}`}
          placeholder="name"
          onChange={onChangeInput}
          required
        />
        <input
          className={cl.form_input}
          type="number"
          name={`quantity${i}`}
          placeholder="quantity"
          onChange={onChangeInput}
          required
        />
        <input
          className={cl.form_input}
          type="text"
          name={`units${i}`}
          placeholder="units"
          onChange={onChangeInput}
          required
        />
      </div>
    )
  }

  return (
    <div className={cl.form_container}>
      <form
        className={cl.form}
        onSubmit={onSubmit}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
          }
        }}
      >
        <input
          className={cl.form_input}
          type="text"
          name="title"
          placeholder="title"
          onChange={onChangeInput}
          required
        />
        <select name="origin" onChange={onChangeInput}>
          {getCountries().map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <textarea
          className={cl.form_input}
          name="description"
          placeholder="description"
          onChange={onChangeInput}
          required
        />
        <textarea
          className={cl.form_input}
          name="instruction"
          placeholder="instruction"
          onChange={onChangeInput}
          required
        />
        <input
          className={cl.form_input}
          type="text"
          name="image"
          placeholder="image"
          onChange={onChangeInput}
          required
        />
        {ingredientsList}
        <button onClick={addIngredient}>Add ingredient</button>
        {ingredientsCounter > 1 && (
          <button onClick={removeIngredient}>Remove ingredient</button>
        )}
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddRecipe
