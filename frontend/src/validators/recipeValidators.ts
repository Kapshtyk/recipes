export const recipeValidators = {
  title: (value: string) => {
    if (!value) {
      return 'Title is required'
    }
    if (value.length < 3) {
      return 'Title must be at least 3 characters'
    }
    if (value.length > 20) {
      return 'Title must be less than 20 characters'
    }
    return null
  },
  origin: (value: string) => {
    if (!value) {
      return 'Origin is required'
    }
    return null
  },
  description: (value: string) => {
    if (!value) {
      return 'Description is required'
    }
    return null
  },
  instructions: (value: string) => {
    if (!value) {
      return 'Instructions are required'
    }
    return null
  },
  name: (value: string) => {
    if (!value) {
      return 'Name is required'
    }
    if (value.length < 3) {
      return 'Name must be at least 3 characters'
    }
    if (value.length > 20) {
      return 'Name must be less than 20 characters'
    }
    return null
  },
  units: (value: string) => {
    if (!value) {
      return 'Units are required'
    }
    if (value.length < 1) {
      return 'Units must be at least 1 character'
    }
    if (value.length > 20) {
      return 'Units must be less than 20 characters'
    }
    return null
  },
  quantity: (value: string) => {
    if (!value) {
      return 'Quantity is required'
    }
    return null
  }
}
