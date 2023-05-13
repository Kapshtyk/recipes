import React, { useContext, useState } from 'react'
import cl from '../styles/AddRecipe.module.css'
import { CurrentUserContext, RecipesContext, CommentsContext } from '../utils/context'
import { RecipeType } from '../types/recipes'
import { addComment } from '../api/APIrecipes'

const AddComment = ({ recipe }: { recipe: RecipeType }) => {
  const recipes = useContext(RecipesContext)[0]
  const {fetchComments} = useContext(CommentsContext)[2]
  const currentUser = useContext(CurrentUserContext)[0]
  const [comment, setComment] = useState({})

  const onChangeInput = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    setComment(event.target.value)
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentUser && recipe) {
      const commentData = {
        authorId: recipe.authorId,
        recipeId: recipe.id,
        text: comment,
        createdAt: new Date()
      }
      if (await addComment(commentData)) {
        fetchComments()
      }
    }

  }

  return (
    <div className={cl.form_container}>
      <form
        className={cl.form}
        onSubmit={onSubmit}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
          }
        }}
      >
        <input
          className={cl.form_input}
          type="text"
          name="text"
          placeholder="text"
          onChange={onChangeInput}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddComment
