import { Helmet } from 'react-helmet'
import { useBreadcrumbs } from '../../utils/breadcrumbGenerator'
import NewAgendaPage from '../../components/newAgenda/newAgendaPage'

const NewAgenda = () => {
  const breadcrumbData = useBreadcrumbs()
  return (
    <>
      <Helmet className='font-urbanist'>
        <title>Agenda | TNGSS 2025</title>
        <meta
          name='description'
          content='Find answers to all your questions about TNGSS 2025 - from summit information, registeration to program offering and eligibility.'
        />

        <script type='application/ld+json'>
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <NewAgendaPage />
    </>
  )
}

export default NewAgenda
