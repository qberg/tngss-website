import { Helmet } from 'react-helmet'
import { useBreadcrumbs } from '../../utils/breadcrumbGenerator'
import SponsorInterestFormPage from '../../components/sponsorInterestForm/Page'

const SponsorInterestForm = () => {
  const breadcrumbData = useBreadcrumbs()
  return (
    <>
      <Helmet className='font-urbanist'>
        <title>Sponsor Interest Form | TNGSS 2025</title>
        <meta
          name='Sponsor Interest Form'
          content='Submit your sponsor interest form to partner with TNGSS 2025. Explore sponsorship opportunities, benefits, and exclusive branding options for your organization.'
        />
        <meta
          name='keywords'
          content='TNGSS 2025 sponsorship, event sponsors, sponsor form, sponsor opportunities, brand partnership, startup, startup summit, startup india, startuptn'
        />

        <script type='application/ld+json'>
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <SponsorInterestFormPage />
    </>
  )
}

export default SponsorInterestForm
