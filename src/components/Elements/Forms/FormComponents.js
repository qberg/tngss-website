import FormButton from '../FormButton'
import { AdvancedPhoneInput } from './Fields/Phone'
import InputWrapper from './InputWrapper'
import { ScrollableSelect } from './ScrollableSelect'
import { getFieldWidth, getInputType } from './utils/formHelpers'
import { validateField } from './utils/validators'

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
        if (
          field.name === 'phone_number' ||
          field.name === 'phone' ||
          field.name === 'mobile'
        ) {
          return (
            <AdvancedPhoneInput
              field={field}
              fieldApi={fieldApi}
              inputClasses={inputClasses}
            />
          )
        }
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

export {
  FormContainer,
  FormElement,
  FieldsGrid,
  FieldWrapper,
  FieldLabel,
  FieldInput,
  FieldError,
  SubmitButtonContainer,
}
