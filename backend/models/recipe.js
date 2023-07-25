const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  origin: {
    type: String,
    required: true,
    minlength: 5
  },
  description: {
    type: String,
    required: true,
    minlength: 10
  },
  instructions: {
    type: String,
    required: true,
    minlength: 10
  },
  image: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RecipeIngredient'
    }
  ]
})

recipeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Recipe', recipeSchema)
