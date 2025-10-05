import InfiniteScrollTrigger from '../../../../hooks/useInfiniteScrollTrigger'
import { SpeakersGrid } from '../../../Layout/Grid'
import {
  SectionHeader,
  SectionTitle,
  SectionWrapper,
} from '../../../Layout/Section'
import {
  StickyBar,
  StickyBarSectionContentWrapper,
  StickyBarSectionWrapper,
  StickyBarWrapper,
} from '../../../Layout/StickyBarSection'
import { AnimatePresence, motion } from 'motion/react'
import { useSpeakers } from '../context/SpeakersContext'
import SpeakerCard from '../../../Elements/SpeakerCard'
import SpeakerCardWrapper from '../Layout'
import {
  NewFilterBody,
  NewFilterCta,
  NewFilterDropdown,
  NewFilterDropdownCheckboxGroup,
  NewFilterDropdownCheckboxItem,
  NewFilterDropdownContent,
  NewFilterDropdownRadioGroup,
  NewFilterDropdownRadioItem,
  NewFilterDropdownTrigger,
  NewFilterHeader,
  NewFilterTitle,
  NewFilterWrapper,
} from '../../../Elements/NewFilters'
import { Filter } from 'lucide-react'
import { useState } from 'react'
import SpeakerCardSkeleton from '../../../Elements/SpeakerCardSkeleton'
import {
  FilterCategory,
  FloatingButton,
  MobileFilterCtas,
  MobileFilterOverlay,
  MobileFilterRightSection,
  MobileFilterSidebar,
} from '../../../Elements/MobileFilters'
import SearchBar from '../../../Elements/SearchBar'

