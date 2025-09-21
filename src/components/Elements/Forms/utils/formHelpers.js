const createDefaultValues = (fields = []) => {
  return fields.reduce((acc, field) => {
    if (field.blockType !== 'message') {
      acc[field.name] = field.defaultValue || ''
    }
    return acc
  }, {})
}

const getFieldWidth = (width) => {
  return width === 50 ? 'col-span-1' : 'col-span-2'
}

const getInputType = (field) => {
  return field.name === 'phone_number' ? 'tel' : 'text'
}

export { createDefaultValues, getFieldWidth, getInputType }
