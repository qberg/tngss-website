const SponsorLogo = ({
  logo,
  desktopWidth,
  desktopHeight = 'auto',
  mobileWidth,
  mobileHeight = 'auto',
}) => (
  <div className='relative bg-white rounded-md md:rounded-xl 2xl:rounded-2xl overflow-hidden md:p-1'>
    {/* Desktop */}
    <img
      src={logo?.logo?.url}
      alt={logo?.logo?.alt || 'Sponsor logo'}
      className='object-contain hidden md:block'
      style={{ width: desktopWidth, height: desktopHeight }}
      loading='lazy'
    />
    {/* Mobile */}
    <img
      src={logo?.logo?.url}
      alt={logo?.logo?.alt || 'Sponsor logo'}
      className='object-contain block md:hidden'
      style={{ width: mobileWidth, height: mobileHeight }}
      loading='lazy'
    />
  </div>
)

export default SponsorLogo