const SpeakerListing = () => {
  const [openDropdown, setOpenDropDown] = useState(null)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('speakerType')

  const {
    draftFilters,
    appliedFilters,
    updateDraftFilters,
    applyFilters,
    hasPendingChanges,

    filterOptions,
    speakers,
    totalCount,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,

    toggleTag,
    toggleCountry,
    clearAllFilters,
    hasActiveFilters,

    showSpeakersSkeleton,
  } = useSpeakers()

  const filterCategories = [
    {
      id: 'speakerType',
      title: 'Speaker Type',
      hasSelections: draftFilters.speaker_type !== 'all',
    },
    {
      id: 'countries',
      title: 'Countries',
      hasSelections: draftFilters.countries.length > 0,
    },
    {
      id: 'tags',
      title: 'Tags',
      hasSelections: draftFilters.tags.length > 0,
    },
  ]

  const toggleDropdown = (dropdownName) => {
    setOpenDropDown(openDropdown === dropdownName ? null : dropdownName)
  }

  return (
    <SectionWrapper>
      <SectionHeader>
        <SectionTitle>SPEAKERS</SectionTitle>
        <div className='hidden md:block w-2/5'>
          <SearchBar
            value={draftFilters.search}
            onChange={(value) => updateDraftFilters({ search: value })}
          />
        </div>
      </SectionHeader>

      <div className='w-full block md:hidden'>
        <SearchBar
          value={draftFilters.search}
          onChange={(value) => updateDraftFilters({ search: value })}
        />
      </div>
      <FloatingButton
        onOpen={() => setIsMobileFilterOpen(true)}
        hasActiveFilters={hasActiveFilters}
        scrollThreshold={950}
      />

      <MobileFilterOverlay
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
      >
        <MobileFilterSidebar>
          {filterCategories.map((category) => (
            <FilterCategory
              key={category.id}
              category={category}
              isActive={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            />
          ))}
        </MobileFilterSidebar>

        <MobileFilterRightSection>
          {selectedCategory === 'speakerType' && (
            <div className='space-y-1'>
              {filterOptions?.available?.speaker_types?.map((type) => (
                <NewFilterDropdownRadioItem
                  key={type.value}
                  value={type.value}
                  selectedValue={draftFilters.speaker_type}
                  onChange={(value) =>
                    updateDraftFilters({ speaker_type: value })
                  }
                  count={type.count}
                >
                  {type.label}
                </NewFilterDropdownRadioItem>
              ))}
            </div>
          )}

          {selectedCategory === 'countries' && (
            <div className='space-y-1'>
              {filterOptions?.available?.countries?.map((country) => (
                <NewFilterDropdownCheckboxItem
                  key={country.value}
                  value={country.value}
                  selectedValues={draftFilters.countries}
                  onToggle={toggleCountry}
                  count={country.count}
                >
                  {country.label}
                </NewFilterDropdownCheckboxItem>
              ))}
            </div>
          )}

          {selectedCategory === 'tags' && (
            <div className='space-y-1'>
              {filterOptions?.available?.tags?.map((tag) => (
                <NewFilterDropdownCheckboxItem
                  key={tag.value}
                  value={tag.value}
                  selectedValues={draftFilters.tags}
                  onToggle={toggleTag}
                  count={tag.count}
                >
                  {tag.label}
                </NewFilterDropdownCheckboxItem>
              ))}
            </div>
          )}
        </MobileFilterRightSection>

        <MobileFilterCtas>
          <motion.button
            onClick={() => {
              applyFilters()
              setIsMobileFilterOpen(false)
            }}
            whileTap={{
              scale: 0.97,
              transition: { type: 'spring', stiffness: 400, damping: 25 },
            }}
            className='w-full bg-theme-blue text-white font-semibold py-3 rounded-xl hover:bg-[#16a8c4] transition-colors focus:outline-none'
          >
            Apply Filters
          </motion.button>
        </MobileFilterCtas>
      </MobileFilterOverlay>

      <StickyBarSectionWrapper>
        <StickyBarWrapper>
          <StickyBar>
            {/*<SpeakerFilters />*/}
            <NewFilterWrapper>
              <NewFilterBody>
                <NewFilterHeader>
                  <NewFilterTitle>Filters</NewFilterTitle>
                  <Filter size={16} className='text-white' />
                </NewFilterHeader>

                <AnimatePresence>
                  {hasActiveFilters && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={clearAllFilters}
                      className='text-red-400 hover:text-red-300 text-sm font-medium underline'
                    >
                      Clear all filters
                    </motion.button>
                  )}
                </AnimatePresence>

                <NewFilterDropdown>
                  <NewFilterDropdownTrigger
                    isOpen={openDropdown === 'speakerType'}
                    onToggle={() => toggleDropdown('speakerType')}
                  >
                    Speaker Type{' '}
                    {draftFilters.speaker_type !== 'all' &&
                      `(${
                        filterOptions?.available?.speaker_types?.find(
                          (t) => t.value === draftFilters.speaker_type
                        )?.label || 'Selected'
                      })`}
                  </NewFilterDropdownTrigger>
                  <NewFilterDropdownContent
                    isOpen={openDropdown === 'speakerType'}
                  >
                    <NewFilterDropdownRadioGroup>
                      {filterOptions?.available?.speaker_types?.map((type) => (
                        <NewFilterDropdownRadioItem
                          key={type.value}
                          value={type.value}
                          selectedValue={draftFilters.speaker_type}
                          onChange={(value) =>
                            updateDraftFilters({ speaker_type: value })
                          }
                          count={type.count}
                        >
                          {type.label}
                        </NewFilterDropdownRadioItem>
                      ))}
                    </NewFilterDropdownRadioGroup>
                  </NewFilterDropdownContent>
                </NewFilterDropdown>

                <NewFilterDropdown>
                  <NewFilterDropdownTrigger
                    isOpen={openDropdown === 'countries'}
                    onToggle={() => toggleDropdown('countries')}
                  >
                    Countries{' '}
                    {draftFilters.countries.length > 0 &&
                      `(${draftFilters.countries.length} selected)`}
                  </NewFilterDropdownTrigger>

                  <NewFilterDropdownContent
                    isOpen={openDropdown === 'countries'}
                  >
                    <NewFilterDropdownCheckboxGroup>
                      {filterOptions?.available?.countries?.map((country) => (
                        <NewFilterDropdownCheckboxItem
                          key={country.value}
                          value={country.value}
                          selectedValues={draftFilters.countries}
                          onToggle={toggleCountry}
                          count={country.count}
                        >
                          {country.label}
                        </NewFilterDropdownCheckboxItem>
                      ))}
                    </NewFilterDropdownCheckboxGroup>
                  </NewFilterDropdownContent>
                </NewFilterDropdown>

                <NewFilterDropdown>
                  <NewFilterDropdownTrigger
                    isOpen={openDropdown === 'tags'}
                    onToggle={() => toggleDropdown('tags')}
                  >
                    Tags{' '}
                    {draftFilters.tags.length > 0 &&
                      `(${draftFilters.tags.length} selected)`}
                  </NewFilterDropdownTrigger>

                  <NewFilterDropdownContent isOpen={openDropdown === 'tags'}>
                    <NewFilterDropdownCheckboxGroup>
                      {filterOptions?.available?.tags?.map((tag) => (
                        <NewFilterDropdownCheckboxItem
                          key={tag.value}
                          value={tag.value}
                          selectedValues={draftFilters.tags}
                          onToggle={toggleTag}
                          count={tag.count}
                        >
                          {tag.label}
                        </NewFilterDropdownCheckboxItem>
                      ))}
                    </NewFilterDropdownCheckboxGroup>
                  </NewFilterDropdownContent>
                </NewFilterDropdown>
              </NewFilterBody>

              <NewFilterCta>
                <motion.button
                  onClick={applyFilters}
                  whileTap={{
                    scale: 0.97,
                    transition: { type: 'spring', stiffness: 400, damping: 25 },
                  }}
                  className='w-full bg-theme-blue text-white font-semibold py-3 rounded-xl hover:bg-[#16a8c4] transition-colors focus:outline-none'
                >
                  Apply Filters
                </motion.button>
              </NewFilterCta>
            </NewFilterWrapper>
          </StickyBar>
        </StickyBarWrapper>

        <StickyBarSectionContentWrapper>
          <SpeakersGrid>
            {showSpeakersSkeleton ? (
              Array.from({ length: 9 }, (_, index) => (
                <SpeakerCardSkeleton key={`skeleton-${index}`} />
              ))
            ) : (
              <>
                {speakers.map((speaker, index) => (
                  <SpeakerCardWrapper
                    key={speaker.id || index}
                    slug={speaker.slug}
                  >
                    <SpeakerCard speaker={speaker} />
                  </SpeakerCardWrapper>
                ))}

                {isLoadingMore &&
                  Array.from({ length: 6 }, (_, index) => (
                    <SpeakerCardSkeleton key={`loading-skeleton-${index}`} />
                  ))}
              </>
            )}
          </SpeakersGrid>

          <InfiniteScrollTrigger
            onLoadMore={loadMore}
            hasMore={hasMore}
            isLoading={isLoadingMore}
            text='Loading more speakers...'
          />
        </StickyBarSectionContentWrapper>
      </StickyBarSectionWrapper>
    </SectionWrapper>
  )
}

export default SpeakerListing
