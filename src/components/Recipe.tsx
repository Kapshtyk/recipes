import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import { CommentType } from '../types/comments'
import { RecipeType } from '../types/recipes'
import { UserType } from '../types/users'
import {
  CommentsContext,
  CurrentUserContext,
  RecipesContext,
  UsersContext
} from '../utils/context'

import AddComment from './AddComment'

import cl from '../styles/Recipe.module.css'

const Recipe = () => {
  const [recipe, setRecipe] = useState<RecipeType | undefined>()
  const recipes = useContext(RecipesContext).recipes
  const [author, setAuthor] = useState<UserType | undefined>()
  const users = useContext(UsersContext).users
  const [recipeComments, setRecipeComments] = useState<CommentType[]>([])
  const comments = useContext(CommentsContext).comments
  const currentUser = useContext(CurrentUserContext).currentUser
  const recipe_id= useParams<{ recipe_id: string }>().recipe_id
  const location = useLocation()
  const [isRecipeLoaded, setIsRecipeLoaded] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setIsRecipeLoaded(false)
      if (recipes && recipe_id) {
        const data = recipes.filter(
          (recipe: RecipeType) => recipe.id === +recipe_id
        )
        if (data.length > 0) {
          setRecipe(data[0])
        }
      }
      setIsRecipeLoaded(true)
    }
    fetchData()
  }, [recipe_id, recipes])

  useEffect(() => {
    if (recipe && users && comments) {
      const userData = users.filter((user) => {
        return user.id === recipe.authorId
      })
      setAuthor(userData[0])
      const commentsData = comments
        .filter((comment: CommentType) => {
          return comment.recipeId === recipe.id
        })
        .map((comment: CommentType) => {
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

  if (!isRecipeLoaded) {
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
          {recipe.ingredients.length > 0 &&
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
      <div className={cl.recipe_comments}>
        {recipeComments.length > 0 &&
          recipeComments.map((comment) => {
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
    </div>
  )
}

export default Recipe
