import { useMemo } from 'react'
import bg from '../../../assets/speakersbg.svg?url'
import CTAButton from '../../Elements/CTAButton'
import { useFeaturedSpeakers } from '../../../hooks/useQueryApi'
import SpeakerCard from './SpeakerCard'
import useEmblaCarousel from 'embla-carousel-react'

const MobileSpeakersSection = () => {
  const { data, isLoading: loading, error } = useFeaturedSpeakers()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
    align: 'start',
    slidesToScroll: 1,
  })

  const speakersData = useMemo(() => data?.docs || [], [data?.docs])

  const config = useMemo(() => {
    const viewportWidth =
      typeof window !== 'undefined' ? window.innerWidth : 375
    const cardWidth = viewportWidth * 0.8

    return {
      cardWidth,
    }
  }, [])

  if (loading) {
    return (
      <section className='relative h-screen flex items-center justify-center'>
        <img
          src={bg}
          alt='Background for speakers'
          className='absolute inset-0 object-cover object-center w-full h-full -z-10'
          loading='lazy'
        />
        <div className='text-white text-center py-8 text-xl'>
          Loading speakers...
        </div>
      </section>
    )
  }

  if (error || !speakersData || speakersData.length === 0) {
    return (
      <section className='relative h-screen flex items-center justify-center'>
        <img
          src={bg}
          alt='Background for speakers'
          className='absolute inset-0 object-cover object-center w-full h-full -z-10'
          loading='lazy'
        />
        <div className='text-white text-center py-8 text-lg'>
          {error ? `Error: ${error.message}` : 'No speakers available'}
        </div>
      </section>
    )
  }

  return (
    <section className='relative h-screen flex flex-col justify-center overflow-hidden'>
      <img
        src={bg}
        alt='Background for speakers'
        className='absolute inset-0 object-cover object-center w-full h-full -z-10'
        loading='lazy'
      />

      {/* Header */}
      <div className='px-4 mb-12'>
        <h1 className='text-white text-5xl sm:text-6xl leading-tight gradient-text-black'>
          Speakers at
          <br />
          TNGSS 2025
        </h1>
      </div>

      {/* Embla Carousel */}
      <div className='embla overflow-hidden' ref={emblaRef}>
        <div className='embla__container flex'>
          {speakersData.map((speaker, index) => (
            <div
              key={speaker.id}
              className='embla__slide flex-shrink-0 pl-4 first:pl-4 last:pr-4'
              style={{
                width: config.cardWidth,
              }}
            >
              <div>
                <SpeakerCard speaker={speaker} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className='flex justify-center px-4 mt-8'>
        <CTAButton src='/speakers' className='rounded-2xl'>
          <div className='w-60 h-12 flex items-center justify-center text-lg font-semibold'>
            View All Speakers
          </div>
        </CTAButton>
      </div>
    </section>
  )
}

export default MobileSpeakersSection
