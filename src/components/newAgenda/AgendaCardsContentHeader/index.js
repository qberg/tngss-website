import { useEventType } from '../context/EventTypeContext'
import EventTypeTabs from '../EventTypeTabs'
import { HeaderSectionWrapper, TabsHeaderWrapper } from '../Layout'
import PartnerDateTabs from '../PartnerDateTabs'

const AgendaCardsContentHeader = () => {
  const { selectedEventType } = useEventType()

  return (
    <HeaderSectionWrapper>
      <TabsHeaderWrapper>
        <div className='order-2 md:order-1'>
          {selectedEventType === 'partner_event' && <PartnerDateTabs />}
        </div>

        <EventTypeTabs className='order-1 md:order-2' />
      </TabsHeaderWrapper>

      {/*main event filters*/}
    </HeaderSectionWrapper>
  )
}

export default AgendaCardsContentHeader
