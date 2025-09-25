import { useSpeakers } from '../server/context/SpeakersContext'

const TestSpeakersContext = () => {
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
  } = useSpeakers()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className='p-5'>
      <h2>Speakers Context Test</h2>

      {/* Filter Options */}
      <div className='mb-5'>
        <h3>Filter Options Available:</h3>
        <p>
          Speaker Types: {filterOptions?.available?.speaker_types?.length || 0}
        </p>
        <p>Tags: {filterOptions?.available?.tags?.length || 0}</p>
        <p>Countries: {filterOptions?.available?.countries?.length || 0}</p>
      </div>

      {/* Current Filters */}
      <div className='mb-5'>
        <h3>Current Filters:</h3>
        <p>
          <strong>Draft:</strong> {JSON.stringify(draftFilters)}
        </p>
        <p>
          <strong>Applied:</strong> {JSON.stringify(appliedFilters)}
        </p>
        <p>
          <strong>Has Pending Changes:</strong>{' '}
          {hasPendingChanges ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Has Active Filters:</strong> {hasActiveFilters ? 'Yes' : 'No'}
        </p>
      </div>

      <div className='mb-5'>
        <h3>Test Filter Controls:</h3>
        <div>
          <label>Speaker Type: </label>
          <select
            value={draftFilters.speaker_type}
            onChange={(e) =>
              updateDraftFilters({ speaker_type: e.target.value })
            }
          >
            <option value='all'>All Types</option>
            {filterOptions?.available?.speaker_types?.slice(1).map((type) => (
              <option key={type.value} value={type.value}>
                {type.label} ({type.count})
              </option>
            ))}
          </select>
        </div>

        {/* Sample Tags */}
        <div style={{ marginTop: '10px' }}>
          <p>Sample Tags:</p>
          {filterOptions?.available?.tags?.slice(0, 3).map((tag) => (
            <label key={tag.value} style={{ marginRight: '10px' }}>
              <input
                type='checkbox'
                checked={draftFilters.tags.includes(tag.value)}
                onChange={() => toggleTag(tag.value)}
              />
              {tag.label} ({tag.count})
            </label>
          ))}
        </div>

        {/* Sample Countries */}
        <div style={{ marginTop: '10px' }}>
          <p>Sample Countries:</p>
          {filterOptions?.available?.countries?.slice(0, 3).map((country) => (
            <label key={country.value} style={{ marginRight: '10px' }}>
              <input
                type='checkbox'
                checked={draftFilters.countries.includes(country.value)}
                onChange={() => toggleCountry(country.value)}
              />
              {country.label} ({country.count})
            </label>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: '15px' }}>
          {hasPendingChanges && (
            <button
              onClick={applyFilters}
              style={{
                marginRight: '10px',
                padding: '5px 15px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              Apply Filters
            </button>
          )}

          <button onClick={clearAllFilters} className='bg-red-500 p-4'>
            Clear All
          </button>
        </div>
      </div>

      {/* Results */}
      <div>
        <h3>Results:</h3>
        <p>Total Speakers: {totalCount}</p>
        <p>Loaded: {speakers.length}</p>
        <p>Has More: {hasMore ? 'Yes' : 'No'}</p>

        {/* First few speakers */}
        <div style={{ marginTop: '15px' }}>
          <h4>Sample Speakers:</h4>
          {speakers.slice(0, 3).map((speaker) => (
            <div
              key={speaker.id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                margin: '5px 0',
                borderRadius: '4px',
              }}
            >
              <strong>{speaker.name}</strong> - {speaker.organization}
              <br />
              <small>
                {speaker.speaker_type?.name} | {speaker.location?.country}
              </small>
            </div>
          ))}
        </div>

        {hasMore && (
          <button onClick={() => loadMore()} disabled={isLoadingMore}>
            {isLoadingMore ? 'Loading More...' : 'Load More'}
          </button>
        )}
      </div>
    </div>
  )
}

export default TestSpeakersContext
