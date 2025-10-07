import { useParams } from 'react-router-dom'
import MinimalHero from '../../Elements/MinimalHero'
import { useExhibitorBySlug } from '../../../hooks/useExhibitorsData'
import ExhibitorDetails from '../ExhibitorDetails'
import FounderDetails from '../FounderDetails'

const ExhibitorDetailPage = () => {
  const { slug } = useParams()

  const { data: exhibitor, isLoading, error } = useExhibitorBySlug(slug)

  return (
    <>
      <MinimalHero
        title='Exhibitor'
        tagLine='Elevate Your Brand at TNGSS'
        applyBorder={false}
      />

      <ExhibitorDetails exhibitor={exhibitor} />
      <FounderDetails exhibitor={exhibitor} />
    </>
  )
}

export default ExhibitorDetailPage
