import { useState, useRef, useEffect } from 'react'
import InputWrapper from './InputWrapper'

const ScrollableSelect = ({ field, fieldApi }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState('')
  const selectRef = useRef(null)

  // Find selected option label
  useEffect(() => {
    if (fieldApi.state.value && field.options) {
      const selected = field.options.find(
        (opt) => opt.value === fieldApi.state.value
      )
      setSelectedLabel(selected ? selected.label : '')
    } else {
      setSelectedLabel('')
    }
  }, [fieldApi.state.value, field.options])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (option) => {
    fieldApi.handleChange(option.value)
    setIsOpen(false)
    fieldApi.handleBlur()
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='relative' ref={selectRef}>
      <InputWrapper>
        <button
          type='button'
          onClick={handleToggle}
          className='w-full px-3 md:px-4 py-3 rounded-md focus:outline-none bg-transparent text-left flex items-center justify-between'
        >
          <span className={selectedLabel ? 'text-white' : 'text-gray-400'}>
            {selectedLabel || 'Select an option'}
          </span>
          <ChevronIcon isOpen={isOpen} />
        </button>
      </InputWrapper>

      {isOpen && (
        <DropdownList
          options={field.options}
          onSelect={handleSelect}
          selectedValue={fieldApi.state.value}
        />
      )}
    </div>
  )
}

const ChevronIcon = ({ isOpen }) => (
  <svg
    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
      isOpen ? 'rotate-180' : ''
    }`}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M19 9l-7 7-7-7'
    />
  </svg>
)

const DropdownList = ({ options, onSelect, selectedValue }) => (
  <div className='absolute z-50 w-full mt-1'>
    <InputWrapper>
      <div className='bg-black rounded-md max-h-60 overflow-y-auto'>
        {options?.map((option, index) => (
          <DropdownOption
            key={option.id}
            option={option}
            isSelected={selectedValue === option.value}
            isLast={index === options.length - 1}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </InputWrapper>
  </div>
)

const DropdownOption = ({ option, isSelected, isLast, onClick }) => (
  <button
    type='button'
    onClick={onClick}
    className={`
      w-full px-3 md:px-4 py-3 text-left hover:bg-gray-800 transition-colors duration-150
      ${isSelected ? 'bg-gray-700 text-white' : 'text-gray-300'}
      ${!isLast ? 'border-b border-gray-700' : ''}
      first:rounded-t-md last:rounded-b-md
    `}
  >
    {option.label}
  </button>
)

export { ScrollableSelect }
