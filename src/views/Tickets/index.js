import { Helmet } from 'react-helmet'
import TicketPage from '../../components/tickets/TicketPage'
import { useBreadcrumbs } from '../../utils/breadcrumbGenerator'
import { useEffect } from 'react'

const Tickets = () => {
  const breadcrumbData = useBreadcrumbs()

  useEffect(() => {
    const scrollToHashElement = () => {
      const hash = window.location.hash
      if (!hash) return

      const targetId = hash.substring(1)
      const element = document.getElementById(targetId)

      if (element) {
        const headerHeight = 100
        const elementPosition = element.offsetTop - headerHeight

        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth',
        })
      }
    }

    scrollToHashElement()

    const timer = setTimeout(scrollToHashElement, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Helmet>
        <title>
          TNGSS Tickets – Book Your Pass for Tamil Nadu Global Startup Summit
        </title>
        <meta
          name='description'
          content='Get your tickets for TNGSS and join innovators, investors, and entrepreneurs at the Tamil Nadu Global Startup Summit.'
        />
        <script type='application/ld+json'>
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>
      <TicketPage />
    </>
  )
}

export default Tickets
