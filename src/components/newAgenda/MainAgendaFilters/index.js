import { X } from 'lucide-react'
import {
  FilterDropdownPortal,
  FilterDropdownPortalTrigger,
  FilterDropdownPortalContent,
} from '../../Elements/NewFilters'
import {
  NewFilterDropdownRadioGroup,
  NewFilterDropdownRadioItem,
} from '../../Elements/NewFilters'
import {
  NewFilterDropdownCheckboxGroup,
  NewFilterDropdownCheckboxItem,
} from '../../Elements/NewFilters'
import { useAgenda } from '../server/context/MainAgendaContext'
import SearchBar from '../../Elements/SearchBar'

const MainAgendaFilters = () => {
  const {
    draftFilters,
    updateDraftFilters,
    clearAllFilters,
    hasActiveFilters,
    filterOptions,
    isLoadingFilterOptions,
    toggleZone,
    toggleFormat,
    toggleTag,
    totalCount,
  } = useAgenda()

  const handleSearchChange = (value) => {
    updateDraftFilters({ search: value })
  }

  const handleAccessLevelChange = (value) => {
    updateDraftFilters({ access_level: value })
  }

  if (isLoadingFilterOptions) {
    return <div className='mb-8 text-gray-400'>Loading filters...</div>
  }

  return (
    <div className='space-y-4'>
      {/* Search Bar */}
      <SearchBar
        value={draftFilters.search || ''}
        onChange={handleSearchChange}
        placeholder='Search events by title...'
      />

      {/* Filter Row */}
      <div className='flex items-center justify-between gap-2 flex-wrap'>
        <div className='flex items-center gap-3 flex-wrap'>
          {/* Zones Dropdown (Multi-select) */}
          <div className='w-full md:w-auto'>
            <FilterDropdownPortal>
              <FilterDropdownPortalTrigger width='250px'>
                Zones{' '}
                {draftFilters.zones.length > 0 &&
                  `(${draftFilters.zones.length})`}
              </FilterDropdownPortalTrigger>
              <FilterDropdownPortalContent maxHeight='300px'>
                <NewFilterDropdownCheckboxGroup>
                  {filterOptions?.available?.zones
                    ?.filter((z) => z.slug !== 'all')
                    .map((zone) => (
                      <NewFilterDropdownCheckboxItem
                        key={zone.slug}
                        value={zone.slug}
                        selectedValues={draftFilters.zones}
                        onToggle={() => toggleZone(zone.slug)}
                      >
                        {zone.name}
                      </NewFilterDropdownCheckboxItem>
                    ))}
                </NewFilterDropdownCheckboxGroup>
              </FilterDropdownPortalContent>
            </FilterDropdownPortal>
          </div>

          {/* Formats Dropdown (Multi-select) */}
          <div className='w-full md:w-auto'>
            <FilterDropdownPortal>
              <FilterDropdownPortalTrigger width='250px'>
                Formats{' '}
                {draftFilters.formats.length > 0 &&
                  `(${draftFilters.formats.length})`}
              </FilterDropdownPortalTrigger>
              <FilterDropdownPortalContent maxHeight='300px'>
                <NewFilterDropdownCheckboxGroup>
                  {filterOptions?.available?.formats?.map((format) => (
                    <NewFilterDropdownCheckboxItem
                      key={format.slug}
                      value={format.slug}
                      selectedValues={draftFilters.formats}
                      onToggle={() => toggleFormat(format.slug)}
                    >
                      {format.name}
                    </NewFilterDropdownCheckboxItem>
                  ))}
                </NewFilterDropdownCheckboxGroup>
              </FilterDropdownPortalContent>
            </FilterDropdownPortal>
          </div>

          {/* Tags Dropdown (Multi-select) */}
          <div className='w-full md:w-auto'>
            <FilterDropdownPortal>
              <FilterDropdownPortalTrigger width='250px'>
                Tags{' '}
                {draftFilters.tags.length > 0 &&
                  `(${draftFilters.tags.length})`}
              </FilterDropdownPortalTrigger>
              <FilterDropdownPortalContent maxHeight='300px'>
                <NewFilterDropdownCheckboxGroup>
                  {filterOptions?.available?.tags?.map((tag) => (
                    <NewFilterDropdownCheckboxItem
                      key={tag.slug}
                      value={tag.slug}
                      selectedValues={draftFilters.tags}
                      onToggle={() => toggleTag(tag.slug)}
                    >
                      {tag.name}
                    </NewFilterDropdownCheckboxItem>
                  ))}
                </NewFilterDropdownCheckboxGroup>
              </FilterDropdownPortalContent>
            </FilterDropdownPortal>
          </div>

          {/* Access Level Dropdown */}
          <div className='w-full md:w-auto'>
            <FilterDropdownPortal>
              <FilterDropdownPortalTrigger width='250px'>
                {draftFilters.access_level !== 'all'
                  ? filterOptions?.available?.access_levels?.find(
                      (a) => a.slug === draftFilters.access_level
                    )?.name
                  : 'Access'}
              </FilterDropdownPortalTrigger>
              <FilterDropdownPortalContent maxHeight='300px'>
                <NewFilterDropdownRadioGroup>
                  <NewFilterDropdownRadioItem
                    value='all'
                    selectedValue={draftFilters.access_level}
                    onChange={handleAccessLevelChange}
                  >
                    All Access Levels
                  </NewFilterDropdownRadioItem>
                  {filterOptions?.available?.access_levels?.map((level) => (
                    <NewFilterDropdownRadioItem
                      key={level.slug}
                      value={level.slug}
                      selectedValue={draftFilters.access_level}
                      onChange={handleAccessLevelChange}
                    >
                      {level.name}
                    </NewFilterDropdownRadioItem>
                  ))}
                </NewFilterDropdownRadioGroup>
              </FilterDropdownPortalContent>
            </FilterDropdownPortal>
          </div>
        </div>

        {/* Right side - Count and Clear */}
        <div className='flex items-center gap-3'>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className='flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors'
            >
              <X className='w-4 h-4' />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainAgendaFilters
