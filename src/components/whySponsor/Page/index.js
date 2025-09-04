import MinimalHero from '../../Elements/MinimalHero'

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

      <div className='h-screen bg-black' />
    </section>
  )
}

export default WhySponsorPage
