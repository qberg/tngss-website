import { useForm } from '@tanstack/react-form'
import { useModal } from './ModalContext'
import {
  FieldsGrid,
  FormContainer,
  FormElement,
  SubmitButtonContainer,
} from './FormComponents'
import { createDefaultValues } from './utils/formHelpers'
import handleFormSubmission from './utils/formSubmission'

const DynamicForm = ({ data }) => {
  const { showModal } = useModal()

  const formInstance = useForm({
    defaultValues: createDefaultValues(data?.form?.fields),
    onSubmit: handleFormSubmission(data?.form?.id, showModal),
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

export default DynamicForm
