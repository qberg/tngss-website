import { createContext, useContext, useState, useEffect } from 'react'
import { OrganisationTypeLabels, SectorLabels } from '../utils/labelMaps'
import { useInfiniteExhibitors } from '../../../hooks/useExhibitorsData'

const ExhibitorsContext = createContext({
  draftFilters: {},
  updateDraftFilters: () => {},

  appliedFilters: {},
  applyFilters: () => {},

  filterOptions: null,

  exhibitors: [],
  isLoading: false,
  isLoadingMore: false,
  hasMore: false,
  loadMore: () => {},
  totalCount: 0,

  clearAllFilters: () => {},
  hasActiveFilters: false,
  hasPendingChanges: false,

  showExhibitorSkeleton: false,
})

ExhibitorsContext.displayName = 'ExhibitorsContext'

const ExhibitorsProvider = ({ children }) => {
  const getInitialFilters = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)

      return {
        sector_interested: urlParams.get('sector_interested') || '',
        organisation_type: urlParams.get('organisation_type') || '',
        search: urlParams.get('search') || '',
      }
    }
    return {
      sector_interested: '',
      organisation_type: '',
      search: '',
    }
  }
  const [appliedFilters, setAppliedFilters] = useState(getInitialFilters)
  const [draftFilters, setDraftFilters] = useState(appliedFilters)

  const filterOptions = {
    sectors: Object.entries(SectorLabels).map(([value, label]) => ({
      value,
      label,
    })),
    organisationTypes: Object.entries(OrganisationTypeLabels).map(
      ([value, label]) => ({
        value,
        label,
      })
    ),
  }

  const queryFilters = {
    ...appliedFilters,
    search: draftFilters.search,
  }

  const {
    exhibitors,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    totalCount,
  } = useInfiniteExhibitors(queryFilters)

  useEffect(() => {
    const params = new URLSearchParams()

    if (appliedFilters.organisation_type) {
      params.set('organisation_type', appliedFilters.organisation_type)
    }

    if (appliedFilters.sector_interested) {
      params.set('sector_interested', appliedFilters.sector_interested)
    }

    if (draftFilters.search.trim()) {
      params.set('search', draftFilters.search.trim())
    }

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params}`
      : window.location.pathname

    window.history.replaceState({}, '', newUrl)
  }, [appliedFilters, draftFilters.search])

  const updateDraftFilters = (newFilters) => {
    setDraftFilters((prev) => ({
      ...prev,
      ...newFilters,
    }))
  }

  const applyFilters = () => {
    setAppliedFilters({ ...draftFilters })
  }

  const clearAllFilters = () => {
    const defaultFilters = {
      organisation_type: '',
      sector_interested: '',
      search: '',
    }

    setDraftFilters(defaultFilters)
    setAppliedFilters(defaultFilters)
  }

  const hasActiveFilters =
    appliedFilters.organisation_type !== '' ||
    appliedFilters.sector_interested !== '' ||
    draftFilters.search.trim() !== ''

  const hasPendingChanges =
    JSON.stringify(draftFilters) !== JSON.stringify(appliedFilters)

  const showExhibitorsSkeleton = isLoading && exhibitors.length === 0

  const contextValue = {
    draftFilters,
    updateDraftFilters,

    appliedFilters,
    applyFilters,

    filterOptions,

    exhibitors,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    totalCount,

    clearAllFilters,
    hasActiveFilters,
    hasPendingChanges,

    showExhibitorsSkeleton,
  }

  return (
    <ExhibitorsContext.Provider value={contextValue}>
      {children}
    </ExhibitorsContext.Provider>
  )
}

const useExhibitors = () => {
  const context = useContext(ExhibitorsContext)

  if (!context) {
    throw new Error('useExhibitors must be used within a ExhibitorsProvider')
  }
  return context
}

export { ExhibitorsProvider, useExhibitors }
