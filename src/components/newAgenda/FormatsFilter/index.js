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

const FormatsFilter = ({ className = '' }) => {
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

  const formats = filterOptions?.available?.formats || []

  const handleFormatsChange = (selectedFormats) => {
    updateFilters({ formats: selectedFormats })
  }

  return (
    <div className={className}>
      <CheckboxDropdown
        selectedValues={filters.formats}
        onSelectionChange={handleFormatsChange}
        options={formats}
      >
        <CheckboxDropdownTrigger
          placeholder='Select formats...'
          maxDisplayItems={10}
        />
        <CheckboxDropdownContent>
          <CheckboxDropdownHeader />
          <CheckboxDropdownItems>
            {formats.map((format) => (
              <CheckboxDropdownItem key={format.slug} value={format.slug}>
                {format.name}
              </CheckboxDropdownItem>
            ))}
          </CheckboxDropdownItems>
        </CheckboxDropdownContent>
      </CheckboxDropdown>
    </div>
  )
}

export default FormatsFilter
