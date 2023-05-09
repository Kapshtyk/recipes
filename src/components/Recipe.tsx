import React, { useContext, useEffect, useState } from 'react'
import { RecipeType } from '../types/recipes'
import { useParams } from 'react-router-dom'
import { UserType } from '../types/users'
import { CommentType } from '../types/comments'
import { CommentsContext, RecipesContext, UsersContext } from '../utils/context'
import Image from './Image'
import cl from '../styles/Recipe.module.css'

const Recipe = () => {
  const [recipe, setRecipe] = useState<RecipeType | undefined>()
  const [recipes, setRecipes] = useContext(RecipesContext)
  const [author, setAuthor] = useState<UserType | undefined>()
  const [users, setUsers] = useContext(UsersContext)
  const [recipeComments, setRecipeComments] = useState<CommentType[]>([])
  const [comments, setComments] = useContext(CommentsContext)
  const { recipe_id } = useParams<{ recipe_id: string }>()

  useEffect(() => {
    if (recipe_id) {
      const data = recipes.filter((recipe) => {
        if (recipe.id === +recipe_id) {
          return recipe
        }
      })
      setRecipe(data[0])
    }
  }, [])

  useEffect(() => {
    if (recipe) {
      const userData = users.filter((user) => {
        return user.id === recipe.authorId
      })
      setAuthor(userData[0])
      const commentsData = comments
        .filter((comment) => {
          return comment.recipeId === recipe.id
        })
        .map((comment) => {
          const authorData = users.find((user) => user.id === comment.authorId)
          return {
            ...comment,
            authorFirstname: authorData?.firstname,
            authorLastname: authorData?.lastname
          }
        })
      setRecipeComments(commentsData)
    }
  }, [recipe, comments, users])

  if (!recipe) {
    return <div>Loading...</div>
  }

  return (
    <div className={cl.recipe_container}>
      <h1 className={cl.recipe_title}>{recipe.title}</h1>
      <h2 className={cl.recipe_description}>{recipe.description}</h2>
      <h3 className={cl.recipe_instructions}>{recipe.instruction}</h3>
      <details className={cl.recipe_details}>
        <summary className={cl.recipe_summary}>Ingredients</summary>
        <ul className={cl.recipe_ul}>
          {recipe.ingredients.length > 0 &&
            recipe.ingredients.map((ingredient) => {
              return (
                <li key={ingredient.name} className={cl.recipe_li}>
                  {ingredient.name}: {ingredient.quantity} {ingredient.units}
                </li>
              )
            })}
        </ul>
      </details>
      <h4 className={cl.recipe_author}>
        Author: {author?.firstname} {author?.lastname}
      </h4>
      {recipeComments.length > 0 && (
        <div className={cl.recipe_comments}>
          {recipeComments.map((comment) => {
            return (
              <div key={comment.id}>
                <p className={cl.recipe_comment_author}>
                  {comment.authorFirstname} {comment.authorLastname}:
                </p>
                <p className={cl.recipe_comment}>{comment.text}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Recipe
