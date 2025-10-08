import { Building, X } from 'lucide-react'
import {
  generateExhibitorPath,
  getHallFromBooth,
  HallLabels,
} from '../../../utils/exhibitors'
import {
  SectionHeader,
  SectionTitle,
  SectionWrapper,
} from '../../Layout/Section'
import {
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
import { ExhibitorCardLink } from '../ExhibitorCardLink'
import { useExhibitors } from '../context/ExhibitorsContext'
import {
  FilterDropdownPortal,
  FilterDropdownPortalContent,
  FilterDropdownPortalTrigger,
  NewFilterDropdownRadioGroup,
  NewFilterDropdownRadioItem,
} from '../../Elements/NewFilters'
import { motion } from 'motion/react'
import SearchBar from '../../Elements/SearchBar'

const ExhibitorListing = () => {
  const {
    draftFilters,
    updateDraftFilters,
    applyFilters,
    clearAllFilters,
    hasActiveFilters,
    hasPendingChanges,
    filterOptions,
    exhibitors,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    totalCount,
    showExhibitorsSkeleton,
  } = useExhibitors()

  const handleSearchChange = (value) => {
    updateDraftFilters({ search: value })
  }

  const handleSectorChange = (value) => {
    updateDraftFilters({ sector_interested: value })
  }

  const handleOrgTypeChange = (value) => {
    updateDraftFilters({ organisation_type: value })
  }

  const companyTypeLabels = {
    product: 'Product',
    service: 'Service',
  }

  return (
    <SectionWrapper>
      {/* title */}
      <SectionHeader>
        <SectionTitle>Exhibitors</SectionTitle>
        <div className='hidden md:block w-2/5'>
          <SearchBar
            value={draftFilters.search}
            onChange={handleSearchChange}
            placeholder='Search Exhibitors by name...'
          />
        </div>
      </SectionHeader>
      <div className='w-full flex flex-col md:flex-row gap-6 md:justify-between items-center'>
        {/*filters*/}
        <div className='flex flex-col md:flex-row items-center gap-6 w-full md:w-auto'>
          <div className='block md:hidden w-full'>
            <SearchBar
              value={draftFilters.search}
              onChange={handleSearchChange}
              placeholder='Search Exhibitors by name...'
            />
          </div>
          {/* Org type*/}
          <FilterDropdownPortal>
            <FilterDropdownPortalTrigger>
              {draftFilters.organisation_type
                ? filterOptions?.organisationTypes?.find(
                    (o) => o.value === draftFilters.organisation_type
                  )?.label
                : 'Organization'}
            </FilterDropdownPortalTrigger>
            <FilterDropdownPortalContent>
              <NewFilterDropdownRadioGroup>
                <NewFilterDropdownRadioItem
                  value=''
                  selectedValue={draftFilters.organisation_type}
                  onChange={handleOrgTypeChange}
                >
                  All Types
                </NewFilterDropdownRadioItem>
                {filterOptions?.organisationTypes?.map((orgType) => (
                  <NewFilterDropdownRadioItem
                    key={orgType.value}
                    value={orgType.value}
                    selectedValue={draftFilters.organisation_type}
                    onChange={handleOrgTypeChange}
                  >
                    {orgType.label}
                  </NewFilterDropdownRadioItem>
                ))}
              </NewFilterDropdownRadioGroup>
            </FilterDropdownPortalContent>
          </FilterDropdownPortal>

          {/*sector*/}
          <FilterDropdownPortal>
            <FilterDropdownPortalTrigger>
              {draftFilters.sector_interested
                ? filterOptions?.sectors?.find(
                    (o) => o.value === draftFilters.sector_interested
                  )?.label
                : 'Sector'}
            </FilterDropdownPortalTrigger>
            <FilterDropdownPortalContent>
              <NewFilterDropdownRadioGroup>
                <NewFilterDropdownRadioItem
                  value=''
                  selectedValue={draftFilters.sector_interested}
                  onChange={handleSectorChange}
                >
                  All Sectors
                </NewFilterDropdownRadioItem>
                {filterOptions?.sectors?.map((sector) => (
                  <NewFilterDropdownRadioItem
                    key={sector.value}
                    value={sector.value}
                    selectedValue={draftFilters.sector_interested}
                    onChange={handleSectorChange}
                  >
                    {sector.label}
                  </NewFilterDropdownRadioItem>
                ))}
              </NewFilterDropdownRadioGroup>
            </FilterDropdownPortalContent>
          </FilterDropdownPortal>
        </div>

        <div className='flex flex-col md:flex-row gap-6'>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className='flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors whitespace-nowrap'
            >
              <X size={16} />
              Clear Filters
            </button>
          )}
          <motion.button
            onClick={applyFilters}
            whileTap={{
              scale: 0.97,
              transition: { type: 'spring', stiffness: 400, damping: 25 },
            }}
            className='w-full bg-theme-blue text-white font-semibold py-3 rounded-xl focus:outline-none px-6'
          >
            Apply Filters
          </motion.button>
        </div>
      </div>
      {/* listing */}

      {showExhibitorsSkeleton ? (
        <ExhibitorListingGrid>
          {Array.from({ length: 8 }, (_, index) => (
            <ExhibitorCardSkeleton key={`skeleton-${index}`} />
          ))}
        </ExhibitorListingGrid>
      ) : (
        <ExhibitorListingGrid>
          {exhibitors?.map((exhibitor, index) => {
            const logoUrl =
              exhibitor?.exhibitor_data?.organisationLogoUrl || null
            const organisationType = exhibitor?.organisationType || null
            const booths = exhibitor?.booths || []
            const sector = exhibitor?.sectorIntrested || 'sector_agnostic'
            const companyType =
              exhibitor?.exhibitor_data?.productService || 'product'

            const exhibitorPath = generateExhibitorPath(exhibitor, index)

            return (
              <ExhibitorCardLink
                key={exhibitor.exhibitor_id || index}
                to={exhibitorPath}
                id={exhibitor.exhibitor_id}
              >
                <ExhibitorLogo
                  src={logoUrl}
                  alt={`${
                    exhibitor?.exhibitor_data?.organisationDisplayName ||
                    exhibitor.name ||
                    `Exhibitor ${index}`
                  } Logo`}
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

                <ExhibitorCardTitle>
                  {exhibitor?.exhibitor_data?.organisationDisplayName ||
                    exhibitor.name}
                </ExhibitorCardTitle>

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

                <ExhibitorCardRow className='mt-2'>
                  {companyType && (
                    <Badge variant='primary' size='md'>
                      {companyTypeLabels[companyType]}
                    </Badge>
                  )}

                  <Badge variant='primary' size='md'>
                    {SectorLabels[sector]}
                  </Badge>
                </ExhibitorCardRow>
              </ExhibitorCardLink>
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
      )}

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
