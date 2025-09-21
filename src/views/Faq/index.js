import { Helmet } from 'react-helmet'
import FaqPage from '../../components/faqpage/FaqPage'
import { useBreadcrumbs } from '../../utils/breadcrumbGenerator'

const FAQ = () => {
  const breadcrumbData = useBreadcrumbs()

  return (
    <>
      <Helmet className='font-urbanist'>
        <title>FAQ | TNGSS 2025</title>
        <meta
          name='description'
          content='Find answers to all your questions about TNGSS 2025 - from summit information, registeration to program offering and eligibility.'
        />
        <script type='application/ld+json'>
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>
      <FaqPage />
    </>
  )
}

export default FAQ
