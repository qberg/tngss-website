import { Helmet } from 'react-helmet'
import { useBreadcrumbs } from '../../utils/breadcrumbGenerator'
import WhySponsorPage from '../../components/whySponsor/Page'

const WhySponsor = () => {
  const breadcrumbData = useBreadcrumbs()
  return (
    <>
      <Helmet className='font-urbanist'>
        <title>Why Sponsor | TNGSS 2025</title>
        <meta
          name='Why Sponsor'
          content='Partner with us as a sponsor to increase brand visibility, engage new customers, and make a meaningful impact. Explore our sponsorship opportunities today.'
        />

        <script type='application/ld+json'>
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <WhySponsorPage />
    </>
  )
}

export default WhySponsor
