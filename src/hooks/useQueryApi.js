import { useQuery } from '@tanstack/react-query'
import { payloadClient } from '../utils/payloadClient'

const QUERY_DEFAULTS = {
  SHORT_STALE_TIME: 5 * 60 * 1000,
  LONG_STALE_TIME: 10 * 60 * 1000,
  DEFAULT_RETRY: 2,
}

const usePayloadQuery = (queryKey, endpoint, options = {}) => {
  const {
    payloadOptions = {},
    queryOptions = {},
    errorMessage = 'Failed to fetch data',
  } = options

  return useQuery({
    queryKey,
    queryFn: async () => {
      const result = await payloadClient.get(endpoint, payloadOptions)

      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error || errorMessage)
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
    ...queryOptions,
  })
}

export const useEventsData = () => {
  return usePayloadQuery(['events'], '/api/events', {
    payloadOptions: {
      limit: 0,
      depth: 2,
      sort: 'schedule.from_date',
      where: { isPublic: { equals: true } },
    },
    errorMessage: 'Failed to fetch events',
  })
}

export const useSpeakersData = () => {
  return usePayloadQuery(['speakers', 'all-with-relations'], '/api/speakers', {
    payloadOptions: {
      limit: 0,
      depth: 2,
      sort: 'sort_order',
      where: { isPublic: { equals: true } },
    },
    errorMessage: 'Failed to fetch speakers',
  })
}

export const useSpeakerBySlug = (slug) => {
  return useQuery({
    queryKey: ['speaker', slug],
    queryFn: async () => {
      const result = await payloadClient.get('/api/speakers', {
        limit: 1,
        depth: 2,
        where: {
          slug: { equals: slug },
          status: { equals: 'confirmed' },
        },
      })

      if (result.success && result.data.docs && result.data.docs.length > 0) {
        return result.data.docs[0]
      } else if (
        result.success &&
        result.data.docs &&
        result.data.docs.length === 0
      ) {
        throw new Error('Speaker not found')
      } else {
        throw new Error(result.error || 'Failed to fetch speaker')
      }
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })
}

export const useSpeakerBySlugFromCache = (slug) => {
  const { data: speakersData, isLoading, error } = useSpeakersData()

  return useQuery({
    queryKey: ['speaker', 'from-cache', slug],
    queryFn: () => {
      if (!speakersData?.docs) {
        throw new Error('Speakers data not available')
      }

      const speaker = speakersData.docs.find((speaker) => speaker.slug === slug)
      if (!speaker) {
        throw new Error('Speaker not found')
      }

      return speaker
    },
    enabled: !!slug && !!speakersData?.docs && !isLoading && !error,
    staleTime: 5 * 60 * 1000,
  })
}

export const useSpeakerBySlugEff = (slug) => {
  const { data: speakersData, isLoading: speakersLoading } = useSpeakersData()

  return useQuery({
    queryKey: ['speaker', 'smart', slug],
    queryFn: async () => {
      // First try cache
      if (speakersData?.docs) {
        const speakerFromCache = speakersData.docs.find(
          (speaker) => speaker.slug === slug
        )
        if (speakerFromCache) {
          return { data: speakerFromCache, source: 'cache' }
        }
      }

      // Fallback to direct API
      const result = await payloadClient.get('/api/speakers', {
        limit: 1,
        depth: 2,
        where: {
          slug: { equals: slug },
          status: { equals: 'confirmed' },
        },
      })

      if (result.success && result.data.docs && result.data.docs.length > 0) {
        return { data: result.data.docs[0], source: 'direct' }
      } else if (
        result.success &&
        result.data.docs &&
        result.data.docs.length === 0
      ) {
        throw new Error('Speaker not found')
      } else {
        throw new Error(result.error || 'Failed to fetch speaker')
      }
    },
    enabled: !!slug && !speakersLoading,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    select: (data) => data.data,
  })
}

export const useSpeakerEvents = (speakerId) => {
  return useQuery({
    queryKey: ['speaker-events', speakerId],
    queryFn: async () => {
      if (!speakerId) {
        return { docs: [] }
      }

      const result = await payloadClient.get('/api/events', {
        limit: 0,
        depth: 5,
        sort: 'schedule.from_date',
        where: {
          'speakers.speaker': { equals: speakerId },
        },
      })

      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error || 'Failed to fetch speaker events')
      }
    },
    enabled: !!speakerId,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })
}

