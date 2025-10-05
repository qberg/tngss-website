import BackButton from '../../Elements/BackButton'
import {
  PrimaryContentBlockWrapper,
  PrimaryContentGrid,
  PrimaryContentRow,
  PrimaryContentTitle,
  PrimaryContentWrapper,
  PrimaryImageWrapper,
} from '../../Layout/Blocks'
import { GradientSectionWrapper } from '../../Layout/Section'
import LogoCoverImage from '../LogoCoverImage'
import { SectorLabels } from '../../../utils/labelMaps'
import Badge from '../../Elements/Badge'
import { InfoBadge } from '../ExhibitorCard'
import { getHallFromBooth, HallLabels } from '../../../utils/exhibitors'
import ParaSplitBlocks from '../../Elements/ParaBlocks'
import GenericLink from '../../Elements/GenericLink'
import { ExternalLink, Globe } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'

const cleanUrl = (url) => {
  if (!url) return ''

  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')
}

const ExhibitorDetails = ({ exhibitor }) => {
  const name =
    exhibitor?.exhibitor_data?.organisationDisplayName || exhibitor?.name || ''
  const imageSrc = exhibitor?.exhibitor_data?.organisationLogoUrl || null
  const sector = exhibitor?.sectorIntrested || 'sector_agnostic'
  const booths = exhibitor?.booths || []
  const about = exhibitor?.exhibitor_data?.about || ''
  const website = exhibitor?.exhibitor_data?.website || ''
  const linkedin = exhibitor?.exhibitor_data?.linkedin || ''

  return (
    <GradientSectionWrapper>
      {/*back button*/}
      <BackButton href='/exhibitors' label='Exhibitors' />

      <PrimaryContentBlockWrapper>
        <PrimaryImageWrapper>
          <LogoCoverImage src={imageSrc} />
        </PrimaryImageWrapper>
        <PrimaryContentWrapper className=''>
          <PrimaryContentRow>
            <Badge variant='primary' size='md'>
              {SectorLabels[sector]}
            </Badge>
          </PrimaryContentRow>
          <PrimaryContentTitle>{name}</PrimaryContentTitle>
          <PrimaryContentGrid>
            {booths.map((booth, index) => {
              const boothNumber = booth.booth_number
              const hall = getHallFromBooth(boothNumber)
              const label = `${boothNumber}, ${HallLabels[hall]}`

              return <InfoBadge key={index} label={label} />
            })}
          </PrimaryContentGrid>
          <PrimaryContentTitle variant='secondary'>About</PrimaryContentTitle>
          <ParaSplitBlocks paras={about} />
          <PrimaryContentRow className='mt-2 md:mt-6'>
            <GenericLink
              href={website}
              label={cleanUrl(website)}
              leftIcon={Globe}
              rightIcon={ExternalLink}
            />

            <GenericLink
              href={linkedin}
              label='LinkedIn'
              leftIcon={FaLinkedin}
              rightIcon={ExternalLink}
            />
          </PrimaryContentRow>
        </PrimaryContentWrapper>
      </PrimaryContentBlockWrapper>
    </GradientSectionWrapper>
  )
}

export default ExhibitorDetails
