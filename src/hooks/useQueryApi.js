import { useQuery } from '@tanstack/react-query'
import { payloadClient } from '../utils/payloadClient'
import { useMemo } from 'react'

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

// learned the hard way the importance of URL encoding
export const useGovtDignitaries = () => {
  return useQuery({
    queryKey: ['speakers', 'government-dignitaries'],
    queryFn: async () => {
      const baseUrl = '/api/speakers'
      const params = new URLSearchParams({
        'where[speaker_type.slug][equals]': 'government-dignitaries',
        'where[isPublic][equals]': 'true',
        limit: '0',
        depth: '2',
        sort: 'sort_order',
      })

      const url = `${baseUrl}?${params.toString()}`

      const result = await payloadClient.get(url)

      if (result.success) {
        return result.data
      } else {
        throw new Error(
          result.error || 'Failed to fetch government dignitaries'
        )
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
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

export const useSponsorsAndPartners = () => {
  return useQuery({
    queryKey: ['spons-wp'],
    queryFn: async () => {
      const result = await payloadClient.get(
        '/api/globals/spons-and-partners-wp',
        {
          depth: 2,
        }
      )

      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error || 'Failed to fetch Spons WP')
      }
    },
    staleTime: 10 * 60 * 1000,
    retry: 2,
  })
}

export const useSponsors = () => {
  const { data, isLoading, error, isError, ...rest } = useSponsorsAndPartners()

  return {
    data: data?.sponsors || null,
    isLoading,
    error,
    isError,
    isEmpty: !data?.sponsors || Object.keys(data.sponsors).length === 0,
    ...rest,
  }
}

export const usePartners = () => {
  const { data, isLoading, error, isError, ...rest } = useSponsorsAndPartners()

  return {
    data: data?.partners || null,
    isLoading,
    error,
    isError,
    isEmpty:
      !data?.partners?.partners?.logos ||
      data.partners.partners.logos.length === 0,
    ...rest,
  }
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

export const useWhyTnData = () => {
  return useQuery({
    queryKey: ['why-tn-wp'],
    queryFn: async () => {
      const result = await payloadClient.get('/api/globals/why-tn-wp', {
        depth: 2,
      })
      if (result.data) {
        return result.data
      } else {
        throw new Error(result.error || 'Failed to fetch Why TN Page')
      }
    },
    staleTime: 10 * 60 * 1000,
    retry: 2,
  })
}

export const useDiscoverTNWhyTN = () => {
  const { data, ...rest } = useWhyTnData()
  return {
    data: data?.discover_tn,
    ...rest,
  }
}

export const useSectorHighlightsData = () => {
  const { data, ...rest } = useWhyTnData()
  return {
    data: data?.sector_higlights,
    ...rest,
  }
}

// export const useImpactNumbers = () => {
//   const { data, ...rest } = useWhyTnData()
//   return {
//     data: data?.discover_tn.impact_numbers,
//     ...rest,
//   }
// }

export const useHighlightsTnFromBase = () => {
  const { data, ...rest } = useWhyTnData()
  return {
    data: data?.tn_highlights.highlight,
    ...rest,
  }
}

export const useTickets = () => {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: async () => {
      const baseUrl = '/api/tickets'
      const params = new URLSearchParams({
        'where[isPublic][equals]': 'true',
        limit: '0',
        depth: '2',
      })

      const url = `${baseUrl}?${params.toString()}`

      const result = await payloadClient.get(url)

      if (result.success) {
        return result.data
      } else {
        throw new Error(
          result.error || 'Failed to fetch government dignitaries'
        )
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })
}

// oh yay learned about a pattern for fetching and filteritng data with hooks, gonna try it till i learn. Dont judge, be curious of how i am fucking up, have to read about mvc model
export const usePassTickets = () => {
  const { data, ...rest } = useTickets()

  const passData = useMemo(() => {
    if (!data?.docs) return data

    const filteredDocs = data.docs.filter(
      (ticket) =>
        ticket.slug === 'visitor-pass' || ticket.slug === 'delegate-pass'
    )

    // we send the ...docs to maintain api contract
    return {
      ...data,
      docs: filteredDocs,
      totalDocs: filteredDocs.length,
    }
  }, [data])

  return {
    data: passData,
    ...rest,
  }
}

// while on the above hook got an idea to do pattern matching for any slug
// oh how i miss ts, slugs can be an array of string -> ['visitor-pass', 'delegate-pass'] or a string
export const useTicketsBySlug = (slugs) => {
  const { data, ...rest } = useTickets()

  const filteredData = useMemo(() => {
    if (!data?.docs) return data

    const slugArray = Array.isArray(slugs) ? slugs : [slugs]

    const filteredDocs = data.docs.filter((ticket) => {
      if (!ticket.slug) return false

      return slugArray.some((slug) => {
        if (!slug || typeof slug !== 'string') {
          console.warn('Invalid slug pattern:', slug)
          return false
        }
        // user is smarty pants sharing regex anol
        if (slug.includes('*') || slug.startsWith('contains:')) {
          const pattern = slug.replace('contains:', '').replace('*', '')
          return ticket.slug.includes(pattern)
        }

        return ticket.slug === slug
      })
    })

    return {
      ...data,
      docs: filteredDocs,
      totalDocs: filteredDocs.length,
    }
  }, [data, slugs])

  return {
    data: filteredData,
    ...rest,
  }
}

export const useTicketsInfoWp = () => {
  return useQuery({
    queryKey: ['tickets-info-wp'],
    queryFn: async () => {
      const result = await payloadClient.get('/api/globals/tickets-info-wp', {
        depth: 2,
      })

      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error || 'Failed to fetch tickets info')
      }
    },
    staleTime: 10 * 60 * 1000,
    retry: 2,
  })
}

export const useTicketGuidelines = () => {
  const { data, ...rest } = useTicketsInfoWp()

  return {
    data: data?.guidelines?.guidelines || [],
    ...rest,
  }
}

// Events
export const useEventsData = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const baseUrl = '/api/events'
      const params = new URLSearchParams({
        'where[isPublic][equals]': 'true',
        limit: '0',
        depth: '2',
        sort: 'schedule.from_date',
      })

      const url = `${baseUrl}?${params.toString()}`
      const result = await payloadClient.get(url)

      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error || 'Failed to fetch events')
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })
}

export const useEventBySlugEff = (slug) => {
  const { data: eventsData, isLoading: eventsLoading } = useEventsData()

  return useQuery({
    queryKey: ['event', 'smart', slug],
    queryFn: async () => {
      if (eventsData?.docs) {
        const eventFromCache = eventsData.docs.find(
          (event) => event.slug === slug
        )
        if (eventFromCache) {
          return { data: eventFromCache, source: 'cache' }
        }
      }

      const baseUrl = '/api/events'
      const params = new URLSearchParams({
        'where[slug][equals]': slug,
        'where[isPublic][equals]': 'true',
        limit: '1',
        depth: '2',
      })

      const url = `${baseUrl}?${params.toString()}`
      const result = await payloadClient.get(url)

      if (result.success && result.data.docs && result.data.docs.length > 0) {
        return { data: result.data.docs[0], source: 'direct' }
      } else if (
        result.success &&
        result.data.docs &&
        result.data.docs.length === 0
      ) {
        throw new Error('Event not found')
      } else {
        throw new Error(result.error || 'Failed to fetch event')
      }
    },
    enabled: !!slug && !eventsLoading,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    select: (data) => data.data,
  })
}
