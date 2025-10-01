import { lazy, Suspense } from 'react'
import MinimalHero from '../../Elements/MinimalHero'
import ChiefGuestSection from '../ChiefGuestSection'

const SpeakerCardsSection = lazy(() => import('../SpeakerCardsSection'))
const HonourableDignitaries = lazy(() => import('../HonourableDignitaries'))

const SpeakerPage = () => {
  return (
    <div className='home-fade-in text-white font-urbanist'>
      <MinimalHero
        title='Speakers'
        subTitle=''
        tagLine="The Voice of Innovation at TNGSS'25"
        applyBorder={false}
      />

      <ChiefGuestSection />

      <Suspense
        fallback={
          <div className='p-4 text-center'>
            Loading Honourable Dignitaries...
          </div>
        }
      >
        <HonourableDignitaries />
        <HonourableDignitaries
          title='Government Officials'
          slug='government-officials'
        />

        <HonourableDignitaries title='Guest' slug='guest' />
      </Suspense>

      <Suspense
        fallback={<div className='p-4 text-center'>Loading speakers...</div>}
      >
        <SpeakerCardsSection />
      </Suspense>
    </div>
  )
}

export default SpeakerPage
