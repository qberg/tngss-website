import { useTicketsInfoWp } from '../../../hooks/useQueryApi'
import ExhibitorBlock from '../ExhibitorBlock'
import TicketHero from '../TicketHero'

const TicketPage = () => {
  const {
    data,
    isLoading: guidelinesLoading,
    error: guidelinesError,
  } = useTicketsInfoWp()

  const heroHeaders = data?.section_headers?.pass_headers
  const exhibitorHeaders = data?.section_headers?.exhibitor_headers
  const guidelinesData = data?.guidelines?.guidelines || []

  return (
    <main className='home-fade-in text-white font-urbanist'>
      <TicketHero headers={heroHeaders} />
      <ExhibitorBlock
        guidelinesData={guidelinesData}
        headers={exhibitorHeaders}
      />
    </main>
  )
}

export default TicketPage
