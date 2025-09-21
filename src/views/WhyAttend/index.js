import { Helmet } from 'react-helmet'
import WhyAttendPage from '../../components/whyattendpage/WhyAttendPage'
import { useBreadcrumbs } from '../../utils/breadcrumbGenerator'

const WhyAttend = () => {
  const breadcrumbData = useBreadcrumbs()

  return (
    <>
      <Helmet className='font-urbanist'>
        <title>Why Attend | TNGSS 2025</title>
        <meta
          name='description'
          content='The Ultimate Global Gathering for Founders.'
        />

        <script type='application/ld+json'>
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>
      <WhyAttendPage />
    </>
  )
}

export default WhyAttend
