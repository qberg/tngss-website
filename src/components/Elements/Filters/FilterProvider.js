import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const FilterContext = createContext()

export const FilterProvider = ({
  children,
  initialFilters = {},
  onFiltersChange,
}) => {
  const [filters, setFilters] = useState(initialFilters)
  const [dropdownStates, setDropdownStates] = useState({})

  const updateFilter = (filterKey, value, isMultiple = false) => {
    setFilters((prev) => {
      const newFilters = { ...prev }

      if (isMultiple) {
        const currentValues = newFilters[filterKey] || []

        if (currentValues.includes(value)) {
          newFilters[filterKey] = currentValues.filter((v) => v !== value)
        } else {
          newFilters[filterKey] = [...currentValues, value]
        }
      } else {
        newFilters[filterKey] = value
      }

      return newFilters
    })
  }

  const clearAllFilters = () => {
    setFilters(initialFilters)
    setDropdownStates({})
  }

  const clearFilter = (filterKey) => {
    setFilters((prev) => {
      const newFilters = { ...prev }

      if (Array.isArray(initialFilters[filterKey])) {
        newFilters[filterKey] = []
      } else {
        newFilters[filterKey] = initialFilters[filterKey]
      }

      return newFilters
    })
  }

  const hasActiveFilters = useMemo(() => {
    return Object.keys(filters).some((key) => {
      const value = filters[key]
      const initialValue = initialFilters[key]

      if (Array.isArray(value)) {
        return value.length > 0
      }

      // Consider 'all' as inactive filter, as well as empty string or undefined
      return (
        value !== undefined &&
        value !== '' &&
        value !== 'all' &&
        value !== initialValue
      )
    })
  }, [filters, initialFilters])

  const toggleDropdown = (dropdownKey) => {
    setDropdownStates((prev) => ({
      ...prev,
      [dropdownKey]: !prev[dropdownKey],
    }))
  }

  const isDropdownOpen = (dropdownKey) => {
    return dropdownStates[dropdownKey] || false
  }

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters)
    }
  }, [filters, onFiltersChange])

  const contextValue = {
    // State
    filters,
    dropdownStates,
    hasActiveFilters,

    // Actions
    updateFilter,
    clearAllFilters,
    clearFilter,
    toggleDropdown,
    isDropdownOpen,
  }

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilters = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider')
  }
  return context
}
