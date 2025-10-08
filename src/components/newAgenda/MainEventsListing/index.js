import { Album, CalendarFold, Clock, MapPin, Ticket } from 'lucide-react'
import Badge from '../../Elements/Badge'
import GradientBadge from '../../Elements/GradientBadge'
import { EventsListingGrid } from '../Layout'
import {
  MainEventCard,
  MainEventCardCardRow,
  MainEventCardContent,
  MainEventCardCta,
  MainEventCardTitle,
} from '../MainEventCard'
import MainEventsEmptyState from '../MainEventsEmptyState'
import { formatDate, formatTime } from '../../../utils/dateHelpers'
import SpeakerProfileCard from '../../agenda/SpeakerProfileCard'
import ShineButton from '../../Elements/ShineButton'
import { ExhibitorCardSkeleton } from '../../exhibitors/ExhibitorListing/loaders'
import InfiniteScrollTrigger from '../../../hooks/useInfiniteScrollTrigger'
import { useAgenda } from '../server/context/MainAgendaContext'
import { SectionWrapper } from '../../Layout/Section'
import MainAgendaHeader from '../MainAgendaHeader'

const MainEventsListing = () => {
  const {
    agendas: events,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    showAgendaSkeleton,
    clearAllFilters,
  } = useAgenda()

  return (
    <SectionWrapper>
      <MainAgendaHeader />
      {/* Initial skeleton load */}
      {showAgendaSkeleton ? (
        <EventsListingGrid>
          {Array.from({ length: 8 }, (_, index) => (
            <ExhibitorCardSkeleton key={`skeleton-${index}`} />
          ))}
        </EventsListingGrid>
      ) : (
        <>
          {/* Empty state */}
          {events.length === 0 && !isLoading && (
            <MainEventsEmptyState onResetFilters={clearAllFilters} />
          )}

          {/* Events grid with loading overlay */}
          {events.length > 0 && (
            <>
              <div className='relative'>
                {/* Loading overlay when filtering */}
                {isLoading && (
                  <div className='absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg min-h-[400px]'>
                    <div className='text-white text-lg'>Loading events...</div>
                  </div>
                )}

                <EventsListingGrid>
                  {events.map((event, index) => {
                    const title = event?.title || ''
                    const tags = event?.tags || []
                    const displayTags = tags.slice(0, 3)
                    const remainingCount = tags.length - 3

                    return (
                      <MainEventCard
                        key={event.id || index}
                        href={`/agenda/${event.slug}`}
                      >
                        <MainEventCardContent>
                          <MainEventCardCardRow>
                            <GradientBadge label={event?.format?.name} />

                            {event?.registeration_mode !== 'none' && (
                              <div className='flex gap-1 items-center highlight-text font-bold font-urbanist'>
                                <Album size={14} />
                                <span>Regn. required</span>
                              </div>
                            )}

                            {event?.access_level && (
                              <div className='flex gap-1 items-center font-bold font-urbanist'>
                                <Ticket size={14} />
                                <span>{event.access_level.name}</span>
                              </div>
                            )}
                          </MainEventCardCardRow>

                          <MainEventCardCardRow>
                            {event?.hall && (
                              <div className='flex items-center gap-1 text-gray-300 font-semibold font-urbanist'>
                                <MapPin size={14} />
                                <span>
                                  {event?.zone?.name
                                    ? `${event.zone.name}, `
                                    : ''}
                                  {event.hall.name}
                                </span>
                              </div>
                            )}
                            {event?.schedule && (
                              <div className='flex gap-3 md:gap-2 md:gap-x-8 flex-wrap'>
                                <div className='flex gap-1 items-center font-semibold font-urbanist text-gray-300'>
                                  <CalendarFold size={14} />
                                  <span>
                                    {formatDate(event.schedule.from_date)}
                                  </span>
                                </div>
                                <div className='flex gap-1 items-center font-semibold font-urbanist text-gray-300'>
                                  <Clock size={14} />
                                  <span>
                                    {formatTime(event.schedule.from_date)} -{' '}
                                    {formatTime(event.schedule.to_date)}
                                  </span>
                                </div>
                              </div>
                            )}
                          </MainEventCardCardRow>

                          <MainEventCardTitle>{title}</MainEventCardTitle>

                          {tags.length > 0 && (
                            <MainEventCardCardRow>
                              {displayTags.map((tag, tagIndex) => (
                                <Badge
                                  key={tagIndex}
                                  variant='primary'
                                  size='md'
                                >
                                  {tag.name}
                                </Badge>
                              ))}
                              {remainingCount > 0 && (
                                <Badge variant='primary' size='md'>
                                  +{remainingCount}
                                </Badge>
                              )}
                            </MainEventCardCardRow>
                          )}

                          {event?.speakers && event.speakers.length > 0 && (
                            <MainEventCardCardRow className='mt-4'>
                              {event.speakers.map((speakerData) => {
                                return (
                                  <SpeakerProfileCard
                                    key={speakerData.id}
                                    speaker={speakerData.speaker}
                                  />
                                )
                              })}
                            </MainEventCardCardRow>
                          )}
                        </MainEventCardContent>

                        <MainEventCardCta>
                          <ShineButton
                            src={`/agenda/${event.slug}`}
                            className='!hover:bg-black w-full justify-center text-white mt-4 md:mt-4'
                            contCN='!bg-none py-1.5 px-2.5 w-full'
                          >
                            View More
                          </ShineButton>
                        </MainEventCardCta>
                      </MainEventCard>
                    )
                  })}

                  {isLoadingMore && (
                    <>
                      {Array.from({ length: 4 }, (_, index) => (
                        <ExhibitorCardSkeleton key={`loading-more-${index}`} />
                      ))}
                    </>
                  )}
                </EventsListingGrid>
              </div>

              <InfiniteScrollTrigger
                onLoadMore={loadMore}
                hasMore={hasMore}
                isLoading={isLoadingMore}
              />

              {!hasMore && (
                <div className='text-center py-8'>
                  <p className='text-gray-400'>You've reached the end!</p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </SectionWrapper>
  )
}

export default MainEventsListing
