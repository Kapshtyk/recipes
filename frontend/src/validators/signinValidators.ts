export const signinValidators = {
  email: (value: string) => {
    if (!value) {
      return 'Email is required'
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return 'Invalid email address'
    }
    return null
  },
  password: (value: string) => {
    if (!value) {
      return 'Password is required'
    }
    return null
  }
}
