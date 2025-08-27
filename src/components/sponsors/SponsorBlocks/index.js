import { useSponsors } from '../../../hooks/useQueryApi'
import DiamondTier from './DiamondTier'
import SponsorTier from './SponsorTier'

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
            backgroundImage: `url('/assets/spons-bg.png')`,
          }}
        >
          <h2 className='uppercase text-3xl md:text-6xl mb-4 md:mb-7 2xl:mb-12 text-white font-semibold'>
            Sponsors
          </h2>

          {/*logos*/}
          <div className='flex flex-col items-center w-full gap-4 md:gap-14 2xl:gap-28'>
            {/*diamond sponsor*/}
            {hasSponsorTier(sponsors, 'diamond') && (
              <DiamondTier sponsors={sponsors.diamond} />
            )}

            {(hasSponsorTier(sponsors, 'platinum') ||
              hasSponsorTier(sponsors, 'gold')) && (
              <div className='flex flex-col w-full md:flex-row md:justify-between md:items-stretch gap-4 md:gap-0'>
                <SponsorTier
                  sponsor={sponsors.platinum}
                  tierName='platinum'
                  desktopWidth='19vw'
                  desktopHeight='10vw'
                  mobileWidth='190px'
                  mobileHeight='105px'
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
                  sponsor={sponsors.gold}
                  tierName='gold'
                  desktopWidth='17vw'
                  desktopHeight='9vw'
                  mobileWidth='170px'
                  mobileHeight='90px'
                />
              </div>
            )}

            {(hasSponsorTier(sponsors, 'silver') ||
              hasSponsorTier(sponsors, 'bronze')) && (
              <div className='flex flex-col w-full md:flex-row md:justify-between md:items-stretch gap-4 md:gap-0'>
                {/*silver sponsors*/}
                <SponsorTier
                  sponsor={sponsors.silver}
                  tierName='silver'
                  desktopWidth='14vw'
                  desktopHeight='6vw'
                  mobileWidth='145px'
                  mobileHeight='62.5px'
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
                  sponsor={sponsors.bronze}
                  tierName='bronze'
                  desktopWidth='12vw'
                  desktopHeight='5vw'
                  mobileWidth='125px'
                  mobileHeight='52.5px'
                />
              </div>
            )}

            {/* zone sponsors */}
            {sponsors?.other && sponsors.other.length > 0 && (
              <div className='flex w-full items-center flex-row justify-center gap-4 md:gap-8 2xl:gap-16 flex-wrap'>
                {sponsors.other.map((sponsor) => (
                  <SponsorTier
                    key={sponsor.id}
                    sponsor={sponsor}
                    tierName='other'
                    desktopWidth='10vw'
                    desktopHeight='4vw'
                    mobileWidth='100px'
                    mobileHeight='50px'
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SponsorBlocks
