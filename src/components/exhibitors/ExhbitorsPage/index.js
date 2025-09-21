import MinimalHero from '../../Elements/MinimalHero'
import ExhibitorListing from '../ExhibitorListing'

const ExhibitorPage = () => {
  return (
    <main className='home-fade-in text-white font-urbanist'>
      <MinimalHero title='Exhibitor' tagLine='Elevate Your Brand at TNGSS' />

      <ExhibitorListing />
    </main>
  )
}

export default ExhibitorPage
