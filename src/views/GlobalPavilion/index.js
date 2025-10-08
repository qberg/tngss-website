import { Helmet } from 'react-helmet'
import { useBreadcrumbs } from '../../utils/breadcrumbGenerator'
import GlobalPavilionPage from '../../components/globalPavilion/GlobalPavilionPage'

const GlobalPavilion = () => {
  const breadcrumbData = useBreadcrumbs()
  return (
    <>
      <Helmet className='font-urbanist'>
        <title>Global Pavilion | TNGSS 2025</title>
        <meta
          name='description'
          content='Connecting Startups Across Continents'
        />

        <script type='application/ld+json'>
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>
      <GlobalPavilionPage />
    </>
  )
}

export default GlobalPavilion
