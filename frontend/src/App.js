import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Calculate from './pages/Calculate';
import FoodTracker from './pages/FoodTracker';
import AddFood from './pages/AddFood';
import './styles/main.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculate" element={<Calculate />} />
          <Route path="/tracker" element={<FoodTracker />} />
          <Route path="/add-food" element={<AddFood />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
