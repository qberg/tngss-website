const FORM_CONFIGS = {
  default: {
    successTitle: 'Form Submitted Successfully!',
    successMessage:
      'Thank you for your submission. Please check your mail inbox for the brochure',
    redirectPath: '/why-sponsor',
  },
}

const transformFormData = (value) => {
  return Object.entries(value).map(([name, value]) => ({
    field: name,
    value,
  }))
}

const submitFormData = async (formId, submissionData) => {
  const apiUrl = process.env.REACT_APP_CMS_API_URL
  if (!apiUrl) {
    throw new Error('API URL not configured')
  }
  return fetch(`${apiUrl}/api/form-submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      form: formId,
      submissionData,
    }),
  })
}

const handleSubmissionError = async (error, showModal) => {
  let errorMessage =
    'There was an error submitting your form. Please try again.'

  if (error instanceof Response) {
    try {
      const errorData = await error.json()
      errorMessage = errorData.message || `Server error (${error.status})`
    } catch {
      errorMessage = `Server error (${error.status})`
    }
  } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
    // Network error
    errorMessage = 'Network error. Please check your connection and try again.'
  } else if (error.message === 'API URL not configured') {
    // Configuration error
    errorMessage = 'Configuration error. Please contact support.'
  } else {
    // Other errors
    errorMessage = error.message || errorMessage
  }

  showModal('Submission Failed', errorMessage, 'error')
}

const handleFormSubmission = (formId, showModal, options = {}) => {
  const config = {
    ...FORM_CONFIGS.default,
    ...(FORM_CONFIGS[options.type] || {}),
    ...options,
  }

  return async ({ value }) => {
    try {
      console.log('Form submitted with value:', value)
      const dataToSend = transformFormData(value)
      const response = await submitFormData(formId, dataToSend)

      if (response.ok) {
        showModal(
          config.successTitle,
          config.successMessage,
          'success',
          config.redirectPath
        )
      } else {
        await handleSubmissionError(response, showModal)
      }
    } catch (error) {
      console.error('Submission error:', error)
      await handleSubmissionError(error, showModal)
    }
  }
}

export default handleFormSubmission

export {
  transformFormData,
  submitFormData,
  handleSubmissionError,
  FORM_CONFIGS,
}
