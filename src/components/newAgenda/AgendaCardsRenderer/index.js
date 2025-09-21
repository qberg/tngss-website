import { SectionWrapper } from '../../Layout/Section'
import AgendaCardsContent from '../AgendaCardsContent'
import AgendaCardsContentHeader from '../AgendaCardsContentHeader'
import { EventTypeProvider, useEventType } from '../context/EventTypeContext'
import { MainEventsProvider } from '../context/MainEventsContext'
import { PartnerEventsProvider } from '../context/PartnerEventsContext'

const AgendaCardsRenderer = () => {
  return (
    <SectionWrapper variant='wide'>
      <EventTypeProvider>
        <MainEventsProvider>
          <PartnerEventsProvider>
            <AgendaCardsContentHeader />
            <AgendaCardsContent />
          </PartnerEventsProvider>
        </MainEventsProvider>
      </EventTypeProvider>
    </SectionWrapper>
  )
}

export default AgendaCardsRenderer
