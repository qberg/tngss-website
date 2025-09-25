import { useInfiniteQuery } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { payloadClient } from '../utils/payloadClient'

// hooks/useQueryApi.js
export const useSpeakersData = (page = 1, limit = 12) => {
  return usePayloadQuery(['speakers', 'paginated', page], '/api/speakers', {
    payloadOptions: {
      limit,
      page,
      depth: 1,
      sort: 'sort_order',
      where: { isPublic: { equals: true } },
    },
    errorMessage: 'Failed to fetch speakers',
  })
}

export const useInfiniteSpeakersData = (limit = 12) => {
  return useInfiniteQuery({
    queryKey: ['speakers', 'infinite'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        '/api/speakers?' +
          new URLSearchParams({
            limit: limit.toString(),
            page: pageParam.toString(),
            depth: '1',
            sort: 'sort_order',
            'where[isPublic][equals]': 'true',
          })
      )

      if (!response.ok) {
        throw new Error('Failed to fetch speakers')
      }

      return response.json()
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.nextPage
      }
      return undefined
    },
    initialPageParam: 1,
  })
}
