import { useDebounce } from 'use-debounce'
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

export const useInfiniteAgenda = (filters = {}, limit = 20) => {
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
    queryKey: ['events', 'infinite', filters],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        'where[isPublic][equals]': 'true',
        'where[main_or_partner]': 'main_event',
        depth: '2',
        sort: 'schedule.from_date',
        limit: limit.toString(),
        page: pageParam.toString(),
      })

      if (filters.date && filters.date !== 'all') {
        const startOfDay = `${filters.date}T00:00:00.000Z`
        const endOfDay = `${filters.date}T23:59:59.999Z`

        params.set('where[schedule.from_date][greater_than_equal]', startOfDay)
        params.set('where[schedule.from_date][less_than_equal]', endOfDay)
      }

      if (filters.hall && filters.hall !== 'all') {
        params.set('where[hall.slug][equals]', filters.hall)
      }

      if (filters.access_level && filters.access_level !== 'all') {
        params.set('where[access_level.slug][equals]', filters.access_level)
      }

      if (filters.zones && filters.zones.length > 0) {
        params.set('where[zone.slug][in]', filters.zones.join(','))
      }

      if (filters.formats && filters.formats.length > 0) {
        params.set('where[format.slug][in]', filters.formats.join(','))
      }

      if (filters.tags && filters.tags.length > 0) {
        params.set('where[tags.slug][in]', filters.tags.join(','))
      }

      if (filters.search && filters.search.trim()) {
        params.set('where[title][contains]', filters.search.trim())
      }

      const url = `https://cms.tngss.startuptn.in/api/events?${params.toString()}`

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

  const agendas = data?.pages?.flatMap((page) => page.docs || []) || []
  const firstPage = data?.pages?.[0]

  return {
    agendas,
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
