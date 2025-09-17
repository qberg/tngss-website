const validateField = (field, value) => {
  if (field.required && (!value || value.trim() === '')) {
    return `${field.label} is required`
  }

  if (field.blockType === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
  }

  if (
    (field.name === 'phone_number' ||
      field.name === 'phone' ||
      field.name === 'mobile') &&
    value
  ) {
    return validateIndianPhoneNumber(field, value)
  }

  return undefined
}

const validateIndianPhoneNumber = (field, value) => {
  if (field.required && (!value || value.trim() === '')) {
    return `${field.label} is required`
  }

  if (value) {
    const digitsOnly = value.replace(/\D/g, '')

    if (digitsOnly.length === 0) {
      return undefined
    }

    if (digitsOnly.length !== 10) {
      return `Mobile number must be exactly 10 digits (currently ${digitsOnly.length})`
    }

    const validPrefixes = ['6', '7', '8', '9']
    if (!validPrefixes.includes(digitsOnly[0])) {
      return 'Mobile number must start with 6, 7, 8, or 9'
    }
  }

  return undefined
}

export { validateField }
