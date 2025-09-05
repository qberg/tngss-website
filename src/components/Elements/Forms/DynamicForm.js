import { useForm } from '@tanstack/react-form'
import ShineButton from '../ShineButton'
import FormButton from '../FormButton'
import { ScrollableSelect } from './ScrollableSelect'
import InputWrapper from './InputWrapper'

const DynamicForm = ({ data }) => {
  const formInstance = useForm({
    defaultValues: createDefaultValues(data?.form?.fields),
    onSubmit: handleFormSubmission(data?.form?.id),
  })

  if (!data?.form) return null

  return (
    <FormContainer>
      <FormElement formInstance={formInstance}>
        <FieldsGrid fields={data.form.fields} form={formInstance} />
        <SubmitButtonContainer form={formInstance} />
      </FormElement>
    </FormContainer>
  )
}

// Layout Components
const FormContainer = ({ children }) => (
  <section className='px-4 md:px-0 w-full md:w-10/12 mx-auto'>
    {children}
  </section>
)

const FormElement = ({ formInstance, children }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault()
      formInstance.handleSubmit()
    }}
  >
    {children}
  </form>
)

const FieldsGrid = ({ fields, form }) => (
  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-12 md:gap-y-8 2xl:gap-14 mb-10 md:mb-20 w-full'>
    {fields.map((field) => (
      <FieldWrapper key={field.id} field={field} form={form} />
    ))}
  </div>
)

const FieldWrapper = ({ field, form }) => (
  <div className={getFieldWidth(field.width)}>
    <form.Field
      name={field.name}
      validators={{
        onChange: ({ value }) => validateField(field, value),
      }}
      children={(fieldApi) => (
        <FieldContainer field={field} fieldApi={fieldApi} />
      )}
    />
  </div>
)

const FieldContainer = ({ field, fieldApi }) => (
  <div>
    <FieldLabel field={field} />
    <FieldInput field={field} fieldApi={fieldApi} />
    <FieldError fieldApi={fieldApi} />
  </div>
)

const FieldLabel = ({ field }) => (
  <label className='block text-xl md:text-2xl font-semibold mb-1'>
    {field.label}
    {field.required && <span className='text-red-500 ml-1'>*</span>}
  </label>
)

const FieldInput = ({ field, fieldApi }) => {
  const inputClasses =
    'w-full px-3 md:px-4 py-3 rounded-md focus:outline-none bg-transparent'

  const renderInputElement = () => {
    switch (field.blockType) {
      case 'text':
        return (
          <InputWrapper>
            <input
              type={getInputType(field)}
              value={fieldApi.state.value}
              onChange={(e) => fieldApi.handleChange(e.target.value)}
              onBlur={fieldApi.handleBlur}
              className={inputClasses}
            />
          </InputWrapper>
        )

      case 'email':
        return (
          <InputWrapper>
            <input
              type='email'
              value={fieldApi.state.value}
              onChange={(e) => fieldApi.handleChange(e.target.value)}
              onBlur={fieldApi.handleBlur}
              className={inputClasses}
            />
          </InputWrapper>
        )

      case 'select':
      case 'state':
      case 'country':
        return <ScrollableSelect field={field} fieldApi={fieldApi} />

      default:
        return (
          <InputWrapper>
            <input
              type='text'
              value={fieldApi.state.value}
              onChange={(e) => fieldApi.handleChange(e.target.value)}
              onBlur={fieldApi.handleBlur}
              className={inputClasses}
            />
          </InputWrapper>
        )
    }
  }

  return renderInputElement()
}

const FieldError = ({ fieldApi }) => {
  if (fieldApi.state.meta.errors.length === 0) return null

  return (
    <p className='text-red-500 text-sm mt-1'>{fieldApi.state.meta.errors[0]}</p>
  )
}

const SubmitButtonContainer = ({ form }) => (
  <div className='flex items-center justify-center w-full'>
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting]}
      children={([canSubmit, isSubmitting]) => (
        <FormButton
          type='submit'
          disabled={!canSubmit}
          className='!hover:bg-black w-40 md:w-60 2xl:w-80 justify-center text-white'
          contCN='!bg-none py-3 px-5 w-full'
        >
          {isSubmitting ? 'Submitting...' : 'SUBMIT'}
        </FormButton>
      )}
    />
  </div>
)

const handleFormSubmission = (formId) => {
  return async ({ value }) => {
    console.log('Form submitted with value:', value)

    try {
      const response = await fetch(
        `${process.env.REACT_APP_CMS_API_URL}/api/form-submissions`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            form: formId,
            submissionData: value,
          }),
        }
      )

      if (response.ok) {
        alert('Form submitted successfully!')
      } else {
        alert('Submission failed')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Network error')
    }
  }
}

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

  if (field.name === 'phone_number' && value) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      return 'Please enter a valid phone number'
    }
  }

  return undefined
}

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

export default DynamicForm
