import bgImage from '../../assets/looper.svg?url'

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
          className='bg-cover bg-center bg-black w-full h-full flex items-center justify-start px-4 md:px-16 2xl:px-28 md:pt-28'
          style={{ backgroundImage: `url('/assets/min-hero-lg.svg')` }}
        >
          <div className=''>
            <h1 className='text-white text-6xl md:text-8xl mb-4 font-medium font-urbanist gradient-text-black'>
              {title}
            </h1>

            <p className='text-xl md:text-4xl'>{tagLine}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MinimalHero
