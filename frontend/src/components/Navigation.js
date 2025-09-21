import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calculator, Target, PlusCircle } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/calculate', label: 'Calculate', icon: Calculator },
    { path: '/tracker', label: 'Tracker', icon: Target },
    { path: '/add-food', label: 'Add Food', icon: PlusCircle },
  ];

  return (
    <div className="nav">
      <nav className="nav-content">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-button ${isActive ? 'active' : ''}`}
            >
              <Icon style={{ width: '20px', height: '20px', flexShrink: 0 }} />
              <span style={{ display: window.innerWidth >= 640 ? 'inline' : 'none' }}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Navigation;
