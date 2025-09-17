import ShineButton from './ShineButton'

const MinimalHero = ({
  title,
  subTitle,
  tagLine,
  applyBorder = true,
  ctaUrl,
}) => {
  return (
    <section className='relative overflow-hidden h-50vh md:h-62.5vh 2xl:h-50vh'>
      <div
        className='w-full h-full'
        style={{
          background: applyBorder
            ? 'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(170, 170, 170, 1) 50%, rgba(0, 0, 0, 1) 100%)'
            : '',
          padding: '1px',
        }}
      >
        <div
          className='bg-cover bg-center bg-black w-full h-full flex items-center justify-start px-4 md:px-16 2xl:px-28 pt-24'
          style={{ backgroundImage: `url('/assets/min-hero-lg.svg')` }}
        >
          <div className=''>
            <h1 className='text-white text-6xl md:text-8xl mb-4 md:mb-2 font-medium font-urbanist gradient-text-black'>
              {title}
            </h1>

            <div>
              {subTitle && (
                <p className='text-xl md:text-4xl highlight-text mt-4'>
                  {subTitle}
                </p>
              )}
              <p className='text-xl md:text-4xl'>{tagLine}</p>
            </div>
            {ctaUrl && (
              <ShineButton
                src={ctaUrl}
                className='!hover:bg-black w-full justify-center text-white mt-4 md:mt-8 2xl:mt-12'
                contCN='!bg-none py-3 px-4 w-full'
              >
                Get the Sponsorship Brochure
              </ShineButton>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MinimalHero
