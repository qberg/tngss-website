import logo from '../../assets/Nav_logo.png'

const EVENT_DETAILS = {
  location: 'Codissia Trade Fair Complex, Coimbatore',
  date: 'October 9th & 10th 2025',
  logo: logo,
}

const LogoHero = () => {
  return (
    <section className='pt-40 md:pt-48 2xl:pt-48 px-4 pb-0 md:pb-0 flex flex-col items-center justify-center gap-6 bg-black'>
      {/*logo*/}
      <div className='relative'>
        <img
          src={EVENT_DETAILS.logo}
          alt='StartupTN Logo'
          className='object-contain'
        />
      </div>

      {/*event details*/}
      <div
        className='text-center font-normal text-xl 2xl:text-2xl'
        style={{ lineHeight: '110%' }}
      >
        <p className='text-theme-blue'>{EVENT_DETAILS.date}</p>

        <p>{EVENT_DETAILS.location}</p>
      </div>
    </section>
  )
}

export default LogoHero
