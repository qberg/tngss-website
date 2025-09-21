import MinimalHero from '../../Elements/MinimalHero'
import VenueNavigation from '../VenueNavigation'

const VenuePage = () => {
  return (
    <section className='home-fade-in text-white font-urbanist'>
      <MinimalHero
        title='Venue'
        subTitle='9 & 10 October 2025'
        tagLine='Codissia Trade Fair Complex, Coimbatore'
      />

      <VenueNavigation />
    </section>
  )
}

export default VenuePage
