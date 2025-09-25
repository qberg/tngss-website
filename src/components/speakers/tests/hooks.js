import {
  useInfiniteSpeakers,
  useSpeakersFilters,
} from '../../../hooks/useSpeakersData'

const TestHooks = () => {
  const {
    data: filterOptions,
    isLoading: filtersLoading,
    error: filtersError,
  } = useSpeakersFilters()

  const testFilters = {
    speaker_type: 'all',
    countries: [],
    tags: [],
  }

  const {
    speakers,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    totalCount,
    error,
  } = useInfiniteSpeakers(testFilters)

  if (filtersLoading)
    return <div className='min-h-screen'>Loading filters...</div>
  if (filtersError) return <div>Filter Error: {filtersError.message}</div>

  return (
    <div className='min-h-screen'>
      <h2>Filter Options Test</h2>

      <h2>Speakers Test</h2>
      <p>Total Count: {totalCount}</p>
      <p>Loaded: {speakers.length}</p>
      <p>Has More: {hasMore ? 'Yes' : 'No'}</p>

      {speakers.map((speaker) => (
        <div
          key={speaker.id}
          style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}
        >
          <h3>{speaker.name}</h3>
          <p>{speaker.organization}</p>
          <p>{speaker.speaker_type?.name}</p>
        </div>
      ))}

      {hasMore && (
        <button onClick={() => loadMore()} disabled={isLoadingMore}>
          {isLoadingMore ? 'Loading More...' : 'Load More'}
        </button>
      )}
    </div>
  )
}

export default TestHooks
