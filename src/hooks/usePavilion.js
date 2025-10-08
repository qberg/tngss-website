import { useQuery } from '@tanstack/react-query'
import { payloadClient } from '../utils/payloadClient'

export const useGlobalPavilion = () => {
  return useQuery({
    queryKey: ['global-wp'],
    queryFn: async () => {
      const result = await payloadClient.get('/api/global-wp', {
        depth: 2,
        limit: 0,
        sort: 'country',
      })

      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error || 'Failed to fetch global pavilion')
      }
    },
    staleTime: 10 * 60 * 1000,
    retry: 2,
  })
}

export const useSpaceTechPavilion = () => {
  return useQuery({
    queryKey: ['space-tech-wp'],
    queryFn: async () => {
      const result = await payloadClient.get('/api/space-wp', {
        depth: 2,
        limit: 0,
        sort: 'country',
      })

      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error || 'Failed to fetch space tech pavilion')
      }
    },
    staleTime: 10 * 60 * 1000,
    retry: 2,
  })
}
