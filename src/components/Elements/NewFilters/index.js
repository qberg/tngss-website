import { motion } from 'motion/react'
import { snappySpring } from '../../../motion/Springs'

const NewFilterWrapper = ({ children, className = '' }) => {
  return (
    <div
      data-slot='filter-wrapper'
      className={`${className} flex flex-col gap-8 w-full h-full justify-between`}
    >
      {children}
    </div>
  )
}

const NewFilterBody = ({ children, className = '' }) => {
  return (
    <div data-slot='filter-body' className={`${className} flex flex-col gap-6`}>
      {children}
    </div>
  )
}

const NewFilterCta = ({ children, className = '' }) => {
  return (
    <div data-slot='filter-cta' className={`${className} w-full flex`}>
      {children}
    </div>
  )
}

const NewFilterHeader = ({ children, className = '' }) => {
  return (
    <motion.div
      data-slot='filter-header'
      whileTap={{
        scale: 0.98,
        transition: snappySpring,
      }}
      className={`${className} w-full bg-theme-blue p-4 flex justify-between items-center rounded-2xl shadow-lg backdrop-blur-sm`}
    >
      {children}
    </motion.div>
  )
}

const NewFilterTitle = ({ children, className = '' }) => {
  return (
    <h3
      data-slot='filter-title'
      className={`${className} text-lg font-semibold text-white`}
    >
      {children}
    </h3>
  )
}

export {
  NewFilterWrapper,
  NewFilterBody,
  NewFilterHeader,
  NewFilterTitle,
  NewFilterCta,
}

export {
  NewFilterDropdown,
  NewFilterDropdownTrigger,
  NewFilterDropdownContent,
} from './Dropdown'

export {
  NewFilterDropdownRadioGroup,
  NewFilterDropdownRadioItem,
} from './RadioOption'

export {
  NewFilterDropdownCheckboxGroup,
  NewFilterDropdownCheckboxItem,
} from './CheckBox'
