import { Helmet } from 'react-helmet'
import VenuePage from '../../components/venue/VenuePage'
import { useBreadcrumbs } from '../../utils/breadcrumbGenerator'

const Venue = () => {
  const breadcrumbData = useBreadcrumbs()

  return (
    <>
      <Helmet className='font-urbanist'>
        <title>Venue | TNGSS 2025</title>
        <meta
          name='description'
          content='TNGSS 2025 is happening at Codissia Trade Fair Complex, Coimbatore, Tamil Nadu.'
        />
        <script type='application/ld+json'>
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>
      <VenuePage />
    </>
  )
}

export default Venue
