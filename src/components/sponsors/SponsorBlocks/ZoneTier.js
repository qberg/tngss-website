import SponsorLogo from './SponsorLogo'

const ZoneTier = ({ sponsors }) => (
  <div className='flex flex-row flex-wrap items-center justify-center md:justify-start w-full gap-4 md:gap-0'>
    {sponsors.logos.map((logo, index) => (
      <div className='flex flex-col' key={logo.id}>
        <h3 className='gradient-text-zone spons-text mb-2 md:mb-6'>
          {sponsors.header}
        </h3>
        <div
          className={`relative md:pr-24 ${
            index < sponsors.logos.length - 1
              ? 'md:border-r-2 md:border-text-gray'
              : ''
          }`}
        >
          <SponsorLogo logo={logo} desktopWidth='10vw' mobileWidth='65px' />
        </div>
      </div>
    ))}
  </div>
)

export default ZoneTier
