import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import RouteWithLayout from '../components/RouteWithLayout'
import {
  Home,
  NotFound,
  WhyAttend,
  About,
  PrivacyPolicy,
  TermsandCondition,
  Speakers,
  Faq,
  Program,
} from '../views'

const AppRoutes = () => {
  const showAllRoutes = false

  return (
    <Routes>
      <Route
        path='/not-found'
        element={<RouteWithLayout component={NotFound} />}
      />
      <Route path='/home' element={<RouteWithLayout component={Home} />} />
      <Route path='/about' element={<RouteWithLayout component={About} />} />

      {showAllRoutes && (
        <>
          <Route
            path='/why-attend'
            element={<RouteWithLayout component={WhyAttend} />}
          />
          <Route
            path='/speakers'
            element={<RouteWithLayout component={Speakers} />}
          />

          <Route
            path='/program'
            element={<RouteWithLayout component={Program} />}
          />
          <Route path='/faq' element={<RouteWithLayout component={Faq} />} />
          <Route
            path='/privacy-policy'
            element={<RouteWithLayout component={PrivacyPolicy} />}
          />
          <Route
            path='/terms-and-condition'
            element={<RouteWithLayout component={TermsandCondition} />}
          />
          <Route path='/' element={<Navigate to='/home' />} />
        </>
      )}
    </Routes>
  )
}

export default AppRoutes
