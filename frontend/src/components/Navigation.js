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
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Calorie Tracker</h2>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon className="sidebar-icon" />
              <span className="sidebar-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Navigation;
