const mongoose = require('mongoose')
const User = require('./models/user')
const Ingredient = require('./models/ingredient')
const Recipe = require('./models/recipe')
const RecipeIngredient = require('./models/recipeIngredient')

const config = require('./utils/config')

let ingredients = [
  {
    name: 'onion',
    units: 'medium'
  },
  {
    name: 'carrot',
    units: 'large'
  },
  {
    name: 'potato',
    units: 'small'
  }
]

mongoose.connect(config.MONGODB_URI)

const saveIngredients = async () => {
  try {
    const savedIngredients = []

    for (const ingredient of ingredients) {
      const newIngredient = new Ingredient({
        name: ingredient.name,
        units: ingredient.units
      })

      const savedIngredient = await newIngredient.save()
      console.log('Ingredient saved!')
      savedIngredients.push(savedIngredient)
    }

    return savedIngredients
  } catch (error) {
    console.error('Error saving ingredients:', error)
    throw error
  }
}

const saveUser = async () => {
  try {
    const newUser = new User({
      email: 'testuser@gmail.com',
      passwordHash: 'testpassword'
    })

    const savedUser = await newUser.save()
    console.log('User saved!')
    return savedUser
  } catch (error) {
    console.error('Error saving user:', error)
    throw error
  }
}

const saveRecipeIngredients = async (recipe, ingredients) => {
  try {
    const savedIngredients = []

    for (const ingredient of ingredients) {
      const newRecipeIngredient = new RecipeIngredient({
        ingredient: ingredient._id,
        quantity: Math.floor(Math.random() * 5) + 1,
        recipe: recipe._id
      })

      const savedRecipeIngredient = await newRecipeIngredient.save()
      console.log('RecipeIngredient saved!')
      savedIngredients.push(savedRecipeIngredient)
    }

    return savedIngredients
  } catch (error) {
    console.error('Error saving RecipeIngredients:', error)
    throw error
  }
}

const saveRecipe = async (author, ingredients) => {
  try {
    const newRecipe = new Recipe({
      title: 'Borsch',
      origin: 'Ukraine',
      description: 'A hearty soup made with beets and other vegetables',
      instructions:
        'Boil beets, carrots, potatoes, and cabbage until tender. Sauté onions and garlic, then add to the pot along with beef broth and tomato paste. Season with dill and vinegar.',
      image: 'images/borsch.jpg',
      author: author._id
    })

    const savedRecipe = await newRecipe.save()
    console.log('Recipe saved!')

    const recipeIngredients = await saveRecipeIngredients(
      savedRecipe,
      ingredients
    )
    savedRecipe.ingredients = recipeIngredients.map(
      (ingredient) => ingredient._id
    )
    await savedRecipe.save()

    return savedRecipe
  } catch (error) {
    console.error('Error saving recipe:', error)
    throw error
  }
}

const saver = async () => {
  try {
    const user = await saveUser()
    const ingredients = await saveIngredients()
    const recipe = await saveRecipe(user, ingredients)

    mongoose.connection.close()
    console.log(recipe)
  } catch (error) {
    console.error('Error saving data:', error)
  }
}

saver()
