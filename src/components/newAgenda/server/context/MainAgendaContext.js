import { createContext, useContext, useState, useEffect, useRef } from 'react'
import {
  useEventFilters,
  useInfiniteAgenda,
} from '../../../../hooks/useEventData'

const MainAgendaContext = createContext({
  draftFilters: {},
  updateDraftFilters: () => {},

  appliedFilters: {},

  filterOptions: null,
  isLoadingFilterOptions: false,

  agendas: [],
  isLoading: false,
  isLoadingMore: false,
  hasMore: false,
  loadMore: () => {},
  totalCount: 0,

  clearAllFilters: () => {},
  hasActiveFilters: false,

  toggleZone: () => {},
  toggleFormat: () => {},
  toggleTag: () => {},

  showAgendaSkeleton: false,
})

MainAgendaContext.displayName = 'MainAgendaContext'

const MainAgendaProvider = ({ children }) => {
  const getInitialFilters = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      return {
        date: urlParams.get('date') || 'all',
        hall: urlParams.get('hall') || 'all',
        zones: urlParams.get('zones') ? urlParams.get('zones').split(',') : [],
        formats: urlParams.get('formats')
          ? urlParams.get('formats').split(',')
          : [],
        tags: urlParams.get('tags') ? urlParams.get('tags').split(',') : [],
        access_level: urlParams.get('access') || 'all',
        search: urlParams.get('search') || '',
      }
    }

    return {
      date: 'all',
      hall: 'all',
      zones: [],
      formats: [],
      tags: [],
      access_level: 'all',
      search: '',
    }
  }

  const [appliedFilters, setAppliedFilters] = useState(getInitialFilters)
  const [draftFilters, setDraftFilters] = useState(appliedFilters)
  const debounceTimerRef = useRef(null)

  const queryFilters = appliedFilters

  const { data: filterOptions, isLoading: isLoadingFilterOptions } =
    useEventFilters()

  const { agendas, isLoading, isLoadingMore, hasMore, loadMore, totalCount } =
    useInfiniteAgenda(queryFilters)

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(() => {
      setAppliedFilters({ ...draftFilters })
    }, 400)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [draftFilters])

  useEffect(() => {
    const params = new URLSearchParams()

    if (appliedFilters.date !== 'all') {
      params.set('date', appliedFilters.date)
    }

    if (appliedFilters.hall !== 'all') {
      params.set('hall', appliedFilters.hall)
    }

    if (appliedFilters.zones.length > 0) {
      params.set('zones', appliedFilters.zones.join(','))
    }

    if (appliedFilters.formats.length > 0) {
      params.set('formats', appliedFilters.formats.join(','))
    }

    if (appliedFilters.tags.length > 0) {
      params.set('tags', appliedFilters.tags.join(','))
    }

    if (appliedFilters.access_level !== 'all') {
      params.set('access', appliedFilters.access_level)
    }

    if (appliedFilters.search.trim()) {
      params.set('search', appliedFilters.search.trim())
    }

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params}`
      : window.location.pathname

    window.history.replaceState({}, '', newUrl)
  }, [appliedFilters])

  const updateDraftFilters = (newFilters) => {
    setDraftFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const toggleZone = (zoneSlug) => {
    setDraftFilters((prev) => ({
      ...prev,
      zones: prev.zones.includes(zoneSlug)
        ? prev.zones.filter((z) => z !== zoneSlug)
        : [...prev.zones, zoneSlug],
    }))
  }

  const toggleFormat = (formatSlug) => {
    setDraftFilters((prev) => ({
      ...prev,
      formats: prev.formats.includes(formatSlug)
        ? prev.formats.filter((f) => f !== formatSlug)
        : [...prev.formats, formatSlug],
    }))
  }

  const toggleTag = (tagSlug) => {
    setDraftFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagSlug)
        ? prev.tags.filter((t) => t !== tagSlug)
        : [...prev.tags, tagSlug],
    }))
  }

  const clearAllFilters = () => {
    const defaultFilters = {
      date: 'all',
      hall: 'all',
      zones: [],
      formats: [],
      tags: [],
      access_level: 'all',
      search: '',
    }

    setDraftFilters(defaultFilters)
    setAppliedFilters(defaultFilters)
  }

  const hasActiveFilters =
    appliedFilters.date !== 'all' ||
    appliedFilters.hall !== 'all' ||
    appliedFilters.zones.length > 0 ||
    appliedFilters.formats.length > 0 ||
    appliedFilters.tags.length > 0 ||
    appliedFilters.access_level !== 'all' ||
    appliedFilters.search.trim() !== ''

  const showAgendaSkeleton = isLoading && (agendas?.length || 0) === 0

  const contextValue = {
    draftFilters,
    updateDraftFilters,

    appliedFilters,

    filterOptions,
    isLoadingFilterOptions,

    agendas: agendas || [],
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    totalCount,

    clearAllFilters,
    hasActiveFilters,

    toggleZone,
    toggleFormat,
    toggleTag,

    showAgendaSkeleton,
  }

  return (
    <MainAgendaContext.Provider value={contextValue}>
      {children}
    </MainAgendaContext.Provider>
  )
}

const useAgenda = () => {
  const context = useContext(MainAgendaContext)
  if (!context) {
    throw new Error('useAgenda must be used within MainAgendaProvider')
  }
  return context
}

export { MainAgendaProvider, useAgenda }
