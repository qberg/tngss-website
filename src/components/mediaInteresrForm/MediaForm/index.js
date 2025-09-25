import { useMediaFormWp } from '../../../hooks/useQueryApi'
import DynamicForm from '../../Elements/Forms/DynamicForm'
import { ModalProvider } from '../../Elements/Forms/ModalContext'
import {
  AuroraCard,
  AuroraCardFooter,
  AuroraCardTitle,
} from '../../sponsorInterestForm/AuroraCard'

const MediaForm = () => {
  const { data: mediaData, isLoading, error } = useMediaFormWp()

  if (!mediaData?.data) {
    return null
  }

  const mediaFormOptions = {
    successTitle: 'Registration Successful!',
    successMessage: 'Thank you for showing interest.',
    redirectPath: null,
  }
  return (
    <ModalProvider>
      <AuroraCard>
        <AuroraCardTitle
          title={mediaData.data.title}
          description={mediaData.data.description}
        />
        <DynamicForm data={mediaData.data} formOptions={mediaFormOptions} />
        <AuroraCardFooter message='' />
      </AuroraCard>
    </ModalProvider>
  )
}

export default MediaForm
