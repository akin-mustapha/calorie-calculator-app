import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="nav">
      <Link 
        to="/" 
        className={location.pathname === '/' ? 'active' : ''}
      >
        Home
      </Link>
      <Link 
        to="/calculate" 
        className={location.pathname === '/calculate' ? 'active' : ''}
      >
        Calculate Calories
      </Link>
      <Link 
        to="/tracker" 
        className={location.pathname === '/tracker' ? 'active' : ''}
      >
        Food Tracker
      </Link>
      <Link 
        to="/add-food" 
        className={location.pathname === '/add-food' ? 'active' : ''}
      >
        Add Food
      </Link>
    </nav>
  );
};

export default Navigation;
