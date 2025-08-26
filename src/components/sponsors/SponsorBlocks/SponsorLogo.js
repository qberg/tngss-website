const SponsorLogo = ({ logo, desktopWidth, mobileWidth }) => (
  <div className='relative'>
    {/* Desktop */}
    <img
      src={logo?.logo?.url}
      alt={logo?.logo?.alt || 'Sponsor logo'}
      className='object-contain hidden md:block'
      style={{ width: desktopWidth, height: 'auto' }}
      loading='lazy'
    />
    {/* Mobile */}
    <img
      src={logo?.logo?.url}
      alt={logo?.logo?.alt || 'Sponsor logo'}
      className='object-contain block md:hidden'
      style={{ width: mobileWidth, height: 'auto' }}
      loading='lazy'
    />
  </div>
)

export default SponsorLogo
