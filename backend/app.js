const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const recipesRouter = require('./controllers/recipes')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const Recipe = require('./models/recipe')
const Ingredient = require('./models/ingredient')
const RecipeIngredient = require('./models/recipeIngredient')

/* const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger') */
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

console.log('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
/* app.use(express.static('build')) */
app.use(express.json())
/* app.use(middleware.requestLogger) */
app.use('/api/recipes', recipesRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
/* app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler) */

module.exports = app
