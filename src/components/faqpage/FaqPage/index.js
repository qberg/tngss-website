import MinimalHero from '../../Elements/MinimalHero'
import FaqBlocks from '../FaqBlocks'

const FaqPage = () => {
  return (
    <section className='home-fade-in text-white font-urbanist'>
      <MinimalHero
        title='FAQ'
        subTitle=''
        tagLine="Frequently asked questions about TNGSS'25"
      />

      <FaqBlocks />
    </section>
  )
}

export default FaqPage
