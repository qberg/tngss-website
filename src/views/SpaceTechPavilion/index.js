import { Helmet } from 'react-helmet'
import { useBreadcrumbs } from '../../utils/breadcrumbGenerator'
import SpaceTechPavilionPage from '../../components/spaceTechPavilion/SpaceTechPavilionPage'

const SpaceTechPavilion = () => {
  const breadcrumbData = useBreadcrumbs()
  return (
    <>
      <Helmet className='font-urbanist'>
        <title>Space Tech Pavilion | TNGSS 2025</title>
        <meta
          name='description'
          content='Innovations shaping the future of space'
        />

        <script type='application/ld+json'>
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>
      <SpaceTechPavilionPage />
    </>
  )
}

export default SpaceTechPavilion
