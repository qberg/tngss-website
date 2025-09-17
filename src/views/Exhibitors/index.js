import { Helmet } from 'react-helmet'
import { useBreadcrumbs } from '../../utils/breadcrumbGenerator'
import ExhibitorPage from '../../components/exhibitors/ExhbitorsPage'

const Venue = () => {
  const breadcrumbData = useBreadcrumbs()

  return (
    <>
      <Helmet className='font-urbanist'>
        <title>Exhibitors | TNGSS 2025</title>
        <meta
          name='description'
          content='TNGSS 2025 is happening at Codissia Trade Fair Complex, Coimbatore, Tamil Nadu.'
        />
        <script type='application/ld+json'>
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <ExhibitorPage />
    </>
  )
}

export default Venue
