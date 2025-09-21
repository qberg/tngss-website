import CodissiaTitle from '../CodissiaTitle'
import { useEventType } from '../context/EventTypeContext'
import EventTypeTabs from '../EventTypeTabs'
import { HeaderSectionWrapper, TabsHeaderWrapper } from '../Layout'
import MainDateTabs from '../MainDateTabs'
import PartnerDateTabs from '../PartnerDateTabs'

const AgendaCardsContentHeader = () => {
  const { selectedEventType } = useEventType()

  return (
    <HeaderSectionWrapper>
      <TabsHeaderWrapper>
        <div className='order-3 md:order-1'>
          {selectedEventType === 'partner_event' && <PartnerDateTabs />}
          {selectedEventType === 'main_event' && <MainDateTabs className='' />}
        </div>

        {selectedEventType === 'main_event' && (
          <div className='order-1 md:order-2'>
            <CodissiaTitle />
          </div>
        )}

        <EventTypeTabs className='order-2 md:order-2' />
      </TabsHeaderWrapper>

      {/*main event filters*/}
    </HeaderSectionWrapper>
  )
}

export default AgendaCardsContentHeader
