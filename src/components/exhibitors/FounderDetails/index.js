import { FaLinkedin } from 'react-icons/fa'
import {
  Avatar,
  AvatarBody,
  AvatarFallback,
  AvatarImage,
  AvatarInfo,
  AvatarTitle,
} from '../../Elements/Avatar'
import { FounderCard, FounderCardRow } from '../../Elements/FounderCard'
import GenericLink from '../../Elements/GenericLink'
import { PrimaryContentTitle } from '../../Layout/Blocks'
import { SectionWrapper } from '../../Layout/Section'
import { ExternalLink } from 'lucide-react'

const FounderDetails = ({ exhibitor }) => {
  const name = exhibitor?.exhibitor_data?.founderName
  const designation = exhibitor?.exhibitor_data?.founderDesignation
  const imageSrc = exhibitor?.exhibitor_data?.founderImageUrl
  const linkedin =
    exhibitor?.exhibitor_data?.founderLinkedin ||
    exhibitor?.exhibitor_data?.linkedin
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

            <div className='flex-1 min-w-0 w-full h-full flex flex-col gap-2 md:gap-0 md:py-2 justify-between'>
              <AvatarInfo className=''>
                <AvatarTitle className=''>{name}</AvatarTitle>
                <AvatarBody>{designation}</AvatarBody>
              </AvatarInfo>

              <GenericLink
                href={linkedin}
                label='LinkedIn'
                leftIcon={FaLinkedin}
                rightIcon={ExternalLink}
              />
            </div>
          </FounderCardRow>
        </FounderCard>
      </div>
    </SectionWrapper>
  )
}

export default FounderDetails
