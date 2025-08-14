import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../utils/apiClient'

export const useApiData = (queryKey, endpoint, options = {}) => {
  const {
    enabled = true,
    staleTime = 5 * 60 * 1000,
    cacheTime = 10 * 60 * 1000,
    retry = 3,
    onSuccess = null,
    onError = null,
    ...queryOptions
  } = options

  return useQuery({
    queryKey,
    queryFn: async () => {
      if (!endpoint) {
        throw new Error('No endpoint provided')
      }

      const result = await apiClient.get(endpoint)

      if (result.success) {
        onSuccess?.(result.data)
        return result.data
      } else {
        const error = new Error(result.error || 'API request failed')
        onError?.(error)
        throw error
      }
    },
    enabled,
    staleTime,
    cacheTime,
    retry,
    ...queryOptions,
  })
}

export const useAboutData = (options = {}) => {
  const query = useApiData(['about-us'], '/api/globals/about-us-wp', {
    staleTime: 10 * 60 * 1000,
    ...options,
  })

  return {
    data: query.data || {},
    loading: query.isLoading,
    error: query.error,
    refresh: query.refetch,
    isStale: query.isStale,
    isFetching: query.isFetching,
  }
}

export const useSpeakersData = (options = {}) => {
  const query = useApiData(['speakers'], '/api/speakers', {
    staleTime: 2 * 60 * 1000,
    ...options,
  })

  return {
    data: query.data || {},
    loading: query.isLoading,
    error: query.error,
    refresh: query.refetch,
    isStale: query.isStale,
    isFetching: query.isFetching,
  }
}
