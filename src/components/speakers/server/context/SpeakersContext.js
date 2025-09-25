import { createContext, useContext, useState, useEffect } from 'react'

const SpeakersContext = createContext({
  draftFilters: {},
  updateDraftFilters: () => {},

  appliedFilters: {},
  updateAppliedFilters: () => {},

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

  tiggleTag: () => {},
  toggleCountry: () => {},

  showSpeakerSkeleton: false,
  showFiltersSkeleton: false,
})

SpeakersContext.displayName = 'SpeakersContext'

const SpeakersProvider = ({ children }) => {
  const router = useRouter()
}
