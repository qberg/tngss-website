import { Avatar, AvatarFallback, AvatarImage } from '../../Elements/Avatar'
import { FounderCard, FounderCardRow } from '../../Elements/FounderCard'
import { PrimaryContentTitle } from '../../Layout/Blocks'
import { SectionWrapper } from '../../Layout/Section'

const FounderDetails = ({ exhibitor }) => {
  const name = exhibitor?.exhibitor_data?.founderName
  const imageSrc = exhibitor?.exhibitor_data?.founderImageUrl
  return (
    <SectionWrapper>
      <PrimaryContentTitle variant='secondary'>Founder/s</PrimaryContentTitle>
      {/* to be implemented*/}
      <div className='flex flex-col md:flex-row flex-wrap gap-4 md:gap-7 2xl:gap-7'>
        <FounderCard>
          <FounderCardRow>
            <Avatar className='bg-bg-gray'>
              {imageSrc ? (
                <AvatarImage src={imageSrc} />
              ) : (
                <AvatarFallback name={name} />
              )}
            </Avatar>
          </FounderCardRow>
        </FounderCard>
      </div>
    </SectionWrapper>
  )
}

export default FounderDetails
