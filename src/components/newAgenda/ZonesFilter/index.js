import SkeletonPulse from '../../Elements/Loaders/SkeletonPulse'
import { useMainEvents } from '../context/MainEventsContext'
import { motion } from 'motion/react'

const ZoneFilterSkeleton = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <SkeletonPulse className='h-9 w-32 px-6 py-3 rounded-full' />
    </motion.div>
  )
}

const MainZonesFilter = ({ className = '' }) => {
  const { filters, updateFilters, filterOptions, showFiltersSkeleton } =
    useMainEvents()

  const zones = filterOptions?.available?.zones || []
  const selectedZone = filters.zones

  if (showFiltersSkeleton) {
    return (
      <div className={`flex items-center justify-center gap-2 ${className}`}>
        {/* Three skeleton loaders for zones */}
        <ZoneFilterSkeleton delay={0} />
        <ZoneFilterSkeleton delay={0.1} />
        <ZoneFilterSkeleton delay={0.2} />
      </div>
    )
  }

  const handleZoneSelect = (zoneSlug) => {
    const newZone = selectedZone === zoneSlug ? '' : zoneSlug
    updateFilters({ zones: newZone })
  }

  return (
    <div className='flex flex-wrap gap-2 items-center justify-center'>
      {zones.map((zone, index) => {
        const isSelected = selectedZone === zone.slug
        const isAllZones = zone.slug === 'all'

        return (
          <motion.button
            key={zone.slug}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleZoneSelect(isAllZones ? '' : zone.slug)}
            className={` relative px-6 py-3 text-base font-bold rounded-full transition-all duration-200 focus:outline-none ${
              isSelected || (isAllZones && !selectedZone)
                ? 'bg-theme-blue text-white shadow-lg'
                : 'border-bg-gray border-2'
            }`}
          >
            {zone.name}
          </motion.button>
        )
      })}
    </div>
  )
}

export default MainZonesFilter
