import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AutomationPage from './pages/AutomationPage';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/automation" element={<AutomationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
