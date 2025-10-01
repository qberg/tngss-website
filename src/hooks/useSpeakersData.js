import { payloadClient } from '../utils/payloadClient'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useDebounce } from 'use-debounce'

export const useSpeakersFilters = (filters = {}) => {
  return useQuery({
    queryKey: ['speakers-filters'],
    queryFn: async () => {
      const result = await payloadClient.get('/api/speakers/filters')

      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error || 'Failed to fetch filters')
      }
    },
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    retry: 3,
  })
}

export const useInfiniteSpeakers = (filters = {}, limit = 9) => {
  const [debouncedSearch] = useDebounce(filters.search || '', 500)
  const queryFilters = {
    ...filters,
    search: debouncedSearch,
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['speakers', 'infinite', queryFilters],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        'where[isPublic][equals]': 'true',
        depth: '2',
        sort: 'name',
        limit: limit.toString(),
        page: pageParam.toString(),
        'where[speaker_type.slug][not_in]':
          'government-dignitaries,guest,government-officials',
      })

      if (queryFilters.speaker_type && queryFilters.speaker_type !== 'all') {
        params.set('where[speaker_type.slug][equals]', filters.speaker_type)
      }

      if (queryFilters.countries && queryFilters.countries.length > 0) {
        params.set('where[location.country][in]', filters.countries.join(','))
      }

      if (queryFilters.tags && queryFilters.tags.length > 0) {
        params.set('where[tags.slug][in]', filters.tags.join(','))
      }

      if (queryFilters.search && queryFilters.search.trim()) {
        params.set('where[name][contains]', filters.search.trim())
      }

      const url = `https://cms.tngss.startuptn.in/api/speakers?${params.toString()}`

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextPage : undefined
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  })

  const speakers = data?.pages?.flatMap((page) => page.docs || []) || []
  const firstPage = data?.pages?.[0]

  return {
    speakers,
    isLoading,
    isLoadingMore: isFetchingNextPage,
    hasMore: hasNextPage,
    loadMore: fetchNextPage,
    error: isError ? error : null,
    refetch,
    totalCount: firstPage?.totalDocs || 0,
    totalPages: firstPage?.totalPages || 0,
    currentPage: firstPage?.page || 1,
    hasNextPage: firstPage?.hasNextPage || false,
    hasPrevPage: firstPage?.hasPrevPage || false,
  }
}

export const useSpeakerBySlug = (slug) => {
  return useQuery({
    queryKey: ['speaker', 'detail', slug],
    queryFn: async () => {
      if (!slug) throw new Error('Slug is required')

      const response = await fetch(
        `https://cms.tngss.startuptn.in/api/speakers?where[slug][equals]=${slug}&depth=2&limit=1`
      )

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.docs.length === 0) {
        throw new Error('Speaker not found')
      }

      return data.docs[0]
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  })
}

export const useSpeakersByType = (speakerTypeSlug, options = {}) => {
  const { limit = 10, enabled = true } = options

  return useQuery({
    queryKey: ['speakers', 'by-type', speakerTypeSlug, limit],
    queryFn: async () => {
      if (!speakerTypeSlug) throw new Error('Speaker type slug is required')

      const params = new URLSearchParams({
        'where[isPublic][equals]': 'true',
        'where[speaker_type.slug][equals]': speakerTypeSlug,
        depth: '2',
        sort: 'sort_order',
        limit: limit.toString(),
      })

      const url = `https://cms.tngss.startuptn.in/api/speakers?${params.toString()}`

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data.docs
    },
    enabled: enabled && !!speakerTypeSlug,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  })
}
