import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import '../src/components/Elements/custom.css'
const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
