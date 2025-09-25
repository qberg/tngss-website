import { Helmet } from 'react-helmet'
import { useBreadcrumbs } from '../../utils/breadcrumbGenerator'
import MediaInterestFormPage from '../../components/mediaInteresrForm/Page'

const MediaInterestForm = () => {
  const breadcrumbData = useBreadcrumbs()
  return (
    <>
      <Helmet className='font-urbanist'>
        <title>Media & Partners Interest Form | TNGSS 2025</title>
        <meta
          name='Media & Partners Interest Form'
          content='Submit your media and partnership interest form to collaborate with TNGSS 2025. Explore partnership opportunities, media collaborations, and exclusive engagement options for your organization.'
        />
        <meta
          name='keywords'
          content='TNGSS 2025 media, event media partners, media form, partnership opportunities, media collaboration, brand partnership, startup, startup summit, startup india, startuptn'
        />

        <script type='application/ld+json'>
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <MediaInterestFormPage />
    </>
  )
}

export default MediaInterestForm
