import { Helmet } from 'react-helmet'
import TicketPage from '../../components/tickets/TicketPage'

const Tickets = () => {
  return (
    <>
      <Helmet className='font-urbanist'>
        <title>
          TNGSS Tickets – Book Your Pass for Tamil Nadu Global Startup Summit
        </title>
        <meta
          name='description'
          content='Get your tickets for TNGSS and join innovators, investors, and entrepreneurs at the Tamil Nadu Global Startup Summit.'
        />
      </Helmet>
      <TicketPage />
    </>
  )
}

export default Tickets
