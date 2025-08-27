import SponsorLogo from './SponsorLogo'

const SponsorTier = ({
  sponsor,
  tierName,
  desktopWidth = '20vw',
  desktopHeight = 'auto',
  mobileWidth = '150px',
  mobileHeight = 'auto',
  additionalClasses = '',
}) => {
  if (!sponsor?.logos.length === 0) {
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
      case 'other':
        return 'gradient-text-zone'
      default:
        return 'gradient-text-zone'
    }
  }

  return (
    <div
      className={`flex flex-col justify-center items-center gap-4 md:items-start ${additionalClasses}`}
    >
      <h3 className={`${getGradientClass(tierName)} spons-text md:mb-2`}>
        {sponsor?.header}
      </h3>

      <div className='flex flex-row gap-4'>
        {sponsor?.logos.map((logo) => (
          <SponsorLogo
            key={logo.id}
            logo={logo}
            desktopWidth={desktopWidth}
            desktopHeight={desktopHeight}
            mobileWidth={mobileWidth}
            mobileHeight={mobileHeight}
          />
        ))}
      </div>
    </div>
  )
}

export default SponsorTier
