import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes'
import '../src/components/Elements/custom.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
