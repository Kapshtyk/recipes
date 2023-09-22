const BASE_URL = 'http://localhost:3001/'
const APP_NAME = 'RecipesApp'
const SIGN_UP_INPUT_ELEMENTS = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    value: ''
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    value: ''
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    value: ''
  },
  {
    name: 'confirmPassword',
    label: 'Confirm password',
    type: 'password',
    value: ''
  }
]
export const SIGN_IN_INPUT_ELEMENTS = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    value: ''
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    value: ''
  }
]
const CREARE_RECIPE_INPUT_ELEMENTS = [
  {
    name: 'title',
    type: 'text',
    label: 'Title',
    value: ''
  },
  {
    name: 'description',
    type: 'text',
    label: 'Description',
    value: ''
  },
  {
    name: 'origin',
    type: 'text',
    label: 'Origin',
    value: ''
  },
  {
    name: 'instructions',
    type: 'textarea',
    label: 'Instructions',
    value: ''
  },
  {
    name: 'photo',
    type: 'file',
    label: 'Photo',
    value: '',
    accept: 'image/*'
  }
]

export {
  APP_NAME,
  BASE_URL,
  CREARE_RECIPE_INPUT_ELEMENTS,
  SIGN_UP_INPUT_ELEMENTS
}
