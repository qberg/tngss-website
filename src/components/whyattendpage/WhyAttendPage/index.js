import MinimalHero from '../../Elements/MinimalHero'
import DiscoverTNSection from '../DiscoverTNSection'
import StakeHoldersSection from '../StakeHoldersBlocks'

const WhyAttendPage = () => {
  return (
    <section className='home-fade-in text-white font-urbanist'>
      <MinimalHero
        title='Why Attend'
        subTitle=''
        tagLine='The Ultimate Global Gathering for Founders'
        applyBorder={false}
      />
      <DiscoverTNSection />
      <StakeHoldersSection />
    </section>
  )
}

export default WhyAttendPage
