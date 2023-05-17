import React, { useContext, useState } from 'react'

import { addComment } from '../api/APIrecipes'
import { RecipeType } from '../types/recipes'
import { CommentsContext, CurrentUserContext } from '../utils/context'

import cl from '../styles/AddComment.module.css'

const AddComment = ({ recipe }: { recipe: RecipeType }) => {
  const fetchComments = useContext(CommentsContext).fetchComments
  const currentUser = useContext(CurrentUserContext).currentUser
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
        authorId: currentUser.id as number,
        recipeId: recipe.id as number,
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
        <button className={cl.form_submit} type="submit">
          Add
        </button>
      </form>
    </div>
  )
}

export default AddComment
