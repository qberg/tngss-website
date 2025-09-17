import { Building } from 'lucide-react'
import { useInfiniteExhibitors } from '../../../hooks/useExhibitorsData'
import { getHallFromBooth, HallLabels } from '../../../utils/exhibitors'
import { SectionTitle, SectionWrapper } from '../../Layout/Section'
import {
  ExhibitorCard,
  ExhibitorCardRow,
  ExhibitorCardTitle,
  ExhibitorLogo,
  InfoBadge,
  StallInfoWrapper,
} from '../ExhibitorCard'
import { ExhibitorListingGrid } from './layout'
import { OrganizationTypeLabels, SectorLabels } from '../../../utils/labelMaps'
import Badge from '../../Elements/Badge'
import InfiniteScrollTrigger from '../../../hooks/useInfiniteScrollTrigger'
import { ExhibitorCardSkeleton } from './loaders'

const ExhibitorListing = () => {
  const {
    exhibitors,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    error,
    totalCount,
  } = useInfiniteExhibitors()

  if (isLoading) {
    return (
      <SectionWrapper>
        <SectionTitle>Exhibitors</SectionTitle>
        <ExhibitorListingGrid>
          {Array.from({ length: 8 }, (_, index) => (
            <ExhibitorCardSkeleton key={`skeleton-${index}`} />
          ))}
        </ExhibitorListingGrid>
      </SectionWrapper>
    )
  }

  if (error) {
    return (
      <SectionWrapper>
        <SectionTitle>Exhibitors</SectionTitle>
        <div className='text-center py-12'>
          <div className='inline-flex items-center gap-2 px-6 py-3 bg-red-50 border border-red-200 rounded-lg'>
            <div className='w-2 h-2 bg-red-500 rounded-full' />
            <p className='text-red-700'>Error loading exhibitors</p>
          </div>
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper>
      {/* title */}
      <SectionTitle>Exhibitors</SectionTitle>
      {/* listing */}
      <ExhibitorListingGrid>
        {exhibitors?.map((exhibitor, index) => {
          const logoUrl = exhibitor?.exhibitor_data?.organisationLogoUrl || null
          const organisationType = exhibitor?.organisationType || null
          const booths = exhibitor?.booths || []
          const sector = exhibitor?.sectorIntrested || 'sector_agnostic'

          return (
            <ExhibitorCard key={exhibitor.exhibitor_id || index}>
              <ExhibitorLogo
                src={logoUrl}
                alt={`${exhibitor.name || `Exhibitor ${index}`} Logo`}
                fallbackText={exhibitor.name || `Exhibitor ${index}`}
              />

              {organisationType && (
                <ExhibitorCardRow>
                  <InfoBadge
                    icon={Building}
                    label={OrganizationTypeLabels[organisationType]}
                  />
                </ExhibitorCardRow>
              )}

              <ExhibitorCardTitle>{exhibitor.name}</ExhibitorCardTitle>

              {booths.length > 0 && (
                <StallInfoWrapper>
                  {booths.map((booth, index) => {
                    const boothNumber = booth.booth_number
                    const hall = getHallFromBooth(boothNumber)
                    const label = `${boothNumber}, ${HallLabels[hall]}`

                    return <InfoBadge key={index} label={label} />
                  })}
                </StallInfoWrapper>
              )}

              <ExhibitorCardRow>
                <Badge variant='primary' size='md'>
                  {SectorLabels[sector]}
                </Badge>
              </ExhibitorCardRow>
            </ExhibitorCard>
          )
        })}

        {isLoadingMore && (
          <>
            {Array.from({ length: 4 }, (_, index) => (
              <ExhibitorCardSkeleton key={`loading-more-${index}`} />
            ))}
          </>
        )}
      </ExhibitorListingGrid>

      <InfiniteScrollTrigger
        onLoadMore={loadMore}
        hasMore={hasMore}
        isLoading={isLoadingMore}
      />

      {/* End of results message */}
      {!hasMore && exhibitors.length > 0 && (
        <div className='text-center'>
          <p className='text-gray-600'>You've reached the end!</p>
        </div>
      )}
    </SectionWrapper>
  )
}

export default ExhibitorListing
