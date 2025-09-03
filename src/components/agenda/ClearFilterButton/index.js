import { useFilters } from '../../Elements/Filters'

const ClearFiltersButton = () => {
  const { clearAllFilters, hasActiveFilters } = useFilters()

  if (!hasActiveFilters) {
    return (
      <button
        onClick={() => console.log('Check back later')}
        className='text-[#18BFDB] hover:text-white transition-colors'
      >
        Check back later
      </button>
    )
  }

  return (
    <button
      onClick={clearAllFilters}
      className='text-[#18BFDB] hover:text-white transition-colors'
    >
      Clear filters to see all events
    </button>
  )
}

export default ClearFiltersButton
