import React, { useContext, useEffect, useState } from 'react'
import { RecipeType } from '../types/recipes'
import { Link, useLocation, useParams } from 'react-router-dom'
import { UserType } from '../types/users'
import { CommentType } from '../types/comments'
import {
  CommentsContext,
  CurrentUserContext,
  RecipesContext,
  UsersContext
} from '../utils/context'
import cl from '../styles/Recipe.module.css'
import AddComment from './AddComment'

const Recipe = () => {
  const [recipe, setRecipe] = useState<RecipeType>()
  const recipes = useContext(RecipesContext)[0]
  const [author, setAuthor] = useState<UserType>()
  const users = useContext(UsersContext)[0]
  const [recipeComments, setRecipeComments] = useState<CommentType[]>([])
  const comments = useContext(CommentsContext)[0]
  const currentUser = useContext(CurrentUserContext)[0]
  const { recipe_id } = useParams<{ recipe_id: string }>()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (recipe_id) {
        const data = recipes.filter((recipe) => {
          if (recipe.id === +recipe_id) {
            return recipe
          }
        })
        if (data.length > 0) {
          setRecipe(data[0])
        }
        setIsLoading(false)
      }
    }
    fetchData()
  }, [recipe_id, recipes])

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

  const onClick = () => {
    localStorage.setItem('redirectPath', JSON.stringify(location))
  }

  if (isLoading) {
    return <div className={cl.plug}>Loading...</div>
  }

  if (!recipe) {
    return <div className={cl.plug}>Recipe not found</div>
  }

  return (
    <div className={cl.recipe_container}>
      <h1 className={cl.recipe_title}>
        {recipe.title} from {recipe.origin}
      </h1>
      <h2 className={cl.recipe_description}>{recipe.description}</h2>
      <h3 className={cl.recipe_instructions}>{recipe.instruction}</h3>
      <details className={cl.recipe_details}>
        <summary className={cl.recipe_summary}>Ingredients</summary>
        <ul className={cl.recipe_ul}>
          {recipe &&
            recipe.ingredients.length > 0 &&
            recipe.ingredients.map((ingredient) => {
              return (
                <li key={ingredient.name} className={cl.recipe_li}>
                  <span className={cl.recipe_ingredient_name}>
                    {ingredient.name}:
                  </span>{' '}
                  {ingredient.quantity} {ingredient.units}
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
          {currentUser && recipe.id && <AddComment recipe={recipe} />}
          {!currentUser && recipe.id && (
            <div className={cl.recipe_login}>
              Please{' '}
              <Link onClick={onClick} className={cl.login_link} to="/login">
                log in
              </Link>{' '}
              if you want to leave a comment
            </div>
          )}
        </div>
      )}
      {recipeComments.length == 0 && (
        <div className={cl.recipe_comments}>
          {currentUser && recipe.id && <AddComment recipe={recipe} />}
          {!currentUser && recipe.id && (
            <div className={cl.recipe_login}>
              Please{' '}
              <Link onClick={onClick} className={cl.login_link} to="/login">
                log in
              </Link>{' '}
              if you want to leave a comment
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Recipe
