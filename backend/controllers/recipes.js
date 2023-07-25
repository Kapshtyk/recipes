const recipesRouter = require('express').Router()
const Recipe = require('../models/recipe')
const Ingredient = require('../models/ingredient')
const RecipeIngredient = require('../models/recipeIngredient')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

recipesRouter.get('/', async (request, response) => {
  try {
    const recipes = await Recipe.find({})
      .populate({
        path: 'ingredients',
        populate: {
          path: 'ingredient',
          model: 'Ingredient'
        }
      })
      .exec()

    response.json(recipes)
  } catch (error) {
    console.error('Error fetching recipes:', error.message)
    response.status(500).json({ error: 'Internal server error' })
  }
})

recipesRouter.get('/:id', async (request, response) => {
  try {
    const recipe = await Recipe.findById(request.params.id)
      .populate([
        {
          path: 'ingredients',
          populate: {
            path: 'ingredient',
            model: 'Ingredient'
          }
        },
        {
          path: 'author',
          model: 'User',
          select: 'email'
        }
      ])
      .exec()

    if (recipe) {
      response.json(recipe)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    console.error('Error fetching recipe:', error.message)
    response.status(500).json({ error: 'Internal server error' })
  }
})
recipesRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  try {
    const newRecipe = new Recipe({
      title: body.title,
      origin: body.origin,
      description: body.description,
      instructions: body.instructions,
      image: body.image,
      author: user._id
    })

    const savedRecipe = await newRecipe.save()

    for (const ingredient of body.ingredients) {
      const existingIngredient = await Ingredient.findOne({
        name: ingredient.name,
        units: ingredient.units
      })

      if (existingIngredient) {
        const newRecipeIngredient = new RecipeIngredient({
          ingredient: existingIngredient._id,
          quantity: ingredient.quantity,
          recipe: savedRecipe._id
        })

        const savedRecipeIngredient = await newRecipeIngredient.save()

        savedRecipe.ingredients = savedRecipe.ingredients.concat(
          savedRecipeIngredient._id
        )
      } else {
        const newIngredient = new Ingredient({
          name: ingredient.name,
          units: ingredient.units
        })

        const savedIngredient = await newIngredient.save()

        const newRecipeIngredient = new RecipeIngredient({
          ingredient: savedIngredient._id,
          quantity: ingredient.quantity,
          recipe: savedRecipe._id
        })

        const savedRecipeIngredient = await newRecipeIngredient.save()

        savedRecipe.ingredients = savedRecipe.ingredients.concat(
          savedRecipeIngredient._id
        )
      }
    }

    await savedRecipe.save()

    user.recipes = user.recipes.concat(savedRecipe._id)
    await user.save()

    response.status(201).json(savedRecipe)
  } catch (error) {
    console.log(error)
    response.status(400).json({ error: error.message })
  }
})

/* 
notesRouter.get('/:id', async (request, response) => {
  //try-catch blocks and next can be removed because of express-async-errors
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

notesRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id
  })
  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  response.status(201).json(savedNote)
})

notesRouter.put('/:id', async (request, response) => {
  const { content, important } = request.body
  const updatedNote = await Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
  response.json(updatedNote)
}) */

module.exports = recipesRouter
