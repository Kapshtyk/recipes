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

export { APP_NAME, BASE_URL, SIGN_UP_INPUT_ELEMENTS }
