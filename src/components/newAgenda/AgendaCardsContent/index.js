import PartnerEventsListing from '../../agenda/PartnerEventsListing'
import { useEventType } from '../context/EventTypeContext'
import MainEventsListing from '../MainEventsListing'

const AgendaCardsContent = () => {
  const { selectedEventType } = useEventType()

  return (
    <div>
      {/* Content based on event type */}
      {selectedEventType === 'partner_event' && <PartnerEventsListing />}

      {selectedEventType === 'main_event' && <MainEventsListing />}
    </div>
  )
}

export default AgendaCardsContent
