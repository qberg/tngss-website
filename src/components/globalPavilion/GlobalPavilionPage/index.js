import MinimalHero from '../../Elements/MinimalHero'
import GlobalPavilionListing from '../Listing'

const GlobalPavilionPage = () => {
  return (
    <main className='home-fade-in text-white font-urbanist'>
      <MinimalHero
        title='Global Pavilion'
        tagLine='Connecting Startups Across Continents'
      />
      <GlobalPavilionListing />
    </main>
  )
}

export default GlobalPavilionPage
