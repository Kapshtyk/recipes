import React, { useContext, useState } from 'react'
import cl from '../styles/AddComment.module.css'
import {
  CurrentUserContext,
  CommentsContext
} from '../utils/context'
import { RecipeType } from '../types/recipes'
import { addComment } from '../api/APIrecipes'

const AddComment = ({ recipe }: { recipe: RecipeType }) => {
  const { fetchComments } = useContext(CommentsContext)[2]
  const currentUser = useContext(CurrentUserContext)[0]
  const [comment, setComment] = useState('')

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
        authorId: currentUser.id,
        recipeId: recipe.id,
        text: comment,
        createdAt: new Date()
      }
      if (await addComment(commentData)) {
        fetchComments()
        setComment('')
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
        <textarea
          className={cl.form_input}
          name="text"
          placeholder="Add comment"
          onChange={onChangeInput}
          required
          value={comment}
        />
        <button className={cl.form_submit} type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddComment
