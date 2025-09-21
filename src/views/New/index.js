import { Helmet } from 'react-helmet'
import HomePage from '../../components/homepage/HomePage'
import { useBreadcrumbs } from '../../utils/breadcrumbGenerator'

const NewHome = () => {
  const breadcrumbData = useBreadcrumbs()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Tamil Nadu Global Startup Summit 2025',
    alternateName: 'TNGSS 2025',
    description:
      'Premier startup summit connecting entrepreneurs, investors, and innovators in Tamil Nadu. Join the largest startup ecosystem event featuring networking, funding opportunities, and innovation showcase.',
    startDate: '2025-10-09',
    endDate: '2025-10-10',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Tamil Nadu, India',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Coimbatore',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'StartupTN',
      url: 'https://startuptn.in',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://event.startuptn.in',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Entrepreneurs, Investors, Startups, Innovation Leaders',
    },
  }

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'StartupTN',
    alternateName: ['Startup Tamil Nadu', 'StartupTN'],
    url: 'https://startuptn.in',
    logo: '/images/logo.png',
    description: "Government of Tamil Nadu's official startup promotion agency",
    foundingDate: '2018',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://startuptn.in/contact',
    },
    sameAs: [
      'https://x.com/TheStartupTN',
      'https://www.linkedin.com/company/thestartuptn/?originalSubdomain=in',
      'https://www.facebook.com/TheStartupTN/',
      'https://www.instagram.com/thestartuptn/',
      'https://www.youtube.com/channel/UCr0du18taGeXH35dZZD4RnQ',
    ],
  }

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Tamil Nadu Global Startup Summit 2025?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TNGSS 2025 is the premier startup summit in Tamil Nadu, bringing together entrepreneurs, investors, policymakers, and innovators to foster the startup ecosystem in South India.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who can attend the startup summit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The summit is open to entrepreneurs, startups, investors, venture capitalists, government officials, students, and anyone interested in the startup ecosystem.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the key benefits of attending TNGSS 2025?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Attendees can network with industry leaders, explore funding opportunities, showcase innovations, attend keynote sessions, participate in workshops, and connect with potential partners and mentors.',
        },
      },
    ],
  }

  return (
    <>
      <Helmet className='font-urbanist'>
        <title>TNGSS 2025 | Empowering Innovation & Entrepreneurship</title>
        <meta
          name='description'
          content='Join the Tamil Nadu Global Startup Summit 2025 – a premier platform connecting startups, investors, policymakers, and global innovators. Explore opportunities, network, and drive impact. Powered by StartupTN.'
        />
        <meta
          name='keywords'
          content='startup summit, Tamil Nadu startup summit, TNGSS 2025, startup event India, entrepreneur summit, startup conference, innovation summit, startup ecosystem, venture capital, angel investors, startup funding, entrepreneurship event, business summit, startup networking, Indian startups, Chennai startup event, South India startup summit, startup competition, pitch event, startup expo'
        />
        <meta name='author' content='StartupTN - Government of Tamil Nadu' />
        <meta
          name='robots'
          content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        />
        <meta name='googlebot' content='index, follow' />
        <meta name='language' content='English' />
        <meta name='geo.region' content='IN-TN' />
        <meta
          name='geo.placename'
          content='Codissia Trade Fair Complex, Coimbatore, Tamil Nadu, India'
        />
        <meta name='geo.position' content='11.0419;77.0268' />
        <meta name='ICBM' content='11.0419, 77.0268' />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@TNGSS2025' />
        <meta name='twitter:creator' content='@StartupTN' />
        <meta
          name='twitter:title'
          content='TNGSS 2025 | Tamil Nadu Global Startup Summit'
        />
        <meta
          name='twitter:description'
          content='Join the premier startup summit in Tamil Nadu. Connect with entrepreneurs, investors, and innovators. Register for TNGSS 2025 now!'
        />
        <meta name='twitter:image' content='/images/twitter-card.jpg' />
        <meta
          name='twitter:image:alt'
          content='Tamil Nadu Global Startup Summit 2025'
        />

        <script type='application/ld+json'>
          {JSON.stringify(structuredData)}
        </script>

        <script type='application/ld+json'>
          {JSON.stringify(organizationData)}
        </script>

        <script type='application/ld+json'>
          {JSON.stringify(breadcrumbData)}
        </script>

        <script type='application/ld+json'>{JSON.stringify(faqData)}</script>
      </Helmet>
      <HomePage />
    </>
  )
}

export default NewHome
