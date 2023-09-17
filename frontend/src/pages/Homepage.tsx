import React from 'react'

import { useGetRecipesQuery } from '../app/services/recipes'

const Homepage = () => {
  const { data, error, isLoading } = useGetRecipesQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <h1>Something went wrong</h1>
  }

  return (
    <div>
      {data?.map((recipe) => (
        <div key={recipe._id}>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Homepage
