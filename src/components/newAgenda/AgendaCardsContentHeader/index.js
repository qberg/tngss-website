import CodissiaTitle from '../CodissiaTitle'
import { useEventType } from '../context/EventTypeContext'
import { useMainEvents } from '../context/MainEventsContext'
import EventTypeTabs from '../EventTypeTabs'
import FormatsFilter from '../FormatsFilter'
import { HeaderSectionWrapper, TabsHeaderWrapper } from '../Layout'
import MainDateTabs from '../MainDateTabs'
import PartnerDateTabs from '../PartnerDateTabs'
import TagsFilter from '../TagsFilter'
import MainZonesFilter from '../ZonesFilter'

const AgendaCardsContentHeader = () => {
  const { selectedEventType } = useEventType()
  const { filters, filterOptions } = useMainEvents()

  const selectedZoneSlug = filters.zones || 'all'

  const selectedZone = filterOptions?.available?.zones?.find(
    (zone) => zone.slug === selectedZoneSlug
  )

  const ZoneContent = () => {
    if (!selectedZone || selectedZoneSlug === 'all') {
      return null
    }

    return (
      <div className='border-2 border-bg-gray flex flex-col gap-2 p-4 w-full rounded-lg'>
        <div className='w-full md:w-7/12 mx-auto'>
          <div className='flex flex-col gap-2'>
            <h3
              className=' font-semibold gradient-text-black  text-2xl md:text-3xl '
              style={{
                lineHeight: '110%',
                padding: '2px',
              }}
            >
              {selectedZone.name} - {selectedZone.hall}
            </h3>

            {selectedZone.content && (
              <p className='text-white'>{selectedZone.content}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <HeaderSectionWrapper>
      <TabsHeaderWrapper>
        <div className='order-3 md:order-1'>
          {selectedEventType === 'partner_event' && (
            <PartnerDateTabs is_main_event={false} />
          )}
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
      {selectedEventType === 'main_event' && <MainZonesFilter />}

      {/*content for selected zone*/}
      {selectedEventType === 'main_event' && <ZoneContent />}

      <div className='hidden md:flex items-center justify-center gap-4'>
        <div className='w-80'>
          {selectedEventType === 'main_event' && <FormatsFilter />}
        </div>
        <div className='w-80'>
          {selectedEventType === 'main_event' && <TagsFilter />}
        </div>
      </div>
    </HeaderSectionWrapper>
  )
}

export default AgendaCardsContentHeader
