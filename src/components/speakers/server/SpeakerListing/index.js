import InfiniteScrollTrigger from '../../../../hooks/useInfiniteScrollTrigger'
import { SpeakersGrid } from '../../../Layout/Grid'
import { SectionTitle, SectionWrapper } from '../../../Layout/Section'
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
import SpeakerFilters from '../Filters'
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

const SpeakerListing = () => {
  const [openDropdown, setOpenDropDown] = useState(null)
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

  const toggleDropdown = (dropdownName) => {
    setOpenDropDown(openDropdown === dropdownName ? null : dropdownName)
  }

  return (
    <SectionWrapper>
      <SectionTitle>SPEAKERS</SectionTitle>

      <StickyBarSectionWrapper>
        <StickyBarWrapper>
          <StickyBar className='border-0 border-red-500'>
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
                    Speaker Type
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
                    Countries
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
                    Tags
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
                  className='w-full bg-theme-blue text-white font-semibold py-3 rounded-xl hover:bg-[#16a8c4] transition-colors'
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
