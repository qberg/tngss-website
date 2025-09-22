import { useMainEvents } from '../context/MainEventsContext'
import {
  CheckboxDropdownTrigger,
  CheckboxDropdownContent,
  CheckboxDropdownHeader,
  CheckboxDropdownItem,
  CheckboxDropdownItems,
  CheckboxDropdown,
} from '../../Elements/ui/CheckboxDropdown'
import SkeletonPulse from '../../Elements/Loaders/SkeletonPulse'

const TagsFilter = ({ className = '' }) => {
  const { filters, updateFilters, filterOptions, showFiltersSkeleton } =
    useMainEvents()

  if (showFiltersSkeleton) {
    return (
      <div className={`space-y-2 ${className}`}>
        <SkeletonPulse className='h-4 w-24' />
        <SkeletonPulse className='h-10 w-full' />
      </div>
    )
  }

  const tags = filterOptions?.available?.tags || []

  const handleTagsChange = (selectedTags) => {
    updateFilters({ tags: selectedTags })
  }

  return (
    <div className={className}>
      <CheckboxDropdown
        selectedValues={filters.tags}
        onSelectionChange={handleTagsChange}
        options={tags}
      >
        <CheckboxDropdownTrigger
          placeholder='Select Tags...'
          maxDisplayItems={10}
        />
        <CheckboxDropdownContent>
          <CheckboxDropdownHeader />
          <CheckboxDropdownItems>
            {tags.map((tag) => (
              <CheckboxDropdownItem key={tag.slug} value={tag.slug}>
                {tag.name}
              </CheckboxDropdownItem>
            ))}
          </CheckboxDropdownItems>
        </CheckboxDropdownContent>
      </CheckboxDropdown>
    </div>
  )
}

export default TagsFilter
