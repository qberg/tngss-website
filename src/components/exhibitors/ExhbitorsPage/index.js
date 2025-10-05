import MinimalHero from '../../Elements/MinimalHero'
import { ExhibitorsProvider } from '../context/ExhibitorsContext'
import ExhibitorListing from '../ExhibitorListing'

const ExhibitorPage = () => {
  return (
    <main className='home-fade-in text-white font-urbanist'>
      <MinimalHero title='Exhibitor' tagLine='Elevate Your Brand at TNGSS' />

      <ExhibitorsProvider>
        <ExhibitorListing />
      </ExhibitorsProvider>
    </main>
  )
}

export default ExhibitorPage
