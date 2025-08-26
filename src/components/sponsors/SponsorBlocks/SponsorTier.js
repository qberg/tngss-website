import SponsorLogo from './SponsorLogo'

const SponsorTier = ({
  sponsors,
  tierName,
  desktopWidth = '20vw',
  mobileWidth = '150px',
  additionalClasses = '',
}) => {
  if (!sponsors?.[tierName] || sponsors[tierName].logos.length === 0) {
    return null
  }

  const getGradientClass = (tier) => {
    switch (tier) {
      case 'diamond':
        return 'gradient-text-diamond'
      case 'platinum':
        return 'gradient-text-platinum'
      case 'gold':
        return 'gradient-text-gold'
      case 'silver':
        return 'gradient-text-silver'
      case 'bronze':
        return 'gradient-text-bronze'
      default:
        return 'gradient-text-zone'
    }
  }

  return (
    <div
      className={`flex flex-col justify-center items-center gap-4 md:items-start ${additionalClasses}`}
    >
      <h3 className={`${getGradientClass(tierName)} spons-text md:mb-2`}>
        {sponsors[tierName].header}
      </h3>

      <div className='flex flex-row gap-4'>
        {sponsors[tierName].logos.map((logo) => (
          <SponsorLogo
            key={logo.id}
            logo={logo}
            desktopWidth={desktopWidth}
            mobileWidth={mobileWidth}
          />
        ))}
      </div>
    </div>
  )
}

export default SponsorTier
