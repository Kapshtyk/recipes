export const authValidators = {
  username: (value: string) => {
    if (!value) {
      return 'Username is required'
    }
    if (value.length < 3) {
      return 'Username must be at least 3 characters'
    }
    if (value.length > 20) {
      return 'Username must be less than 20 characters'
    }
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return 'Username must contain only letters and numbers'
    }
    return null
  },
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
  },
  confirmPassword: (value: string, formData: { [key: string]: string }) => {
    if (!value) {
      return 'Password confirmation is required'
    }
    if (value !== formData.password) {
      return 'Passwords does not match'
    }
    return null
  }
}
