import HighlightsTN from '../HighlightsTN'
import DiscoverTN from '../DiscoverTN'
import SectorHighlights from '../SectorHighlights'
import MinimalHero from '../../Elements/MinimalHero'

const WhyTNPage = () => {
  return (
    <section className='home-fade-in text-white font-urbanist'>
      <MinimalHero
        title='Why Tamil Nadu?'
        subTitle=''
        tagLine="India's Economic Powerhouse"
      />
      <DiscoverTN />
      <SectorHighlights />
      <HighlightsTN />
    </section>
  )
}

export default WhyTNPage
