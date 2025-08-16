import SpeakersListing from '../SpeakersListing'

const { default: MinimalHero } = require('../../Elements/MinimalHero')

const SpeakerPage = () => {
  return (
    <div className='home-fade-in text-white font-urbanist'>
      <MinimalHero
        title='Speakers'
        subTitle=''
        tagLine="The Voice of Innovation at TNGSS'25"
      />

      <SpeakersListing />
    </div>
  )
}

export default SpeakerPage
