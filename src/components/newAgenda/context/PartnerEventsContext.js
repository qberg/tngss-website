import { createContext, useContext, useState, useMemo } from 'react'
import { usePartnerEventsData } from '../../../hooks/useQueryApi'

const PartnerEventsContext = createContext({
  selectedDate: 'all',
  setSelectedDate: () => {},
  availableDates: [],
  dateCounts: {},
  filteredEvents: [],
  isLoading: false,
})

PartnerEventsContext.displayName = 'PartnerEventsContext'

const PartnerEventsProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState('all')
  const { data: partnerEventsData, isLoading } = usePartnerEventsData()

  const { availableDates, dateCounts, filteredEvents } = useMemo(() => {
    const events = partnerEventsData?.docs || []

    const partnerEvents = events.filter((event) => {
      return (
        event.main_or_partner === 'partner_event' && event.isPublic === true
      )
    })

    // Extract unique dates
    const allDates = [
      ...new Set(
        partnerEvents
          .filter((event) => event.schedule?.from_date)
          .map((event) => new Date(event.schedule.from_date).toDateString())
      ),
    ].sort((a, b) => new Date(a) - new Date(b))

    const dateEventCounts = {
      all: partnerEvents.length,
      ...allDates.reduce((acc, date) => {
        acc[date] = partnerEvents.filter((event) => {
          if (!event.schedule?.from_date) return false
          return new Date(event.schedule.from_date).toDateString() === date
        }).length
        return acc
      }, {}),
    }

    const eventsFilteredByDate =
      selectedDate === 'all'
        ? partnerEvents
        : partnerEvents.filter((event) => {
            if (!event.schedule?.from_date) return false
            return (
              new Date(event.schedule.from_date).toDateString() === selectedDate
            )
          })

    return {
      availableDates: allDates,
      dateCounts: dateEventCounts,
      filteredEvents: eventsFilteredByDate,
    }
  }, [partnerEventsData, selectedDate])

  const contextValue = {
    selectedDate,
    setSelectedDate,
    availableDates,
    dateCounts,
    filteredEvents,
    isLoading,
  }

  return (
    <PartnerEventsContext.Provider value={contextValue}>
      {children}
    </PartnerEventsContext.Provider>
  )
}

const usePartnerEvents = () => {
  const context = useContext(PartnerEventsContext)
  return context
}

export { PartnerEventsProvider, usePartnerEvents }
