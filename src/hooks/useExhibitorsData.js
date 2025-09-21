import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import exhibitorApiClient from '../utils/exhibitorApiClient'
import { generateExhibitorSlug, getHallFromBooth } from '../utils/exhibitors'

const BASE_EXPO_ID = '0632d025-28d8-4650-92ed-f240a695d023'

export const useExhibitorsData = (
  expoId = BASE_EXPO_ID,
  filters = {},
  options = {}
) => {
  const {
    page = 1,
    limit = 20,
    sector_interested = '',
    profile_type = '',
    organisation_type = '',
    booths = '',
    search = '',
  } = filters

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(sector_interested && { sector_interested }),
    ...(profile_type && { profile_type }),
    ...(organisation_type && { organisation_type }),
    ...(booths && { booths }),
    ...(search && { search }),
  })

  const endpoint = `/v1/expo/${expoId}/organiser/exhibitor/data?${queryParams}`

  return useQuery({
    queryKey: ['exhibitors', expoId],
    queryFn: async () => {
      const result = await exhibitorApiClient.get(endpoint)

      if (result.success) {
        return result?.data.data || []
      } else {
        throw new Error(result.error || 'Failed to fetch exhibitor data')
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    ...options,
  })
}

export const useInfiniteExhibitors = (filters = {}, expoId = BASE_EXPO_ID) => {
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
    queryKey: ['exhibitors-infinite', expoId, filters],
    queryFn: async ({ pageParam = 1 }) => {
      // Build query parameters
      const queryParams = {
        ...filters,
        page: pageParam,
        limit: 20,
      }

      const endpoint = `/v1/expo/${expoId}/organiser/exhibitor/data`
      const params = new URLSearchParams(
        Object.entries(queryParams).filter(
          ([_, value]) => value !== '' && value != null
        )
      ).toString()

      const result = await exhibitorApiClient.get(`${endpoint}?${params}`)

      if (result.success) {
        return result.data // Returns { meta: {...}, data: [...] }
      } else {
        throw new Error(result.error || 'Failed to fetch exhibitor data')
      }
    },
    getNextPageParam: (lastPage) => {
      const meta = lastPage?.meta || {}
      const currentPage = meta.page || 1
      const totalPages = meta.total_pages || 1

      // Return next page number if there are more pages, otherwise undefined
      return currentPage < totalPages ? currentPage + 1 : undefined
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
    retry: 3,
    refetchOnWindowFocus: false,
  })

  // Flatten all pages into single array of exhibitors
  const exhibitors = data?.pages?.flatMap((page) => page.data || []) || []

  // Get meta info from first page
  const meta = data?.pages?.[0]?.meta || {}

  return {
    exhibitors,
    isLoading,
    isLoadingMore: isFetchingNextPage,
    hasMore: hasNextPage,
    loadMore: fetchNextPage,
    error: isError ? error : null,
    refetch,
    meta,
    totalCount: meta.total_count || 0,
    totalPages: meta.total_pages || 0,
    currentPage: meta.page || 1,
  }
}

export const useExhibitorBySlug = (
  slug,
  expoId = BASE_EXPO_ID,
  options = {}
) => {
  const endpoint = `/v1/expo/${expoId}/organiser/exhibitor/data/${slug}`

  return useQuery({
    queryKey: ['exhibitor', expoId, slug],
    queryFn: async () => {
      const result = await exhibitorApiClient.get(endpoint)

      if (result.success) {
        const exhibitor = result?.data || null

        if (exhibitor) {
          return {
            ...exhibitor,
            hall: getHallFromBooth(slug),
          }
        }

        return exhibitor
      } else {
        throw new Error(result.error || 'Exhibitor not found')
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    enabled: !!slug,
    ...options,
  })
}
