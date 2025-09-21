import { Helmet } from 'react-helmet'
import AboutPage from '../../components/about/AboutPage'
import { useBreadcrumbs } from '../../utils/breadcrumbGenerator'

const About = () => {
  const breadcrumbData = useBreadcrumbs()

  return (
    <>
      <Helmet className='font-urbanist'>
        <title>About | TNGSS 2025</title>
        <meta
          name='description'
          content='The Tamil Nadu Global Startup Summit (TNGSS) 2025 is one of Imdias biggest startup event and a flagship initiative by StartupTN.'
        />
        <script type='application/ld+json'>
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>
      <AboutPage />
    </>
  )
}

export default About
