import { Helmet } from 'react-helmet'
import SponsorsPage from '../../components/sponsors/SponsorsPage'
import { useBreadcrumbs } from '../../utils/breadcrumbGenerator'

const Sponsors = () => {
  const breadcrumbData = useBreadcrumbs()
  return (
    <>
      <Helmet className='font-urbanist'>
        <title>Sponsors and Partners | TNGSS 2025</title>
        <meta
          name='Sponsors'
          content='Find answers to all your questions about TNGSS 2025 - from summit information, registeration to program offering and eligibility.'
        />

        <script type='application/ld+json'>
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <SponsorsPage />
    </>
  )
}

export default Sponsors
