export const authValidators = [
  {
    name: 'email',
    validator: (value: string) => {
      if (!value) {
        return 'Email is required'
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        return 'Invalid email address'
      }
      return null
    }
  },
  {
    name: 'password',
    validator: (value: string) => {
      if (value.length < 6) {
        return 'Password must be at least 6 characters'
      }
      if (!/[A-Z]/.test(value)) {
        return 'Password must contain at least 1 uppercase letter'
      }
      if (!/\d/.test(value)) {
        return 'Password must contain at least 1 digit'
      }
      return null
    }
  },
  {
    name: 'passwordConfirm',
    validator: (value: string, formData: { [key: string]: string }) => {
      if (value.length < 6) {
        return 'Passwords does not match'
      }
      if (value !== formData.password) {
        return 'Passwords does not match'
      }
      return null
    }
  }
]
