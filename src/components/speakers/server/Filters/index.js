import { motion, AnimatePresence } from 'motion/react'
import { Filter, ChevronDown, X } from 'lucide-react'
import { useSpeakers } from '../context/SpeakersContext'
import { useState } from 'react'

const FilterDropdown = ({ title, isOpen, onToggle, children }) => (
  <div className='space-y-2'>
    <button
      onClick={onToggle}
      className='w-full flex items-center justify-between p-3 rounded-xl border border-white text-white transition-colors'
    >
      <span className='font-medium'>{title}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown size={16} />
      </motion.div>
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className='overflow-hidden'
        >
          <div className='p-3 bg-black/20 rounded-xl border border-white/5'>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

const RadioOption = ({ value, label, count, selected, onChange }) => (
  <label className='flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer'>
    <div className='flex items-center space-x-2'>
      <input
        type='radio'
        checked={selected}
        onChange={() => onChange(value)}
        className='text-blue-500'
      />
      <span className='text-white text-sm'>{label}</span>
    </div>
    <span className='text-white/50 text-xs'>{count}</span>
  </label>
)

const CheckboxOption = ({ value, label, count, selected, onChange }) => (
  <label className='flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer'>
    <div className='flex items-center space-x-2'>
      <input
        type='checkbox'
        checked={selected}
        onChange={onChange}
        className='bg-theme-blue'
      />
      <span className='text-white text-sm'>{label}</span>
    </div>
    <span className='text-white/50 text-xs'>{count}</span>
  </label>
)

const SpeakerFilters = () => {
  const {
    draftFilters,
    updateDraftFilters,
    applyFilters,
    filterOptions,
    hasPendingChanges,
    toggleTag,
    toggleCountry,
    clearAllFilters,
    hasActiveFilters,
  } = useSpeakers()

  const [dropdowns, setDropdowns] = useState({
    speakerTypes: false,
    tags: false,
    countries: false,
  })

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  if (!filterOptions) return null

  const {
    speaker_types = [],
    tags = [],
    countries = [],
  } = filterOptions.available || {}

  return (
    <div className='space-y-6'>
      {/* Filter Header */}
      <div className='flex items-center justify-between p-4 bg-[#18BFDB] rounded-2xl'>
        <h3 className='text-white font-semibold text-lg'>Filters</h3>
        <Filter size={16} className='text-white' />
      </div>

      {/* Clear All Button */}
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

      {/* Speaker Types */}
      <FilterDropdown
        title='Speaker Type'
        isOpen={dropdowns.speakerTypes}
        onToggle={() => toggleDropdown('speakerTypes')}
      >
        <div className='space-y-1'>
          {speaker_types.map((type) => (
            <RadioOption
              key={type.value}
              value={type.value}
              label={type.label}
              count={type.count}
              selected={draftFilters.speaker_type === type.value}
              onChange={(value) => updateDraftFilters({ speaker_type: value })}
            />
          ))}
        </div>
      </FilterDropdown>

      {/* Tags */}
      <FilterDropdown
        title='Tags'
        isOpen={dropdowns.tags}
        onToggle={() => toggleDropdown('tags')}
      >
        <div className='space-y-1'>
          <AnimatePresence>
            {draftFilters.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='flex items-center justify-between p-2 mb-2 bg-white/5 rounded-lg border border-white/10'
              >
                <span className='text-white/70 text-sm'>
                  {draftFilters.tags.length} selected
                </span>
                <button
                  onClick={() => updateDraftFilters({ tags: [] })}
                  className='text-red-400 hover:text-red-300 text-sm'
                >
                  Clear
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {tags.map((tag) => (
            <CheckboxOption
              key={tag.value}
              value={tag.value}
              label={tag.label}
              count={tag.count}
              selected={draftFilters.tags.includes(tag.value)}
              onChange={() => toggleTag(tag.value)}
            />
          ))}
        </div>
      </FilterDropdown>

      {/* Countries */}
      <FilterDropdown
        title='Countries'
        isOpen={dropdowns.countries}
        onToggle={() => toggleDropdown('countries')}
      >
        <div className='space-y-1'>
          <AnimatePresence>
            {draftFilters.countries.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='flex items-center justify-between p-2 mb-2 bg-white/5 rounded-lg border border-white/10'
              >
                <span className='text-white/70 text-sm'>
                  {draftFilters.countries.length} selected
                </span>
                <button
                  onClick={() => updateDraftFilters({ countries: [] })}
                  className='text-red-400 hover:text-red-300 text-sm'
                >
                  Clear
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {countries.map((country) => (
            <CheckboxOption
              key={country.value}
              value={country.value}
              label={country.label}
              count={country.count}
              selected={draftFilters.countries.includes(country.value)}
              onChange={() => toggleCountry(country.value)}
            />
          ))}
        </div>
      </FilterDropdown>

      {/* Apply Button */}
      <AnimatePresence>
        {hasPendingChanges && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={applyFilters}
            className='w-full bg-theme-blue text-white font-semibold py-3 rounded-xl hover:bg-[#16a8c4] transition-colors'
          >
            Apply Filters
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SpeakerFilters
