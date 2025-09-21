import CM from '../../../assets/tamilnadu-cm.png'

const ChiefGuestSection = ({ applyBorder = true }) => {
  return (
    <section className='relative overflow-hidden'>
      <div
        className='w-full h-full p-0.5'
        style={{
          background: applyBorder
            ? 'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(170, 170, 170, 1) 50%, rgba(0, 0, 0, 1) 100%)'
            : '',
        }}
      >
        <div className='h-auto bg-black px-4 md:px-24 2xl:px-44 py-8 md:py-14 2xl:py-24 flex flex-col items-center justify-center'>
          {/*cm card*/}
          <div
            className='p-0.5 rounded-lg md:rounded-2xl w-full'
            style={{
              background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
            }}
          >
            <div
              className='w-full h-full pt-4 md:pt-8 flex md:flex-row bg-cover bg-center bg-black rounded-lg md:rounded-2xl relative overflow-hidden'
              style={{ backgroundImage: `url('/assets/cm-bg.png')` }}
            >
              {/*text */}
              <div className='w-1/2 md:w-8/12 2xl:w-7/12 pl-4 py-4 md:p-16 font-urbanist font-semibold'>
                <h3
                  className='uppercase text-black text-base md:text-4xl'
                  style={{ paddingBottom: '8vw' }}
                >
                  Chief Guest
                </h3>

                <h4 className='text-xl md:text-7xl text-theme-new-blue'>
                  Thiru. M.K. Stalin
                </h4>
                <p className='text-black text-xs md:text-3xl leading-none'>
                  Hon'ble Chief Minister of <br className='md:hidden' /> Tamil
                  Nadu
                </p>
              </div>

              {/*cm image*/}
              <div className='w-1/2 md:w-4/12 2xl:w-5/12'>
                <img src={CM} alt='' loading='lazy' className='object-cover' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChiefGuestSection
