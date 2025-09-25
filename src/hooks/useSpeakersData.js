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

export const useInfiniteSpeakers = (filters={}, limit=10) {
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
    queryKey: ['speakers', 'infinite', fitlers],
    queryFn: async ({pageParam = 1}) => {
      const queryParams = new URLSearchParams({
        'where[isPublic][equals]': 'true',
        depth: '2',
        sort: 'name',
        limit: limit.toString(),
        page: pageParam.toString(),
        'where[speaker_type.slug][not_equals]': 'government-dignitaries',
      })

      if (filters.speaker_type && filters.speaker_type !== 'all') {
        queryParams.set('where[speaker_type.slug][equals]', filters.speaker_type)
      }

      if (filters.countries && filters.countries.length > 0) {
        queryParams.set('where[location.country][in]', filters.countries.join(','))
      }

      if (filters.tags && filters.tags.length > 0) {
        queryParams.set('where[tags.slug][in]', filters.tags.join(','))
      }

      const result = await payloadClient.get(
        '/api/speakers/',
        queryParams
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
    
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  })

  const speakers = data?.pages?.flatMap((page) => page.events || []) || []
  
  const pagination = data?.pages?.[0]?.pagination || {}

  
  return {
    speakers,
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
