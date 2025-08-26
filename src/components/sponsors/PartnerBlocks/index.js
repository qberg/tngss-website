import SponsorLogo from '../SponsorBlocks/SponsorLogo'

const { usePartners } = require('../../../hooks/useQueryApi')

const PartnerBlocks = () => {
  const { data: partnersData, isLoading, error, isError } = usePartners()
  const partners = partnersData?.partners || []

  return (
    <section className='flex flex-col items-start justify-start px-4 py-4 md:px-16 2xl:px-28 md:py-28 rounded-2xl'>
      <h2 className='uppercase text-3xl md:text-6xl mb-4 md:mb-7 2xl:mb-12 text-white font-semibold'>
        Partners
      </h2>

      {partners.length > 0 && (
        <div className='w-full flex flex-col items-center md:items-start gap-4 md:gap-28'>
          {partners.map((partner) => (
            <div key={partner.id}>
              <h3 className='text-theme-blue spons-text mb-2 md:mb-8'>
                {partners[0].header}
              </h3>
              {/*logos*/}
              <div className='flex flex-row flex-wrap items-center justify-center md:justify-start w-full gap-4 md:gap-8'>
                {partner.logos.map((logo) => (
                  <SponsorLogo
                    key={logo.id}
                    logo={logo}
                    desktopWidth='10vw'
                    mobileWidth='65px'
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default PartnerBlocks
