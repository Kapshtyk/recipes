const mongoose = require('mongoose')

const recipeIngredientSchema = new mongoose.Schema({
  ingredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient'
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }
})

recipeIngredientSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const RecipeIngredient = mongoose.model(
  'RecipeIngredient',
  recipeIngredientSchema
)

module.exports = RecipeIngredient