export const useEventsByIds = (eventIds) => {
  return useQuery({
    queryKey: ['events-by-ids', eventIds?.join(',')],
    queryFn: async () => {
      if (!eventIds || eventIds.length === 0) {
        return { docs: [] }
      }

      const result = await payloadClient.get('/api/events', {
        limit: 0,
        depth: 2,
        sort: 'schedule.from_date',
        where: {
          id: { in: eventIds },
        },
      })

      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error || 'Failed to fetch events')
      }
    },
    enabled: !!eventIds && eventIds.length > 0,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })
}

export const useSpeakerTypes = () => {
  return useQuery({
    queryKey: ['speaker-types'],
    queryFn: async () => {
      const result = await payloadClient.get('/api/speaker-types', {
        limit: 0,
        sort: 'name',
      })

      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error || 'Failed to fetch speaker types')
      }
    },
    staleTime: 10 * 60 * 1000,
  })
}

// Tags hook
export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const result = await payloadClient.get('/api/tags', {
        limit: 0,
        sort: 'name',
      })

      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error || 'Failed to fetch tags')
      }
    },
    staleTime: 10 * 60 * 1000,
  })
}

export const useFaqWp = () => {
  return useQuery({
    queryKey: ['faq-wp'],
    queryFn: async () => {
      const result = await payloadClient.get('/api/globals/faq-wp', {
        depth: 2,
      })

      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error || 'Failed to fetch FAQ WP')
      }
    },
    staleTime: 10 * 60 * 1000,
    retry: 2,
  })
}

export const useAboutUsWp = () => {
  return useQuery({
    queryKey: ['about-us-wp'],
    queryFn: async () => {
      const result = await payloadClient.get('/api/globals/about-us-wp', {
        depth: 2,
      })

      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error || 'Failed to fetch About Us WP')
      }
    },
    staleTime: 10 * 60 * 1000,
    retry: 2,
  })
}

export const useHallsData = () => {
  return useQuery({
    queryKey: ['halls'],
    queryFn: async () => {
      const result = await payloadClient.get('/api/halls', {
        limit: 0,
        depth: 2,
        sort: 'name',
      })

      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error || 'Failed to fetch halls')
      }
    },
    staleTime: 10 * 60 * 1000,
    retry: 2,
  })
}

export const useGlobalPavilionData = () => {
  return useQuery({
    queryKey: ['global-pavilion'],
    queryFn: async () => {
      const result = await payloadClient.get('/api/globals/home-wp', {
        depth: 2,
      })

      if (result.success && result.data.global_pavilion) {
        return result.data.global_pavilion
      } else {
        throw new Error(result.error || 'Failed to fetch Global Pavilion data')
      }
    },
    staleTime: 10 * 60 * 1000,
    retry: 2,
  })
}

export const useFeaturedSpeakers = () => {
  return useQuery({
    queryKey: ['featured-speakers'],
    queryFn: async () => {
      const result = await payloadClient.get('/api/globals/home-wp', {
        depth: 3,
      })

      if (result.success && result.data.featured_speakers?.speakers) {
        return {
          docs: result.data.featured_speakers.speakers.map(
            (item) => item.speaker
          ),
        }
      } else {
        throw new Error(result.error || 'Failed to fetch featured speakers')
      }
    },
    staleTime: 10 * 60 * 1000,
    retry: 2,
  })
}

export const useWhyAttendData = () => {
  return useQuery({
    queryKey: ['why-attend-wp'],
    queryFn: async () => {
      const result = await payloadClient.get('/api/globals/why-attend-wp', {
        depth: 2,
      })

      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error || 'Failed to fetch Why Attend data')
      }
    },
    staleTime: 10 * 60 * 1000,
    retry: 2,
  })
}

export const useDiscoverTNFromBase = () => {
  const { data, ...rest } = useWhyAttendData()

  return {
    data: data?.discover_tn,
    ...rest,
  }
}

export const useStakeholdersFromBase = () => {
  const { data, ...rest } = useWhyAttendData()

  return {
    data: data?.stakeholders,
    ...rest,
  }
}
