import React from 'react'
import RecipePreview from './components/RecipePreview'

function App() {
  const recipes = [
    {
      id: 1,
      title: 'Borscht',
      origin: 'Ukraine',
      description: 'A hearty soup made with beets and other vegetables',
      instruction:
        'Boil beets, carrots, potatoes, and cabbage until tender. Sauté onions and garlic, then add to the pot along with beef broth and tomato paste. Season with dill and vinegar.',
      image: 'images/borscht.jpg',
      authorId: 1,
      ingredients: [
        { name: 'beets', quantity: 2, units: 'medium' },
        { name: 'carrots', quantity: 2, units: 'medium' },
        { name: 'potatoes', quantity: 2, units: 'medium' },
        { name: 'cabbage', quantity: 1, units: 'small' },
        { name: 'onion', quantity: 1, units: 'medium' },
        { name: 'garlic', quantity: 3, units: 'cloves' },
        { name: 'beef broth', quantity: 4, units: 'cups' },
        { name: 'tomato paste', quantity: 1, units: 'tablespoon' },
        { name: 'dill', quantity: 1, units: 'tablespoon' },
        { name: 'vinegar', quantity: 2, units: 'tablespoons' }
      ]
    }
  ]

  return RecipePreview(recipes[0])
}

export default App
