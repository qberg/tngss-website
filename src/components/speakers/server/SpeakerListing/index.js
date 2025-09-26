import InfiniteScrollTrigger from '../../../../hooks/useInfiniteScrollTrigger'
import { useInView } from 'react-intersection-observer'
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
import { useEffect, useRef, useState } from 'react'
import SpeakerCardSkeleton from '../../../Elements/SpeakerCardSkeleton'

const SpeakerListing = () => {
  const [openDropdown, setOpenDropDown] = useState(null)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const { ref: gridRef, inView: gridInView } = useInView({
    threshold: 0.5,
  })

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
          <SpeakersGrid ref={gridRef}>
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

      {gridInView && (
        <motion.button
          onClick={() => setIsMobileFilterOpen(true)}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className='md:hidden fixed bottom-6 left-1/2 bg-theme-blue text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-2 z-50 border border-white/20'
        >
          <Filter size={20} />
          <span className='font-medium'>Filters</span>
          {hasActiveFilters && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className='w-2 h-2 bg-white rounded-full'
            />
          )}
        </motion.button>
      )}
    </SectionWrapper>
  )
}

export default SpeakerListing
