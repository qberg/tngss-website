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
  Program,
  About,
} from '../views'
import NewHome from '../views/New'
import SpeakerDetail from '../components/speakers/SpeakerDetail'
import Venue from '../views/Venue'

const AppRoutes = () => {
  const showAllRoutes = false

  return (
    <Routes>
      <Route
        path='/not-found'
        element={<RouteWithLayout component={NotFound} />}
      />
      <Route path='/home' element={<RouteWithLayout component={NewHome} />} />
      <Route path='/about' element={<RouteWithLayout component={About} />} />
      <Route
        path='/speakers'
        element={<RouteWithLayout component={Speakers} />}
      />
      <Route
        path='/speakers/:slug'
        element={<RouteWithLayout component={SpeakerDetail} />}
      />
      <Route path='/venue' element={<RouteWithLayout component={Venue} />} />

      <Route
        path='/program'
        element={<RouteWithLayout component={Program} />}
      />
      <Route path='/faq' element={<RouteWithLayout component={Faq} />} />

      <Route path='/' element={<Navigate to='/home' />} />

      <Route
        path='/privacy-policy'
        element={<RouteWithLayout component={PrivacyPolicy} />}
      />
      <Route
        path='/terms-and-condition'
        element={<RouteWithLayout component={TermsandCondition} />}
      />

      {showAllRoutes && (
        <>
          <Route
            path='/why-attend'
            element={<RouteWithLayout component={WhyAttend} />}
          />

          <Route path='/' element={<Navigate to='/home' />} />
        </>
      )}
    </Routes>
  )
}

export default AppRoutes
