import { payloadClient } from '../utils/payloadClient'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export const useEventFilters = (filters = {}) => {
  return useQuery({
    queryKey: ['events-filters'],
    queryFn: async () => {
      const queryParams = {
        public_only: filters.public_only?.toString() || 'true',
        dates: filters.dates || '',
        zones: filters.zones || '',
        halls: filters.halls || '',
        formats: filters.formats || '',
        tags: filters.tags || '',
        access_levels: filters.access_levels || '',
        time_start: filters.time_start || '',
        time_end: filters.time_end || '',
      }

      const cleanParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, value]) => value !== '')
      )

      const result = await payloadClient.get(
        '/api/events/main_events/filters',
        cleanParams
      )

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

      console.log()

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
