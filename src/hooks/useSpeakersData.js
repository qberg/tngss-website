import { payloadClient } from '../utils/payloadClient'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

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
    queryKey: ['speakers', 'infinite', filters],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        'where[isPublic][equals]': 'true',
        depth: '2',
        sort: 'name',
        limit: limit.toString(),
        page: pageParam.toString(),
        'where[speaker_type.slug][not_equals]': 'government-dignitaries',
      })

      if (filters.speaker_type && filters.speaker_type !== 'all') {
        params.set('where[speaker_type.slug][equals]', filters.speaker_type)
      }

      if (filters.countries && filters.countries.length > 0) {
        params.set('where[location.country][in]', filters.countries.join(','))
      }

      if (filters.tags && filters.tags.length > 0) {
        params.set('where[tags.slug][in]', filters.tags.join(','))
      }

      const url = `https://cms.tngss.startuptn.in/api/speakers?${params.toString()}`
      console.log('Final URL:', url)

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
      console.log('Pagination check:', {
        hasNextPage: lastPage.hasNextPage,
        nextPage: lastPage.nextPage,
      })
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
