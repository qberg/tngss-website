import PartnerEventsListing from '../../agenda/PartnerEventsListing'
import { useEventType } from '../context/EventTypeContext'

const AgendaCardsContent = () => {
  const { selectedEventType } = useEventType()

  return (
    <div>
      {/* Content based on event type */}
      {selectedEventType === 'partner_event' && <PartnerEventsListing />}

      {selectedEventType === 'main_event' && (
        <div className='text-center py-16'>
          <h3 className='text-xl font-semibold text-gray-800 mb-2'>
            Main Events
          </h3>
          <p className='text-gray-600'>
            Server-side filtering implementation coming soon
          </p>
        </div>
      )}
    </div>
  )
}

export default AgendaCardsContent
