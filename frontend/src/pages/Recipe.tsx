import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import AddComment from '../components/AddComment'
import style from '../styles/Form.module.css'
import cl from '../styles/Recipe.module.css'
import { CommentType, CommentsType } from '../types/comments'
import { RecipeType } from '../types/recipes'
import { UserType } from '../types/users'
import {
  CommentsContext,
  CurrentUserContext,
  RecipesContext,
  UsersContext
} from '../utils/context'

const Recipe = () => {
  const [recipe, setRecipe] = useState<RecipeType | undefined>()
  const recipes = useContext(RecipesContext).recipes
  const [author, setAuthor] = useState<UserType | undefined>()
  const users = useContext(UsersContext).users
  const [recipeComments, setRecipeComments] = useState<CommentType[]>([])
  const comments = useContext(CommentsContext).comments
  const currentUser = useContext(CurrentUserContext).currentUser
  const recipe_id = useParams<{ recipe_id: string }>().recipe_id
  const location = useLocation()
  const [isRecipeLoaded, setIsRecipeLoaded] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setIsRecipeLoaded(false)
      if (recipes && recipe_id) {
        const data = recipes.filter((recipe) => {
          if ('id' in recipe) {
            return recipe.id === +recipe_id
          }
        })
        if (data.length > 0) {
          setRecipe(data[0])
        }
      }
      setIsRecipeLoaded(true)
    }
    fetchData()
  }, [recipe_id, recipes])

  useEffect(() => {
    if (recipe && 'id' in recipe && users && comments) {
      const userData = users.filter((user) => {
        if ('id' in user) {
          return user.id === recipe.authorId
        }
      })
      setAuthor(userData[0])
      const commentsData = comments
        .filter((comment: CommentType) => {
          if ('recipeId' in comment) {
            return comment.recipeId === recipe.id
          }
        })
        .map((comment: CommentType) => {
          if ('authorId' in comment) {
            const authorData = users.find((user) => {
              if ('id' in user) {
                return user.id === comment.authorId
              }
            })
            if (authorData && 'firstname' in authorData) {
              return {
                ...comment,
                authorFirstname: authorData?.firstname,
                authorLastname: authorData?.lastname
              } as CommentType
            }
          }
        })
      setRecipeComments(commentsData as CommentsType)
    }
  }, [recipe, comments, users])

  const onClick = () => {
    localStorage.setItem('redirectPath', JSON.stringify(location))
  }

  if (!isRecipeLoaded) {
    return <div className={cl.plug}>Loading...</div>
  }

  if (recipe && 'id' in recipe) {
    return (
      <div className={style.container}>
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
          Author:{' '}
          {author && 'firstname' in author && (
            <>
              {author.firstname} {author.lastname}
            </>
          )}
        </h4>
        <div className={cl.recipe_comments}>
          {recipeComments.length > 0 &&
            recipeComments.map((comment) => {
              if ('id' in comment) {
                return (
                  <div key={comment.id}>
                    <p className={cl.recipe_comment_author}>
                      {comment.authorFirstname} {comment.authorLastname}:
                    </p>
                    <p className={cl.recipe_comment}>{comment.text}</p>
                  </div>
                )
              }
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
  return <div className={cl.plug}>Recipe not found</div>
}

export default Recipe
