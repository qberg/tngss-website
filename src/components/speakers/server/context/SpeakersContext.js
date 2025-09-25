import { createContext, useContext, useState, useEffect } from 'react'
import {
  useInfiniteSpeakers,
  useSpeakersFilters,
} from '../../../../hooks/useSpeakersData'

const SpeakersContext = createContext({
  draftFilters: {},
  updateDraftFilters: () => {},

  appliedFilters: {},
  applyFilters: () => {},

  filterOptions: null,
  isLoadingFilterOptions: false,

  speakers: [],
  isLoading: false,
  isLoadingMore: false,
  hasMore: false,
  loadMore: () => {},
  totalCount: 0,

  clearAllFilters: () => {},
  hasActiveFilters: false,
  hasPendingChanges: false,

  toggleTag: () => {},
  toggleCountry: () => {},

  showSpeakersSkeleton: false,
  showFiltersSkeleton: false,
})

SpeakersContext.displayName = 'SpeakersContext'

const SpeakersProvider = ({ children }) => {
  const getInitialFilters = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      return {
        speaker_type: urlParams.get('type') || 'all',
        countries: urlParams.get('countries')
          ? urlParams.get('countries').split(',')
          : [],
        tags: urlParams.get('tags') ? urlParams.get('tags').split(',') : [],
      }
    }
    return {
      speaker_type: 'all',
      countries: [],
      tags: [],
    }
  }

  const [appliedFilters, setAppliedFilters] = useState(getInitialFilters)
  const [draftFilters, setDraftFilters] = useState(appliedFilters)

  const { data: filterOptions, isLoading: isLoadingFilterOptions } =
    useSpeakersFilters()

  const { speakers, isLoading, isLoadingMore, hasMore, loadMore, totalCount } =
    useInfiniteSpeakers(appliedFilters)

  useEffect(() => {
    const params = new URLSearchParams()

    if (appliedFilters.speaker_type !== 'all') {
      params.set('type', appliedFilters.speaker_type)
    }

    if (appliedFilters.countries.length > 0) {
      params.set('countries', appliedFilters.countries.join(','))
    }

    if (appliedFilters.tags.length > 0) {
      params.set('tags', appliedFilters.tags.join(','))
    }

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params}`
      : window.location.pathname

    window.history.replaceState({}, '', newUrl)
  }, [appliedFilters])

  const updateDraftFilters = (newFilters) => {
    setDraftFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const toggleTag = (tagId) => {
    setDraftFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId],
    }))
  }

  const toggleCountry = (countryName) => {
    setDraftFilters((prev) => ({
      ...prev,
      countries: prev.countries.includes(countryName)
        ? prev.countries.filter((name) => name !== countryName)
        : [...prev.countries, countryName],
    }))
  }

  const applyFilters = () => {
    setAppliedFilters({ ...draftFilters })
  }

  const clearAllFilters = () => {
    const defaultFilters = {
      speaker_type: 'all',
      tags: [],
      countries: [],
    }

    setDraftFilters(defaultFilters)
    setAppliedFilters(defaultFilters)
  }

  const hasActiveFilters =
    appliedFilters.speaker_type !== 'all' ||
    appliedFilters.countries.length > 0 ||
    appliedFilters.tags.length > 0

  const hasPendingChanges =
    JSON.stringify(draftFilters) !== JSON.stringify(appliedFilters)
  const showSpeakersSkeleton = isLoading && speakers.length === 0
  const showFiltersSkeleton = isLoadingFilterOptions && !filterOptions

  const contextValue = {
    draftFilters,
    updateDraftFilters,

    appliedFilters,
    applyFilters,

    filterOptions,
    isLoadingFilterOptions,

    speakers,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    totalCount,

    clearAllFilters,
    hasActiveFilters,
    hasPendingChanges,
    toggleTag,
    toggleCountry,

    showFiltersSkeleton,
    showSpeakersSkeleton,
  }

  return (
    <SpeakersContext.Provider value={contextValue}>
      {children}
    </SpeakersContext.Provider>
  )
}

const useSpeakers = () => {
  const context = useContext(SpeakersContext)

  if (!context) {
    throw new Error('useSpeakers must be used within a SpeakersProvider')
  }
  return context
}

export { SpeakersProvider, useSpeakers }
