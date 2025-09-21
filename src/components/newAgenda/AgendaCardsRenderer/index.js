import { useInfinteEvents } from '../../../hooks/useEventData'
import { SectionWrapper } from '../../Layout/Section'
import AgendaCardsContent from '../AgendaCardsContent'
import AgendaCardsContentHeader from '../AgendaCardsContentHeader'
import { EventTypeProvider } from '../context/EventTypeContext'
import { PartnerEventsProvider } from '../context/PartnerEventsContext'

const AgendaCardsRenderer = () => {
  //const { data: filterOptions, isLoading, error } = useEventFilters()
  const {
    events,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    error,
    totalCount,
  } = useInfinteEvents()

  return (
    <SectionWrapper variant='wide'>
      <EventTypeProvider>
        <PartnerEventsProvider>
          <AgendaCardsContentHeader />
          <AgendaCardsContent />
        </PartnerEventsProvider>
      </EventTypeProvider>
    </SectionWrapper>
  )
}

export default AgendaCardsRenderer
