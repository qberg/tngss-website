import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes'
import '../src/components/Elements/custom.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RealViewport } from './components/RealViewPort'

const App = () => {
  useEffect(() => {
    const hostname = window.location.hostname

    if (hostname === 'tngss.in' || hostname === 'www.tngss.in') {
      const newUrl = window.location.href.replace(
        /tngss\.in/,
        'tngss.startuptn.in'
      )
      window.location.replace(newUrl)
    }

    if (hostname === 'www.tngss.startup.in') {
      const newUrl = window.location.href.replace(
        'www.tngss.startuptn.in',
        'tngss.startuptn.in'
      )
      window.location.replace(newUrl)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <RealViewport />
      <Router>
        <AppRoutes />
      </Router>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}

export default App
