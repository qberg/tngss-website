import SkeletonPulse from '../../Elements/Loaders/SkeletonPulse'
import {
  ExhibitorCard,
  ExhibitorCardRow,
  ExhibitorCardTitle,
  ExhibitorLogo,
  StallInfoWrapper,
} from '../ExhibitorCard'

const ExhibitorCardSkeleton = () => (
  <ExhibitorCard>
    <ExhibitorLogo skeleton />
    <ExhibitorCardRow>
      <div className='flex items-center gap-1'>
        <SkeletonPulse className='w-4 h-4' />
        <SkeletonPulse className='w-20 h-4' />
      </div>
    </ExhibitorCardRow>
    <ExhibitorCardTitle skeleton />
    <StallInfoWrapper>
      <div className='flex items-center gap-1'>
        <SkeletonPulse className='w-4 h-4' />
        <SkeletonPulse className='w-16 h-4' />
      </div>
      <div className='flex items-center gap-1'>
        <SkeletonPulse className='w-4 h-4' />
        <SkeletonPulse className='w-16 h-4' />
      </div>
    </StallInfoWrapper>
    <ExhibitorCardRow>
      <SkeletonPulse className='w-24 h-8 rounded-full' />
    </ExhibitorCardRow>
  </ExhibitorCard>
)

export { ExhibitorCardSkeleton }
