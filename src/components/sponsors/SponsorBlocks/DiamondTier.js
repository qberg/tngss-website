import SponsorLogo from './SponsorLogo'

const DiamondTier = ({ sponsors }) => (
  <div className='w-full flex flex-col justify-center items-center'>
    <div>
      <h3 className='gradient-text-diamond spons-text mb-2 md:mb-6 text-center md:text-left'>
        {sponsors.header}
      </h3>
      <div className='flex flex-row gap-4'>
        {sponsors.logos.map((logo) => (
          <SponsorLogo
            key={logo.id}
            logo={logo}
            desktopWidth='450px'
            mobileWidth='225px'
          />
        ))}
      </div>
    </div>
  </div>
)

export default DiamondTier
