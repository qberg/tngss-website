import { Flag } from 'lucide-react'
import { useGlobalPavilion } from '../../../hooks/usePavilion'
import {
  ExhibitorCard,
  ExhibitorCardRow,
  ExhibitorCardTitleSecondary,
  ExhibitorLogo,
  InfoBadge,
} from '../../exhibitors/ExhibitorCard'
import { ExhibitorListingGrid } from '../../exhibitors/ExhibitorListing/layout'
import { SectionTitle, SectionWrapper } from '../../Layout/Section'
const GlobalPavilionListing = () => {
  const { data, isLoading, error } = useGlobalPavilion()
  return (
    <SectionWrapper>
      <SectionTitle>Global Pavilion</SectionTitle>
      <ExhibitorListingGrid>
        {data?.docs.map((pavilion, index) => {
          const logoUrl = pavilion?.image?.url || null
          const name = pavilion?.name || null
          const country = pavilion?.country || null

          return (
            <ExhibitorCard>
              <ExhibitorLogo
                src={logoUrl}
                alt={`Global Pavilion Logo`}
                fallbackText='S'
              />

              {country && (
                <ExhibitorCardRow>
                  <InfoBadge icon={Flag} label={country} />
                </ExhibitorCardRow>
              )}

              {name && (
                <ExhibitorCardTitleSecondary>
                  {name}
                </ExhibitorCardTitleSecondary>
              )}
            </ExhibitorCard>
          )
        })}
      </ExhibitorListingGrid>
    </SectionWrapper>
  )
}

export default GlobalPavilionListing
