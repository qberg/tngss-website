import HighlightsTN from '../HighlightsTN'
import DiscoverTN from '../DiscoverTN'
import SectorHighlights from '../SectorHighlights'

const MinimalHero = ({ title, subTitle, tagLine, applyBorder = true }) => {
  return (
    <section className='relative overflow-hidden' style={{ height: '50vh' }}>
      <div
        className='w-full h-full p-1'
        style={{
          background: applyBorder
            ? 'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(170, 170, 170, 1) 50%, rgba(0, 0, 0, 1) 100%)'
            : '',
        }}
      >
        <div
          className='bg-cover bg-center bg-black w-full h-full flex items-end md:items-center justify-start px-4 md:px-16 2xl:px-28 md:pt-28'
          style={{ backgroundImage: `url('/assets/min-hero-lg.svg')` }}
        >
          <div className=''>
            <h1 className='text-xl md:text-4xl'>{title}</h1>

            <div>
              {subTitle && (
                <p className='text-xl md:text-4xl highlight-text font-normal mt-4'>
                  {subTitle}
                </p>
              )}
              <p className='text-white text-6xl md:text-7xl mt-4 md:mt-0 mb-0 py-8 md:py-0 font-medium font-urbanist gradient-text-black md:leading-relaxed'>
                {tagLine}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const WhyTNPage = () => {
  return (
    <section className='home-fade-in text-white font-urbanist'>
      <MinimalHero
        title='Why Tamil Nadu?'
        subTitle=''
        tagLine="Tamil Nadu - India's Economic Powerhouse"
      />
      <DiscoverTN />
      <SectorHighlights />
      <HighlightsTN />
    </section>
  )
}

export default WhyTNPage
