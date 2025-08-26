import { useSponsors } from '../../../hooks/useQueryApi'
import DiamondTier from './DiamondTier'
import SponsorTier from './SponsorTier'
import ZoneTier from './ZoneTier'

const SponsorBlocks = () => {
  const { data: sponsors, isLoading, error, isError } = useSponsors()

  const hasSponsorTier = (sponsors, tierName) => {
    return sponsors?.[tierName] && sponsors[tierName].logos.length > 0
  }

  return (
    <section className='relative overflow-hidden rounded-2xl'>
      <div
        className='p-1 rounded-2xl'
        style={{
          background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
        }}
      >
        <div
          className='bg-cover bg-center bg-black w-full h-full flex flex-col items-start justify-start px-4 py-4 md:px-16 2xl:px-28 md:py-28 rounded-2xl'
          style={{
            backgroundImage: `url('/assets/img/about-sec-pg.png')`,
          }}
        >
          <h2 className='uppercase text-3xl md:text-6xl mb-4 md:mb-7 2xl:mb-12 text-black font-semibold'>
            Sponsors
          </h2>

          {/*logos*/}
          <div className='flex flex-col items-center w-full gap-4 md:gap-28'>
            {/*diamond sponsor*/}
            {hasSponsorTier(sponsors, 'diamond') && (
              <DiamondTier sponsors={sponsors.diamond} />
            )}

            {(hasSponsorTier(sponsors, 'platinum') ||
              hasSponsorTier(sponsors, 'gold')) && (
              <div className='flex flex-col w-full md:flex-row md:justify-between md:items-stretch gap-4 md:gap-0'>
                <SponsorTier
                  sponsors={sponsors}
                  tierName='platinum'
                  desktopWidth='20vw'
                  mobileWidth='150px'
                />

                {/*line*/}
                {hasSponsorTier(sponsors, 'platinum') &&
                  hasSponsorTier(sponsors, 'gold') && (
                    <div className='hidden md:flex md:items-center md:justify-center'>
                      <div
                        className='w-0.5 bg-text-gray mt-16'
                        style={{ height: '55%' }}
                      />
                    </div>
                  )}

                <SponsorTier
                  sponsors={sponsors}
                  tierName='gold'
                  desktopWidth='18vw'
                  mobileWidth='137px'
                />
              </div>
            )}

            {(hasSponsorTier(sponsors, 'silver') ||
              hasSponsorTier(sponsors, 'bronze')) && (
              <div className='flex flex-col w-full md:flex-row md:justify-between md:items-stretch gap-4 md:gap-0'>
                {/*silver sponsors*/}
                <SponsorTier
                  sponsors={sponsors}
                  tierName='silver'
                  desktopWidth='14vw'
                  mobileWidth='100px'
                />

                {/*line*/}
                {hasSponsorTier(sponsors, 'silver') &&
                  hasSponsorTier(sponsors, 'bronze') && (
                    <div className='hidden md:flex md:items-center md:justify-center'>
                      <div
                        className='w-0.5 bg-text-gray mt-16'
                        style={{ height: '55%' }}
                      />
                    </div>
                  )}

                {/* bronze sponsor*/}
                <SponsorTier
                  sponsors={sponsors}
                  tierName='bronze'
                  desktopWidth='12vw'
                  mobileWidth='75px'
                />
              </div>
            )}

            {/* zone sponsors */}
            {hasSponsorTier(sponsors, 'zone') && (
              <ZoneTier sponsors={sponsors.zone} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SponsorBlocks
