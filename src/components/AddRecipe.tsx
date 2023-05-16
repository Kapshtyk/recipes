import React, { useContext, useState } from 'react'
import cl from '../styles/AddRecipe.module.css'
import { RecipeType } from '../types/recipes'
import { CurrentUserContext, RecipesContext } from '../utils/context'
import { getCountries } from '../utils/CountryCode'
import { JSX } from 'react/jsx-runtime'
import { addRecipe } from '../api/APIrecipes'
import { useNavigate } from 'react-router-dom'

const AddRecipe = () => {
  const { fetchRecipes } = useContext(RecipesContext)[2]
  const currentUser = useContext(CurrentUserContext)[0]
  const [ingredientsCounter, setIngredientsCounter] = useState(1)
  const [recipeData, setRecipeData] = useState<RecipeType>({
    title: '',
    origin: '',
    description: '',
    instruction: '',
    image: '',
    authorId: 0,
    ingredients: []
  })
  const navigate = useNavigate()
  const ingredientsList: JSX.Element[] = []

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
      const ingredientName = recipeData[name]
      const ingredientQuantity = recipeData[quantity]
      const ingredientUnits = recipeData[units]
      if (
        typeof ingredientName === 'string' &&
        typeof ingredientQuantity === 'number' &&
        typeof ingredientUnits === 'string'
      ) {
        ingredients.push({
          name: ingredientName.toLowerCase(),
          quantity: ingredientQuantity,
          units: ingredientUnits.toLowerCase()
        })
      }
    }
    if (currentUser) {
      const recipe = {
        title: recipeData.title,
        origin: recipeData.origin,
        description: recipeData.description,
        instruction: recipeData.instruction,
        image: recipeData.image,
        authorId: currentUser.id as number,
        ingredients: ingredients
      }
      try {
        const data = await addRecipe(recipe)
        await Promise.resolve(fetchRecipes())
        navigate(`/recipes/${data.id}`)
      } catch (err) {
        console.log(err)
      }
    }
  }

  for (let i = 0; i < ingredientsCounter; i++) {
    ingredientsList.push(
      <div className={cl.form_ingredients_row} key={i}>
        <input
          className={cl.form_input_ingredient}
          type="text"
          placeholder="name"
          name={`name${i}`}
          onChange={onChangeInput}
          required
        />
        <input
          className={cl.form_input_ingredient}
          type="number"
          placeholder="quantity"
          name={`quantity${i}`}
          onChange={onChangeInput}
          required
        />
        <input
          className={cl.form_input_ingredient}
          type="text"
          placeholder="units"
          name={`units${i}`}
          onChange={onChangeInput}
          required
        />
      </div>
    )
  }

  return (
    <div className={cl.form_container}>
      <h2 className={cl.form_title}>Add recipe</h2>
      <form
        className={cl.form}
        onSubmit={onSubmit}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
          }
        }}
      >
        <label className={cl.form_lable} htmlFor="title">
          Title
        </label>
        <input
          className={cl.form_input}
          type="text"
          name="title"
          onChange={onChangeInput}
          required
        />
        <label className={cl.form_lable} htmlFor="origin">
          Origin
        </label>
        <input
          className={cl.form_input}
          type="text"
          name="origin"
          onChange={onChangeInput}
          list="origin"
        />
        <datalist id="origin">
          {getCountries().map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </datalist>
        <label className={cl.form_lable} htmlFor="description">
          Description
        </label>
        <textarea
          rows={4}
          className={cl.form_input}
          name="description"
          onChange={onChangeInput}
          required
        />
        <label className={cl.form_lable} htmlFor="instructions">
          Instructions
        </label>
        <textarea
          rows={10}
          className={cl.form_input}
          name="instruction"
          onChange={onChangeInput}
          required
        />
        <label className={cl.form_lable} htmlFor="image">
          Image
        </label>
        <input
          className={cl.form_input}
          type="text"
          name="image"
          onChange={onChangeInput}
          required
        />
        <label className={cl.form_lable}>Ingredients</label>
        {ingredientsList}
        <div className={cl.form_buttons}>
          <button className={cl.form_button} onClick={addIngredient}>
            Add more
          </button>
          {ingredientsCounter > 1 && (
            <button className={cl.form_button} onClick={removeIngredient}>
              Remove
            </button>
          )}
        </div>
        <button className={cl.form_button_add} type="submit">
          Add recipe
        </button>
      </form>
    </div>
  )
}

export default AddRecipe
