import MinimalHero from '../../Elements/MinimalHero'
import AboutTngss from './AboutTngss'
import EventHighlights from './EventHighlights'
import SponsBenefits from './SponsBenefits'

const WhySponsorPage = () => {
  return (
    <section className='home-fade-in text-white font-urbanist'>
      <MinimalHero
        title='Be a Sponsor at TNGSS'
        subTitle=''
        tagLine='Join us as a sponsor at TNGSS and showcase your brand'
        applyBorder={true}
        ctaUrl='/sponsor-form'
      />

      <AboutTngss className='h-screen bg-black' />
      <div className='px-4 md:px-0'>
        <EventHighlights />
      </div>
      <SponsBenefits />
    </section>
  )
}

export default WhySponsorPage
