import MinimalHero from '../../Elements/MinimalHero'
import ChiefGuestSection from '../ChiefGuestSection'
import HonourableDignitaries from '../HonourableDignitaries'
import SpeakersListing from '../SpeakersListing'

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

      <HonourableDignitaries />

      <SpeakersListing />
    </div>
  )
}

export default SpeakerPage
