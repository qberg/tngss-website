import { lazy, Suspense, useRef, useState, useEffect } from 'react'
import { SpeakersProvider } from '../server/context/SpeakersContext'

const SpeakerListing = lazy(() => import('../server/SpeakerListing'))

const SpeakerCardsSection = () => {
  const ref = useRef(null)
  const [showListing, setShowListing] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowListing(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100px' }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <SpeakersProvider>
      <div ref={ref}>
        {showListing ? (
          <Suspense
            fallback={
              <div className='p-4 text-center'>Loading speaker list...</div>
            }
          >
            <SpeakerListing />
          </Suspense>
        ) : (
          <div className='p-4 text-center'>Scroll down to load speakers...</div>
        )}
      </div>
    </SpeakersProvider>
  )
}

export default SpeakerCardsSection
