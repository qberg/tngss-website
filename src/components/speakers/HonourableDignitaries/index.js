import { useSpeakersByType } from '../../../hooks/useSpeakersData'
import SpeakerCard from '../../Elements/SpeakerCard'
import SpeakerCardSkeleton from '../../Elements/SpeakerCardSkeleton'
import SpeakerCardWrapper from '../server/Layout'

const GRID_CONFIGS = {
  'government-dignitaries': {
    regular:
      'grid grid-cols-2 md:grid-cols-3 gap-2 gap-y-4 md:gap-16 2xl:gap-24',
    aspectRatio: 'compact',
  },
  'government-officials': {
    regular:
      'grid grid-cols-2 md:grid-cols-3 gap-2 gap-y-4 md:gap-y-14 2xl:gap-y-16 md:gap-x-28 2xl:gap-x-36',
    aspectRatio: 'compact',
  },
  guest: {
    regular:
      'grid grid-cols-2 md:grid-cols-4 gap-2 gap-y-4 md:gap-12 2xl:gap-12',
    aspectRatio: 'compact',
  },
}
const HonourableDignitaries = ({
  title = 'Honourable Dignitaries',
  slug = 'government-dignitaries',
}) => {
  const { data: dignitariesData, isLoading, error } = useSpeakersByType(slug)

  const gridConfig = GRID_CONFIGS[slug] || GRID_CONFIGS.default
  if (error) {
    console.error('Error loading dignitaries:', error)
    return null
  }

  if (isLoading) {
    return (
      <section className='relative overflow-hidden'>
        <div
          className='w-full h-full pb-0.5'
          style={{
            background:
              'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(170, 170, 170, 1) 50%, rgba(0, 0, 0, 1) 100%)',
          }}
        >
          <div className='h-auto bg-black px-4 md:px-24 2xl:px-44 py-8 md:py-14 2xl:py-24'>
            <h2 className='uppercase text-3xl md:text-6xl text-white font-medium gradient-text-black mb-4 md:mb-7 2xl:mb-12'>
              {title}
            </h2>
            <div className={gridConfig.regular}>
              {Array.from({ length: 3 }).map((_, index) => (
                <SpeakerCardSkeleton key={index} showName={true} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!dignitariesData || dignitariesData.length === 0) {
    return null
  }

  const FEATURED_SLUG = 'thiru-t-m-anbarasan'
  const featuredSpeakers = dignitariesData.filter(
    (speaker) => speaker.slug === FEATURED_SLUG
  )
  const otherSpeakers = dignitariesData.filter(
    (speaker) => speaker.slug !== FEATURED_SLUG
  )

  return (
    <section className='relative overflow-hidden'>
      <div
        className='w-full h-full pb-0.5'
        style={{
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(170, 170, 170, 1) 50%, rgba(0, 0, 0, 1) 100%)',
        }}
      >
        <div className='h-auto bg-black px-4 md:px-24 2xl:px-44 py-8 md:py-14 2xl:py-24'>
          <h2 className='uppercase text-3xl md:text-6xl text-white font-medium gradient-text-black mb-4 md:mb-7 2xl:mb-12'>
            {dignitariesData[0]?.speaker_type?.name || title}
          </h2>

          {/* Featured speakers in their own row */}
          {featuredSpeakers.length > 0 && (
            <div className='grid grid-cols-1 w-8/12 md:w-auto max-w-sm 2xl:max-w-md mx-auto mb-8 md:mb-16 2xl:mb-24'>
              {featuredSpeakers.map((speaker) => (
                <SpeakerCardWrapper
                  key={speaker.id}
                  slug=''
                  className='w-full'
                  aspectRatio='medium'
                >
                  <SpeakerCard speaker={speaker} />
                </SpeakerCardWrapper>
              ))}
            </div>
          )}

          {otherSpeakers.length > 0 && (
            <div className={gridConfig.regular}>
              {otherSpeakers.map((speaker) => (
                <SpeakerCardWrapper
                  key={speaker.id}
                  slug=''
                  className='w-full'
                  aspectRatio={gridConfig.aspectRatio}
                >
                  <SpeakerCard speaker={speaker} />
                </SpeakerCardWrapper>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HonourableDignitaries
