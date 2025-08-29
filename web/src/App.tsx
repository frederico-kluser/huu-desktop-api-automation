import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import AutomationPage from './pages/AutomationPage';
import './styles/App.css';

const App: React.FC = () => {
  // Using HashRouter for Electron compatibility
  // AutomationPage is now the main home page
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AutomationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
