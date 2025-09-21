import MinimalHero from '../../Elements/MinimalHero'
import PartnerBlocks from '../PartnerBlocks'
import SponsorBlocks from '../SponsorBlocks'

const SponsorsPage = () => {
  return (
    <section className='home-fade-in text-white font-urbanist'>
      <MinimalHero
        title='Sponsors & Partners'
        subTitle=''
        tagLine='Join us as a sponsor at TNGSS and showcase your brand'
        applyBorder={false}
      />
      <SponsorBlocks />
      <PartnerBlocks />
    </section>
  )
}

export default SponsorsPage
