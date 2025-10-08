import MinimalHero from '../../Elements/MinimalHero'
import SpaceTechPavilionListing from '../Listing'

const SpaceTechPavilionPage = () => {
  return (
    <main className='home-fade-in text-white font-urbanist'>
      <MinimalHero
        title='Space Tech Pavilion'
        tagLine='Innovations shaping the future of space'
      />
      <SpaceTechPavilionListing />
    </main>
  )
}

export default SpaceTechPavilionPage
