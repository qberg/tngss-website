import { createContext, useContext, useState, useEffect } from 'react'
import { useEventFilters, useInfinteEvents } from '../../../hooks/useEventData'

const MainEventsContext = createContext({
  filters: {},
  updateFilters: () => {},

  filterOptions: null,
  isLoadingFilterOptions: false,

  events: [],
  isLoading: false,
  isLoadingMore: false,
  hasMore: false,
  loadMore: () => {},
  totalCount: 0,

  selectedDate: 'all',
  setSelectedDate: () => {},
  availableDates: [],
  dateCounts: {},

  showEventsSkeleton: false,
  showDateTabsSkeleton: false,
  showFiltersSkeleton: false,
})

MainEventsContext.displayName = 'MainEventsContext'

const MainEventsProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    public_only: true,
    dates: '',
    zones: '',
    halls: '',
    formats: '',
    tags: '',
    access_levels: '',
    time_start: '',
    time_end: '',
  })

  const [selectedDate, setSelectedDate] = useState('all')

  const { data: filterOptions, isLoading: isLoadingFilterOptions } =
    useEventFilters(filters)

  const {
    events,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    totalCount,
    refetch,
  } = useInfinteEvents(filters)

  useEffect(() => {
    if (selectedDate === 'all') {
      updateFilters({ dates: '' })
    } else {
      updateFilters({ dates: selectedDate })
    }
  }, [selectedDate])

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }))
  }

  const handleDateSelection = (date) => {
    setSelectedDate(date)
  }

  const { availableDates, dateCounts } = (() => {
    if (!filterOptions?.available?.dates) {
      return { availableDates: [], dateCounts: {} }
    }

    const dates = filterOptions.available.dates
      .filter((date) => date.slug !== 'all')
      .map((date) => date.slug)
      .sort((a, b) => new Date(a) - new Date(b))

    const counts = {
      all: filterOptions.meta?.all_events || 0,
      ...dates.reduce((acc, date) => {
        acc[date] = filterOptions.meta?.filtered_events || 0
        return acc
      }, {}),
    }

    return {
      availableDates: dates,
      dateCounts: counts,
    }
  })()

  // Skeleton loading logic
  const showEventsSkeleton = isLoading && events.length === 0
  const showDateTabsSkeleton = isLoadingFilterOptions && !filterOptions
  const showFiltersSkeleton = isLoadingFilterOptions && !filterOptions

  const contextValue = {
    filters,
    updateFilters,

    filterOptions,
    isLoadingFilterOptions,

    events,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    totalCount,

    selectedDate,
    setSelectedDate: handleDateSelection,
    availableDates,
    dateCounts,

    showEventsSkeleton,
    showDateTabsSkeleton,
    showFiltersSkeleton,
  }

  return (
    <MainEventsContext.Provider value={contextValue}>
      {children}
    </MainEventsContext.Provider>
  )
}

const useMainEvents = () => {
  const context = useContext(MainEventsContext)
  return context
}

export { MainEventsProvider, useMainEvents }
