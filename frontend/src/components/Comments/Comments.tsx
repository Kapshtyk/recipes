import React, { useEffect, useState } from 'react'
import { Form } from '../Form'
import { ADD_COMMENT_INPUT_ELEMENTS } from '../../utils/constants'
import { handleErrors } from '../../utils/handleErrors'
import { signinValidators } from '../../validators'

const Comments = () => {
  const [error, setError] = useState({})
  const onSubmit = () => {
    alert('Comment added')
  }
  return (
    <Form
      onSubmit={onSubmit}
      inputElements={ADD_COMMENT_INPUT_ELEMENTS}
      noValidate={true}
      validators={signinValidators}
      submittingErrors={error}
      label="Add comment"
      full={true}
    />
  )
}

export { Comments }


