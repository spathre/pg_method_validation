import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import LinearityForm from './pages/LinearityForm';
import AccuracyForm from './pages/AccuracyForm';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/linearity" replace />} />
          <Route path="/linearity" element={<LinearityForm />} />
          <Route path="/accuracy" element={<AccuracyForm />} />
          <Route path="*" element={<Navigate to="/linearity" replace />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
