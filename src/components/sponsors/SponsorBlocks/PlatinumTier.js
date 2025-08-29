import SponsorLogo from './SponsorLogo'

const PlatinumTier = ({ sponsors }) => (
  <div className='w-full flex flex-col justify-center items-center'>
    <div>
      <h3 className='gradient-text-platinum spons-text mb-2 md:mb-4 2xl:mb-6 text-center'>
        {sponsors.header}
      </h3>
      <div className='flex flex-row gap-4'>
        {sponsors.logos.map((logo) =>
          logo?.url ? (
            <a
              href={logo.url}
              key={logo.id}
              target='_blank'
              rel='noopener noreferrer'
            >
              <SponsorLogo
                logo={logo}
                desktopWidth='24vw'
                desktopHeight='13vw'
                mobileWidth='210px'
                mobileHeight='125px'
              />
            </a>
          ) : (
            <SponsorLogo
              key={logo.id}
              logo={logo}
              desktopWidth='24vw'
              desktopHeight='13vw'
              mobileWidth='210px'
              mobileHeight='125px'
            />
          )
        )}
      </div>
    </div>
  </div>
)

export default PlatinumTier
