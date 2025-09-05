import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import RouteWithLayout from '../components/RouteWithLayout'
import {
  NotFound,
  WhyAttend,
  PrivacyPolicy,
  TermsandCondition,
  Speakers,
  Faq,
  About,
  Agenda,
  Sponsors,
  Tickets,
  WhyTN,
  WhySpons,
  SponsorInterestForm,
} from '../views'
import NewHome from '../views/New'
import SpeakerDetail from '../components/speakers/SpeakerDetail'
import Venue from '../views/Venue'
import AgendaDetail from '../components/agenda/AgendaDetail'
import RouteWithNav from '../components/Elements/RouteWithNav'

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path='/not-found'
        element={<RouteWithLayout component={NotFound} />}
      />
      <Route path='/home' element={<RouteWithLayout component={NewHome} />} />
      <Route path='/about' element={<RouteWithLayout component={About} />} />
      <Route
        path='/why-attend'
        element={<RouteWithLayout component={WhyAttend} />}
      />
      <Route
        path='/speakers'
        element={<RouteWithLayout component={Speakers} />}
      />
      <Route
        path='/speakers/:slug'
        element={<RouteWithLayout component={SpeakerDetail} />}
      />
      <Route path='/venue' element={<RouteWithLayout component={Venue} />} />

      <Route path='/agenda' element={<RouteWithLayout component={Agenda} />} />
      <Route
        path='/agenda/:slug'
        element={<RouteWithLayout component={AgendaDetail} />}
      />
      <Route path='/faq' element={<RouteWithLayout component={Faq} />} />

      <Route path='/' element={<Navigate to='/home' />} />
      <Route
        path='/sponsors'
        element={<RouteWithLayout component={Sponsors} />}
      />
      <Route
        path='/why-sponsor'
        element={<RouteWithLayout component={WhySponsor} />}
      />

      <Route
        path='/sponsor-form'
        element={<RouteWithNav component={SponsorInterestForm} />}
      />
      <Route
        path='/tickets'
        element={<RouteWithLayout component={Tickets} />}
      />

      <Route
        path='/privacy-policy'
        element={<RouteWithLayout component={PrivacyPolicy} />}
      />
      <Route
        path='/terms-and-condition'
        element={<RouteWithLayout component={TermsandCondition} />}
      />
      <Route path='/why-tn' element={<RouteWithLayout component={WhyTN} />} />

      <Route path='/why-sponsor' element={<RouteWithLayout component={WhySponsor} />} />
    </Routes>
  )
}

export default AppRoutes
