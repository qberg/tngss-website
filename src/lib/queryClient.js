import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,

    retry: (failureCount, error) => {
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false
      }
      return failureCount < 3
    },

    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

    refetchOnWindowFocus: true,

    refetchOnReconnect: true,
  },
  mutations: {
    retry: 1,
  },
})
