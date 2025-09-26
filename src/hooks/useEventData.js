import { payloadClient } from '../utils/payloadClient'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export const useEventFilters = (filters = {}) => {
  return useQuery({
    queryKey: ['events-filters'],
    queryFn: async () => {
      const result = await payloadClient.get('/api/events/main_events/filters')

      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error || 'Failed to fetch filters')
      }
    },
    staleTime: 2 * 60 * 1000,
    retry: 2,
  })
}

export const useInfinteEvents = (filters = {}) => {
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
    queryKey: ['events-infinite', filters],
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams = {
        ...filters,
        page: pageParam,
        limit: 10,
        sort: filters.sort || 'date_asc',
      }

      const cleanParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, value]) => value !== '')
      )

      const result = await payloadClient.get(
        '/api/events/main_events/list',
        cleanParams
      )

      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error || 'Failed to fetch events')
      }
    },
    getNextPageParam: (lastPage) => {
      const pagination = lastPage?.pagination || {}
      return pagination.hasNextPage ? pagination.nextPage : undefined
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    refetchOnWindowFocus: false,
  })

  const events = data?.pages?.flatMap((page) => page.events || []) || []
  const pagination = data?.pages?.[0]?.pagination || {}

  return {
    events,
    isLoading,
    isLoadingMore: isFetchingNextPage,
    hasMore: hasNextPage,
    loadMore: fetchNextPage,
    error: isError ? error : null,
    refetch,
    pagination,
    totalCount: pagination.totalDocs || 0,
    totalPages: pagination.totalPages || 0,
    currentPage: pagination.page || 1,
  }
}

export const useEventBySlug = (slug) => {
  return useQuery({
    queryKey: ['event', 'detail', slug],
    queryFn: async () => {
      if (!slug) throw new Error('Slug is required')

      const response = await fetch(
        `https://cms.tngss.startuptn.in/api/events?where[slug][equals]=${slug}&depth=2&limit=1`
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
