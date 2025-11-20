import { lazy, Suspense } from 'react'
import TicketHero from '../TicketHero'
import { guidelines } from '../utils'

const ExhibitorBlock = lazy(() => import('../ExhibitorBlock'))

const TicketPage = () => {
  const guidelinesData = guidelines?.guidelines || []

  return (
    <main className='home-fade-in text-white font-urbanist'>
      <TicketHero />
      <Suspense
        fallback={
          <div className='flex items-center justify-center min-h-[400px]'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white'></div>
          </div>
        }
      >
        <ExhibitorBlock guidelinesData={guidelinesData} />
      </Suspense>
    </main>
  )
}

export default TicketPage
