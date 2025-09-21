import { useSponsorFormWp } from '../../../hooks/useQueryApi'
import DynamicForm from '../../Elements/Forms/DynamicForm'
import { ModalProvider } from '../../Elements/Forms/ModalContext'
import { AuroraCard, AuroraCardFooter, AuroraCardTitle } from '../AuroraCard'

const SponsorForm = () => {
  const { data: sponsorsData, isLoading, error } = useSponsorFormWp()

  if (!sponsorsData?.data) {
    return null
  }
  return (
    <ModalProvider>
      <AuroraCard>
        <AuroraCardTitle
          title={sponsorsData.data.title}
          description={sponsorsData.data.description}
        />
        <DynamicForm data={sponsorsData.data} />
        <AuroraCardFooter message='You may still receive emails from us regarding any current registrations or orders.' />
      </AuroraCard>
    </ModalProvider>
  )
}

export default SponsorForm
